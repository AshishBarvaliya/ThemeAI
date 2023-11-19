import db from "@/db";
import handler from "@/pages/api/user/unfollow";
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
  delete: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
}));

describe("User Unfollow API Endpoint", () => {
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

  it("should return 202 if user is unfollowed", async () => {
    req.body = { userId: "other-user-id" };

    await handler(req, res);

    expect(db.delete).toHaveBeenCalled();
    expect((db.delete as jest.Mock)().where).toHaveBeenCalledWith(
      expect.anything()
    );
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      unfollow: true,
      followerId: "user-id",
      followingId: "other-user-id",
    });
  });

  it("should return 500 if there is an error", async () => {
    req.body = { userId: "other-user-id" };
    ((db.delete as jest.Mock)().where as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );

    await handler(req, res);

    expect(db.delete).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to unfollow user",
    });
  });
});
