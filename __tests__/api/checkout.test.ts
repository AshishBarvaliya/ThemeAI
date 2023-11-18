import handler from "@/pages/api/checkout";
import stripe from "@/config/stripe";
import db from "@/db";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

jest.mock("@auth/drizzle-adapter", () => {
  return {
    DrizzleAdapter: jest.fn(),
  };
});

jest.mock("next-auth", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    getServerSession: jest.fn(),
  })),
  getServerSession: jest.fn(),
}));

jest.mock("@/config/stripe", () => ({
  customers: {
    create: jest.fn(),
  },
  checkout: {
    sessions: {
      create: jest.fn(),
    },
  },
}));

jest.mock("@/db", () => ({
  query: {
    users: {
      findFirst: jest.fn(),
    },
  },
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn(),
}));

describe("Stripe Integration API Endpoint", () => {
  let req: NextApiRequest, res: NextApiResponse;

  beforeEach(() => {
    req = { method: "POST" } as NextApiRequest;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    jest.clearAllMocks();
  });

  it("should return 405 for non-POST methods", async () => {
    req.method = "GET";

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it("should return 401 if there is no session", async () => {
    (getServerSession as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should return 200 if there is existing Stripe customer", async () => {
    req.method = "POST";
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "user-id", email: "user@example.com" },
    });
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      stripeCustomerId: "existing-customer-id",
    });
    (stripe.checkout.sessions.create as jest.Mock).mockResolvedValue({
      url: "http://mocked-url.com",
    });

    await handler(req, res);

    expect(stripe.customers.create).not.toHaveBeenCalled();
    expect(stripe.checkout.sessions.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ url: "http://mocked-url.com" });
  });

  it("should return 200 and create a new Stripe customer and handle checkout session", async () => {
    req.method = "POST";
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "user-id", email: "user@example.com" },
    });
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({});
    (stripe.customers.create as jest.Mock).mockResolvedValue({
      id: "new-customer-id",
    });
    (stripe.checkout.sessions.create as jest.Mock).mockResolvedValue({
      url: "http://mocked-url.com",
    });

    await handler(req, res);

    expect(stripe.customers.create).toHaveBeenCalled();
    expect(stripe.checkout.sessions.create).toHaveBeenCalled();
    expect(db.update).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ url: "http://mocked-url.com" });
  });

  it("should return 500 if there is failure in creating Stripe customer", async () => {
    req.method = "POST";
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "user-id", email: "user@example.com" },
    });
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({});
    (stripe.customers.create as jest.Mock).mockRejectedValue(
      new Error("Stripe error")
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to create customer",
    });
  });

  it("should return 500 if there is failure in creating Stripe checkout session", async () => {
    req.method = "POST";
    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "user-id", email: "user@example.com" },
    });
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      stripeCustomerId: "customer-id",
    });
    (stripe.checkout.sessions.create as jest.Mock).mockRejectedValue(
      new Error("Stripe error")
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to create checkout session",
    });
  });
});
