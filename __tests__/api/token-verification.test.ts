import db from "@/db";
import handler from "@/pages/api/token-verification";
import { NextApiRequest, NextApiResponse } from "next";

jest.mock("@/db", () => ({
  query: {
    verificationTokens: {
      findFirst: jest.fn(),
    },
  },
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
}));

describe("Token Verification API Endpoint", () => {
  let req: NextApiRequest, res: NextApiResponse;

  beforeEach(() => {
    req = { method: "GET" } as NextApiRequest;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
      redirect: jest.fn(),
    } as unknown as NextApiResponse;

    jest.clearAllMocks();
  });

  it("should return 405 for non-GET methods", async () => {
    req.method = "POST";

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it("should return 400 if token is missing", async () => {
    req.query = { token: undefined };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Token required" });
  });

  it("redirects if token is invalid", async () => {
    req.query = { token: "token" };
    (db.query.verificationTokens.findFirst as jest.Mock).mockResolvedValue(
      null
    );

    await handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith("/themes?verify=0&error=invalid");
  });

  it("redirects if user is already verified", async () => {
    req.query = { token: "token" };
    (db.query.verificationTokens.findFirst as jest.Mock).mockResolvedValue({
      token: "token",
      expiresAt: new Date(),
      user: {
        isActived: true,
      },
    });

    await handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith(
      "/themes?verify=0&error=verified"
    );
  });

  it("redirects if token is expired", async () => {
    req.query = { token: "token" };
    let date = new Date();
    date.setDate(date.getDate() - 1);
    (db.query.verificationTokens.findFirst as jest.Mock).mockResolvedValue({
      token: "token",
      expiresAt: date,
      user: {
        isActived: false,
      },
    });

    await handler(req, res);

    expect(res.redirect).toHaveBeenCalledWith("/themes?verify=0&error=expired");
  });

  it("redirects if user is verified successfully", async () => {
    req.query = { token: "token" };
    (db.query.verificationTokens.findFirst as jest.Mock).mockResolvedValue({
      token: "token",
      expiresAt: new Date(),
      user: {
        isActived: false,
      },
    });

    await handler(req, res);

    expect(db.update).toHaveBeenCalled();
    expect((db.update as jest.Mock)().set).toHaveBeenCalledWith({
      isActived: true,
    });
    expect(res.redirect).toHaveBeenCalledWith("/themes?verify=1");
  });

  it("should return 500 if there is an error", async () => {
    req.query = { token: "token" };
    (db.query.verificationTokens.findFirst as jest.Mock).mockResolvedValue({
      token: "token",
      expiresAt: new Date(),
      user: {
        isActived: false,
      },
    });
    (
      ((db.update as jest.Mock)().set as jest.Mock)().where as jest.Mock
    ).mockRejectedValue(new Error("An error occurred"));

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to verify token",
    });
  });
});
