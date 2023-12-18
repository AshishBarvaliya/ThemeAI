import { sendEmail } from "@/config/mailgun";
import db from "@/db";
import handler from "@/pages/api/send-verification-email";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

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

jest.mock("@/db", () => ({
  query: {
    users: {
      findFirst: jest.fn(),
    },
  },
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
}));

jest.mock("@/config/mailgun", () => ({
  sendEmail: jest.fn(),
}));

describe("Send Verification Email API Endpoint", () => {
  let req: NextApiRequest, res: NextApiResponse;

  beforeEach(() => {
    req = { method: "POST" } as NextApiRequest;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "user-id", email: "user@example.com" },
    });

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

  it("should return 404 if user is already verified", async () => {
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      isActived: true,
      verificationTokens: {
        length: parseInt(process.env.VERIFICATION_MAIL_LIMIT || "0"),
      },
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "User is already verified",
    });
  });

  it("should return 404 if user verification mail limit is reached", async () => {
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      isActived: true,
      verificationTokens: {
        length: parseInt(process.env.VERIFICATION_MAIL_LIMIT || "0"),
      },
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "User is already verified",
    });
  });

  it("should return 201 if verification mail has been sent", async () => {
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      isActived: false,
      verificationTokens: {
        length: 1,
      },
    });
    (sendEmail as jest.Mock).mockResolvedValue({
      id: "message-id",
      message: "Verification mail has been sent",
    });

    await handler(req, res);

    expect(db.insert).toHaveBeenCalled();
    expect((db.insert as jest.Mock)().values).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      messsage: "Verification mail has been sent",
    });
  });

  it("should return 500 if there is an error", async () => {
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      isActived: false,
      verificationTokens: {
        length: 1,
      },
    });
    ((db.insert as jest.Mock)().values as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to send verification mail",
    });
  });
});
