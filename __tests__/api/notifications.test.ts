import db from "@/db";
import handler from "@/pages/api/notifications";
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
    usersTonotifications: {
      findMany: jest.fn(),
    },
  },
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
}));

describe("Notifications API Endpoint", () => {
  let req: NextApiRequest, res: NextApiResponse;

  beforeEach(() => {
    req = { method: "" } as NextApiRequest;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    (getServerSession as jest.Mock).mockResolvedValue({
      user: { id: "user-id", email: "user@example.com" },
    });

    jest.clearAllMocks();
  });

  it("should return 405 for non-POST or non-GET methods", async () => {
    req.method = "PUT";

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it("should return 401 if there is no session", async () => {
    req.method = "GET";
    (getServerSession as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
  });

  it("should return 200 with FALSE if there is NO new notifications", async () => {
    req.method = "GET";
    req.query = { new: "1" };
    (db.query.usersTonotifications.findMany as jest.Mock).mockResolvedValue([]);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ new: false });
  });

  it("should return 200 with TRUE if there is any new notifications", async () => {
    req.method = "GET";
    req.query = { new: "1" };
    (db.query.usersTonotifications.findMany as jest.Mock).mockResolvedValue([
      { id: 1, read: false },
    ]);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ new: true });
  });

  it("should return 500 if there is an error fetching notifications status", async () => {
    req.method = "GET";
    req.query = { new: "1" };
    (db.query.usersTonotifications.findMany as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch notification status",
    });
  });

  it("should return 200 if notifications are fetched successfully", async () => {
    req.method = "GET";
    (db.query.usersTonotifications.findMany as jest.Mock).mockResolvedValue([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });

  it("should return 500 if there is an error fetching notifications", async () => {
    req.method = "GET";
    (db.query.usersTonotifications.findMany as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch notifications",
    });
  });

  it("should return 200 if notifications are marked as read", async () => {
    req.method = "POST";
    (db.query.usersTonotifications.findMany as jest.Mock).mockResolvedValue([
      { id: 1, read: false },
    ]);

    await handler(req, res);

    expect(db.update).toHaveBeenCalled();
    expect((db.update as jest.Mock)().set).toHaveBeenCalledWith(
      expect.anything()
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ markAsRead: 1 });
  });

  it("should return 200 if notifications are already marked as read", async () => {
    req.method = "POST";
    (db.query.usersTonotifications.findMany as jest.Mock).mockResolvedValue([]);

    await handler(req, res);

    expect(db.update).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ markAsRead: false });
  });

  it("should return 500 if there is an error marking notifications as read", async () => {
    req.method = "POST";
    (db.query.usersTonotifications.findMany as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );

    await handler(req, res);

    expect(db.update).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to mark notifications as read",
    });
  });
});
