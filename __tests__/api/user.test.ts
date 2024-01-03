import db from "@/db";
import handler from "@/pages/api/user";
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
    userViews: {
      findFirst: jest.fn(),
    },
  },
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn(() => Promise.resolve([{ id: "user-id" }])),
}));

describe("User API Endpoint", () => {
  let req: NextApiRequest, res: NextApiResponse;

  beforeEach(() => {
    req = {
      method: "GET",
      headers: { "x-forwarded-for": "127.0.0.1" },
    } as unknown as NextApiRequest;
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

  it("should return 400 if there is missing required fields", async () => {
    req.body = { id: null };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
  });

  it("should return 200 with a list of followings if type is 'following'", async () => {
    req.query = { id: "user-id", type: "following" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      following: [
        {
          following: {
            id: "following-id",
            createdThemes: [
              {
                id: "theme-id",
              },
            ],
          },
        },
      ],
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      followings: [
        {
          following: {
            id: "following-id",
            createdThemes: 1,
          },
        },
      ],
    });
  });

  it("should return 401 if type is 'following' and there is no session", async () => {
    req.query = { id: "user-id", type: "following" };
    (getServerSession as jest.Mock).mockResolvedValue(null);
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      following: [
        {
          following: {
            id: "following-id",
            createdThemes: [
              {
                id: "theme-id",
              },
            ],
          },
        },
      ],
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unauthorized",
    });
  });

  it("should return 500 if type is 'following' and there is an error", async () => {
    req.query = { id: "user-id", type: "following" };
    (db.query.users.findFirst as jest.Mock).mockRejectedValue(new Error());

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch followings",
    });
  });

  it("should return 200 with a list of followers if type is 'followers'", async () => {
    req.query = { id: "user-id", type: "followers" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      followers: [
        {
          follower: {
            id: "follower-id",
            createdThemes: [
              {
                id: "theme-id",
              },
            ],
          },
        },
      ],
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      followers: [
        {
          follower: {
            id: "follower-id",
            createdThemes: 1,
          },
        },
      ],
    });
  });

  it("should return 401 if type is 'followers' and there is no session", async () => {
    req.query = { id: "user-id", type: "followers" };
    (getServerSession as jest.Mock).mockResolvedValue(null);
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      followers: [
        {
          follower: {
            id: "follower-id",
            createdThemes: [
              {
                id: "theme-id",
              },
            ],
          },
        },
      ],
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unauthorized",
    });
  });

  it("should return 500 if type is 'followers' and there is an error", async () => {
    req.query = { id: "user-id", type: "followers" };
    (db.query.users.findFirst as jest.Mock).mockRejectedValue(new Error());

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch followers",
    });
  });

  it("should return 200 with a user stats if type is 'stats'", async () => {
    req.query = { id: "user-id", type: "stats" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      createdThemes: [
        {
          id: "theme-id",
          likedBy: [
            {
              id: "user-id",
            },
          ],
          savedBy: [
            {
              id: "user-id",
            },
          ],
        },
      ],
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      likes: 1,
      saves: 1,
    });
  });

  it("should return 500 if type is 'stats' and there is an error", async () => {
    req.query = { id: "user-id", type: "stats" };
    (db.query.users.findFirst as jest.Mock).mockRejectedValue(new Error());

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch user stats",
    });
  });

  it("should return 400 if type is invalid", async () => {
    req.query = { id: "user-id", type: "invalid" };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid type",
    });
  });

  it("should return 200 with a user if session user is same as requested user", async () => {
    req.query = { id: "user-id" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      pupa: 10,
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "user-id",
      pupa: 10,
    });
  });

  it("should return 404 if session user is same as requested user and there is no user", async () => {
    req.query = { id: "user-id" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "User not found",
    });
  });

  it("should return 500 if session user is same as requested user and there is an error", async () => {
    req.query = { id: "user-id" };
    (db.query.users.findFirst as jest.Mock).mockRejectedValue(new Error());

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch user",
    });
  });

  it("should return 200 with a user if user is requested with session", async () => {
    req.query = { id: "user-id" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "user-id",
    });
  });

  it("should return 404 if user is requested with session and there is no user", async () => {
    req.query = { id: "user-id" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "User not found",
    });
  });

  it("should return 500 if user is requested with session and there is an error", async () => {
    req.query = { id: "user-id" };
    (db.query.users.findFirst as jest.Mock).mockRejectedValue(new Error());

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch user",
    });
  });

  it("should return 500 if session user is same as requested user and there is an error", async () => {
    req.query = { id: "user-id" };
    (db.query.users.findFirst as jest.Mock).mockRejectedValue(new Error());

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch user",
    });
  });

  it("should return 200 with a user if user is requested with NO session", async () => {
    req.query = { id: "user-id" };
    (getServerSession as jest.Mock).mockResolvedValue(null);
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "user-id",
    });
  });

  it("should return 404 if user is requested with NO session and there is no user", async () => {
    req.query = { id: "user-id" };
    (getServerSession as jest.Mock).mockResolvedValue(null);
    (db.query.users.findFirst as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "User not found",
    });
  });

  it("should return 500 if user is requested with NO session and there is an error", async () => {
    req.query = { id: "user-id" };
    (getServerSession as jest.Mock).mockResolvedValue(null);
    (db.query.users.findFirst as jest.Mock).mockRejectedValue(new Error());

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch user",
    });
  });
  it("should return 400 if missing required fields when creating new user", async () => {
    req.method = "POST";
    req.body = {
      name: "User",
      email: "user@example.com",
      password: undefined,
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Missing required fields",
    });
  });

  it("should return 400 if user already exists when creating new user", async () => {
    req.method = "POST";
    req.body = {
      name: "User",
      email: "user@example.com",
      password: "password",
    };
    (
      ((db.select as jest.Mock)().from as jest.Mock)().where as jest.Mock
    ).mockResolvedValue([{ id: "user-id" }]);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "User already exists",
    });
  });

  it("should return 201 if new user is created", async () => {
    req.method = "POST";
    req.body = {
      name: "User",
      email: "user@example.com",
      password: "password",
    };
    (
      ((db.select as jest.Mock)().from as jest.Mock)().where as jest.Mock
    ).mockResolvedValue([]);

    await handler(req, res);

    expect(db.insert).toHaveBeenCalled();
    expect((db.insert as jest.Mock)().values).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: "user-id",
    });
  });

  it("should return 500 if new user is created and there is an error", async () => {
    req.method = "POST";
    req.body = {
      name: "User",
      email: "user@example.com",
      password: "password",
    };
    (
      ((db.insert as jest.Mock)().values as jest.Mock)().returning as jest.Mock
    ).mockRejectedValue(new Error());

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to create user",
    });
  });
});
