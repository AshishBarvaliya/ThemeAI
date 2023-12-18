import { sendEmail } from "@/config/mailgun";
import db from "@/db";
import handler from "@/pages/api/reset-password";
import { NextApiRequest, NextApiResponse } from "next";

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

describe("Reset Password API Endpoint", () => {
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

  it("should return 400 if there is missing required fields", async () => {
    req.body = { email: null };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
  });

  it("should return 201 if asscociated user is NOT found", async () => {
    req.body = { email: "invalid@user.com" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue(null);
    (sendEmail as jest.Mock).mockResolvedValue({
      id: "message-id",
      message: "Verification mail has been sent",
    });
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      messsage: "Reset password mail has been sent",
    });
  });

  it("should return 404 if user is not verified", async () => {
    req.body = { email: "user@example.com" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      isActived: false,
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "User is not verified",
    });
  });

  it("should return 404 if user forgot password limit is reached", async () => {
    req.body = { email: "user@example.com" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      isActived: true,
      resetPasswords: {
        length: parseInt(process.env.FORGOT_PASSWORD_MAIL_LIMIT || "0"),
      },
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Reset password limit reached",
    });
  });

  it("should return 201 if reset password mail has been sent", async () => {
    req.body = { email: "user@example.com" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      isActived: true,
      resetPasswords: {
        length: 1,
      },
    });

    await handler(req, res);

    expect(db.insert).toHaveBeenCalled();
    expect((db.insert as jest.Mock)().values).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      messsage: "Reset password mail has been sent",
    });
  });

  it("should return 500 if there is an error", async () => {
    req.body = { email: "user@example.com" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      isActived: true,
      resetPasswords: {
        length: 1,
      },
    });
    ((db.insert as jest.Mock)().values as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to send reset password mail",
    });
  });
});
