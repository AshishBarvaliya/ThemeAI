import db from "@/db";
import handler from "@/pages/api/user/follow";
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
  insert: jest.fn().mockReturnThis(),
  values: jest.fn(() => Promise.resolve({ id: "mock-id" })),
}));

describe("User Follow API Endpoint", () => {
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

  it("should return 400 if there is missing required fields", async () => {
    req.body = { userId: null };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
  });

  it("should return 400 if user id and session id are same", async () => {
    req.body = { userId: "user-id" };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "You cannot follow yourself",
    });
  });

  it("should return 201 if user is followed", async () => {
    req.body = { userId: "other-user-id" };

    (db.insert as jest.Mock)().values as jest.Mock;

    await handler(req, res);

    expect(db.insert).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      follow: true,
      followerId: "user-id",
      followingId: "other-user-id",
    });
  });

  it("should return 500 if there is an error", async () => {
    req.body = { userId: "other-user-id" };

    ((db.insert as jest.Mock)().values as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );

    await handler(req, res);

    expect(db.insert).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to follow user",
    });
  });
});
