import db from "@/db";
import handler from "@/pages/api/update-password";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";

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
    resetPasswords: {
      findFirst: jest.fn(),
    },
  },
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
}));

jest.mock("bcrypt", () => ({
  default: jest.fn().mockImplementation(() => ({
    compare: jest.fn(),
    hash: jest.fn(),
  })),
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe("Update Password API Endpoint", () => {
  let req: NextApiRequest, res: NextApiResponse;

  beforeEach(() => {
    req = { method: "PUT" } as NextApiRequest;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "user-id", email: "user@example.com" },
    });

    jest.clearAllMocks();
  });

  it("should return 405 for non-PUT methods", async () => {
    req.method = "GET";

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it("should return 400 if password is missing", async () => {
    req.body = { password: undefined };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Password is required" });
  });

  it("should return 401 if method is password based and user is not authenticated", async () => {
    req.body = { password: "new-password" };
    (getServerSession as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should return 400 if method is password based and current password is missing", async () => {
    req.body = { password: "new-password", currentpassword: undefined };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Current password is required",
    });
  });

  it("should return 400 if method is password based and hashedpassword is missing", async () => {
    req.body = {
      password: "new-password",
      currentpassword: "current-password",
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      hashedPassword: false,
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "You can not update your password as your account is connected with Google.",
    });
  });

  it("should return 400 if method is password based and current password is incorrect", async () => {
    req.body = {
      password: "new-password",
      currentpassword: "current-password",
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      hashedPassword: true,
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid current password",
    });
  });

  it("should return 200 if method is password based and password is updated successfully", async () => {
    req.body = {
      password: "new-password",
      currentpassword: "current-password",
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      hashedPassword: true,
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    await handler(req, res);

    expect(db.update).toHaveBeenCalled();
    expect((db.update as jest.Mock)().set).toHaveBeenCalledWith(
      expect.anything()
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "The password has been updated successfully",
    });
  });

  it("should return 400 if method is password based and server error", async () => {
    req.body = {
      password: "new-password",
      currentpassword: "current-password",
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      hashedPassword: true,
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (
      ((db.update as jest.Mock)().set as jest.Mock)().where as jest.Mock
    ).mockRejectedValue(new Error("An error occurred"));

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to update user",
    });
  });

  it("should return 400 if method is token based and token is invalid", async () => {
    req.query = {
      token: "invalid-token",
    };
    req.body = {
      password: "new-password",
    };
    (db.query.resetPasswords.findFirst as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid token",
    });
  });

  it("should return 400 if method is token based and token is expired", async () => {
    req.query = {
      token: "token",
    };
    req.body = {
      password: "new-password",
    };
    let date = new Date();
    date.setDate(date.getDate() - 5);
    (db.query.resetPasswords.findFirst as jest.Mock).mockResolvedValue({
      expiresAt: date,
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Token expired",
    });
  });

  it("should return 400 if method is token based and hashedpassword is missing", async () => {
    req.query = {
      token: "token",
    };
    req.body = {
      password: "new-password",
    };
    (db.query.resetPasswords.findFirst as jest.Mock).mockResolvedValue({
      expiresAt: new Date(),
      user: {
        isActived: false,
        hashedPassword: false,
      },
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "You can not update your password as your account is connected with Google.",
    });
  });

  it("should return 200 if method is token based and password is updated successfully", async () => {
    req.query = {
      token: "token",
    };
    req.body = {
      password: "new-password",
    };
    let date = new Date();
    date.setDate(date.getDate() + 1);
    (db.query.resetPasswords.findFirst as jest.Mock).mockResolvedValue({
      expiresAt: date,
      user: {
        id: "user-id",
        isActived: true,
        hashedPassword: true,
      },
    });
    (
      ((db.update as jest.Mock)().set as jest.Mock)().where as jest.Mock
    ).mockResolvedValue({
      id: "user-id",
    });

    await handler(req, res);

    expect(db.update).toHaveBeenCalled();
    expect((db.update as jest.Mock)().set).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "The password has been updated successfully",
    });
  });

  it("should return 200 if method is token based and server error", async () => {
    req.query = {
      token: "token",
    };
    req.body = {
      password: "new-password",
    };
    let date = new Date();
    date.setDate(date.getDate() + 1);
    (db.query.resetPasswords.findFirst as jest.Mock).mockResolvedValue({
      expiresAt: date,
      user: {
        id: "user-id",
        isActived: true,
        hashedPassword: true,
      },
    });
    (
      ((db.update as jest.Mock)().set as jest.Mock)().where as jest.Mock
    ).mockRejectedValue(new Error("An error occurred"));

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to update user",
    });
  });
});
