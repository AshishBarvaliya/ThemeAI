import { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/manage-purchases";
import stripe from "@/config/stripe";
import db from "@/db";

jest.mock("@/config/stripe", () => ({
  checkout: {
    sessions: {
      retrieve: jest.fn(),
    },
  },
}));
jest.mock("@/db", () => ({
  query: {
    purchases: {
      findFirst: jest.fn(),
    },
    users: {
      findFirst: jest.fn(),
    },
  },
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
}));
jest.mock("@paralleldrive/cuid2", () => ({
  createId: jest.fn(() => "mock-id"),
}));

describe("Manage Purchases API Endpoint", () => {
  let req: NextApiRequest, res: NextApiResponse;

  beforeEach(() => {
    req = {
      method: "",
      query: {},
      body: {},
    } as NextApiRequest;

    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      redirect: jest.fn(),
    } as unknown as NextApiResponse;

    jest.clearAllMocks();
  });

  it("returns 405 for non-GET methods", async () => {
    req.method = "POST";

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it("redirects if session ID is missing", async () => {
    req.method = "GET";
    req.query.session = "";

    await handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith(
      "/themes?payment=0&error=invalid_session"
    );
  });

  it("redirects if purchase session already exists", async () => {
    req.method = "GET";
    req.query.session = "valid-session-id";
    (db.query.purchases.findFirst as jest.Mock).mockResolvedValueOnce({
      session: "valid-session-id",
    });

    await handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith(
      "/themes?payment=0&error=session_exists"
    );
  });

  it("redirects if Stripe session retrieval fails", async () => {
    req.method = "GET";
    (stripe.checkout.sessions.retrieve as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith(
      "/themes?payment=0&error=invalid_session"
    );
  });

  it("redirects if customer ID is missing", async () => {
    req.method = "GET";
    req.query.session = "valid-session-id";
    (stripe.checkout.sessions.retrieve as jest.Mock).mockResolvedValue({
      metadata: { userId: null },
    });

    await handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith(
      "/themes?payment=0&error=invalid_customer"
    );
  });

  it("redirects if everything is valid", async () => {
    req.method = "GET";
    req.query.session = "valid-session-id";
    (stripe.checkout.sessions.retrieve as jest.Mock).mockResolvedValue({
      metadata: { userId: true },
    });
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      user: { id: "user-id", email: "user@example.com" },
    });

    await handler(req, res);

    expect(db.query.purchases.findFirst).toHaveBeenCalled();
    expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledWith(
      "valid-session-id"
    );
    expect(db.insert).toHaveBeenCalled();
    expect(db.query.users.findFirst).toHaveBeenCalled();
    expect(db.update).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("/themes?payment=1");
  });

  it("redirects if any server error occurs", async () => {
    req.method = "GET";
    req.query.session = "valid-session-id";
    (stripe.checkout.sessions.retrieve as jest.Mock).mockResolvedValue({
      metadata: { userId: true },
    });
    (db.query.users.findFirst as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(db.query.purchases.findFirst).toHaveBeenCalled();
    expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledWith(
      "valid-session-id"
    );
    expect(db.insert).toHaveBeenCalled();
    expect(db.query.users.findFirst).toHaveBeenCalled();
    expect(db.update).not.toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith("/themes?payment=0&error=server");
  });
});
