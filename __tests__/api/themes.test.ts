import db from "@/db";
import handler from "@/pages/api/themes";
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
    themes: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    users: {
      findFirst: jest.fn(),
    },
    usersToSavedThemes: {
      findMany: jest.fn(),
    },
    usersToLikedThemes: {
      findMany: jest.fn(),
    },
    themesToTags: {
      findMany: jest.fn(),
    },
  },
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn(() => Promise.resolve([{ id: "theme-id" }])),
}));

describe("Themes API Endpoint", () => {
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

  it("should return 200 with a theme if theme id is provided and theme is public", async () => {
    req.query = { id: "theme-id" };
    (db.query.themes.findFirst as jest.Mock).mockResolvedValue({
      id: "theme-id",
      name: "theme-name",
      isPrivate: false,
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      id: "theme-id",
      name: "theme-name",
      isPrivate: false,
    });
  });
  describe("Fetch by theme id", () => {
    it("should return 200 with a theme if theme is private and user is logged in", async () => {
      req.query = { id: "theme-id" };
      (db.query.themes.findFirst as jest.Mock).mockResolvedValue({
        id: "theme-id",
        name: "theme-name",
        isPrivate: true,
        user: {
          id: "user-id",
        },
      });

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        id: "theme-id",
        name: "theme-name",
        isPrivate: true,
        user: {
          id: "user-id",
        },
      });
    });

    it("should return 403 if theme is private and user is NOT logged in", async () => {
      req.query = { id: "theme-id" };
      (getServerSession as jest.Mock).mockResolvedValue(null);
      (db.query.themes.findFirst as jest.Mock).mockResolvedValue({
        id: "theme-id",
        name: "theme-name",
        isPrivate: true,
        user: {
          id: "user-id",
        },
      });

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        error: "Unauthorized",
      });
    });

    it("should return 404 if theme is not found with id", async () => {
      req.query = { id: "theme-id" };
      (db.query.themes.findFirst as jest.Mock).mockResolvedValue(null);

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Theme not found",
      });
    });

    it("should return 500 if if there is an error", async () => {
      req.query = { id: "theme-id" };
      (db.query.themes.findFirst as jest.Mock).mockRejectedValue(new Error());

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch theme",
      });
    });
  });

  it("should return 200 with a list of themes if created themes are requested with session user", async () => {
    req.query = { userId: "user-id", type: "created" };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      id: "user-id",
      createdThemes: [
        {
          id: "theme-id",
          isPrivate: true,
        },
      ],
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: "theme-id", isPrivate: true },
    ]);
  });
  describe("Fetch by themes by type of a user", () => {
    it("should return 200 with a list of themes if created themes are requested with other user", async () => {
      req.query = { userId: "other-user-id", type: "created" };
      (db.query.users.findFirst as jest.Mock).mockResolvedValue({
        id: "user-id",
        createdThemes: [
          {
            id: "theme-id",
            isPrivate: false,
          },
        ],
      });

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: "theme-id", isPrivate: false },
      ]);
    });

    it("should return 200 with a list of themes if saved themes are requested with session user", async () => {
      req.query = { userId: "user-id", type: "saved" };
      (db.query.usersToSavedThemes.findMany as jest.Mock).mockResolvedValue([
        {
          theme: {
            id: "theme-id",
            isPrivate: false,
          },
        },
      ]);

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: "theme-id", isPrivate: false },
      ]);
    });

    it("should return 403 if saved themes are requested with other user", async () => {
      req.query = { userId: "other-user-id", type: "saved" };

      await handler(req, res);

      expect(db.query.usersToSavedThemes.findMany).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    });

    it("should return 200 with a list of themes if liked themes are requested with session user", async () => {
      req.query = { userId: "user-id", type: "liked" };
      (db.query.usersToLikedThemes.findMany as jest.Mock).mockResolvedValue([
        {
          theme: {
            id: "theme-id",
            isPrivate: false,
          },
        },
      ]);

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: "theme-id", isPrivate: false },
      ]);
    });

    it("should return 401 if liked themes are requested with no session user", async () => {
      req.query = { userId: "other-user-id", type: "liked" };
      (getServerSession as jest.Mock).mockResolvedValue(null);

      await handler(req, res);

      expect(db.query.usersToLikedThemes.findMany).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    });

    it("should return 400 if type is invalid", async () => {
      req.query = { userId: "user-id", type: "invalid" };

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid type",
      });
    });

    it("should return 500 if if there is an error while fetching typed themes", async () => {
      req.query = { userId: "user-id", type: "created" };
      (db.query.users.findFirst as jest.Mock).mockRejectedValue(new Error());

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch themes",
      });
    });
  });

  describe("Fetch themes for home", () => {
    it("should return 200 with a list of themes if search string is present and tags are not defined", async () => {
      req.query = { search: "test", tags: undefined };
      (db.query.themes.findMany as jest.Mock).mockResolvedValue([
        {
          id: "theme-id",
          name: "theme-name",
        },
      ]);

      await handler(req, res);

      expect(db.query.themesToTags.findMany).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: "theme-id", name: "theme-name" },
      ]);
    });

    it("should return 200 with a list of themes if search string is present and tags are defined", async () => {
      req.query = { search: "test", tags: "tag1,tag2", type: "popular" };
      (db.query.themesToTags.findMany as jest.Mock).mockResolvedValue([
        {
          theme: {
            id: "theme-id",
            name: "theme-name",
            popularity: 0,
            isPrivate: false,
          },
        },
      ]);

      await handler(req, res);

      expect(db.query.themes.findMany).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: "theme-id", name: "theme-name", isPrivate: false },
      ]);
    });

    it("should return 500 if if there is an error while fetching themes", async () => {
      req.query = { search: "test", tags: undefined };
      (db.query.themes.findMany as jest.Mock).mockRejectedValue(new Error());

      await handler(req, res);

      expect(db.query.themesToTags.findMany).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to fetch themes",
      });
    });
  });

  describe("Add theme", () => {
    it("should return 401 if user is not logged in", async () => {
      req.method = "POST";
      req.body = { name: "theme-name" };
      (getServerSession as jest.Mock).mockResolvedValue(null);

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Unauthorized" });
    });

    it("should return 201 if theme is added with no tags", async () => {
      req.method = "POST";
      req.body = {
        name: "theme-name",
        color_1: "#ffffff",
        color_2: "#000000",
        color_3: "#000000",
        color_4: "#000000",
        color_1_reason: "Reason 1",
        color_2_reason: "Reason 2",
        color_3_reason: "Reason 3",
        color_4_reason: "Reason 4",
        font_1: "Arial",
        font_2: "Arial",
        prompt: "prompt",
        isPrivate: false,
        isAIGenerated: false,
        tags: [],
      };

      await handler(req, res);

      expect(db.insert).toHaveBeenCalled();
      expect((db.insert as jest.Mock)().values).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: "theme-id",
      });
    });

    it("should return 201 if theme is added with tags", async () => {
      req.method = "POST";
      req.body = {
        name: "theme-name",
        color_1: "#ffffff",
        color_2: "#000000",
        color_3: "#000000",
        color_4: "#000000",
        color_1_reason: "Reason 1",
        color_2_reason: "Reason 2",
        color_3_reason: "Reason 3",
        color_4_reason: "Reason 4",
        font_1: "Arial",
        font_2: "Arial",
        prompt: "prompt",
        isPrivate: false,
        isAIGenerated: false,
        tags: [{ name: "tag1" }, { name: "tag2" }],
      };

      await handler(req, res);

      expect(db.insert).toHaveBeenCalled();
      expect((db.insert as jest.Mock)().values).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: "theme-id",
      });
    });

    it("should return 500 if there is an error while adding theme", async () => {
      req.method = "POST";
      req.body = {
        name: "theme-name",
        color_1: "#ffffff",
        color_2: "#000000",
        color_3: "#000000",
        color_4: "#000000",
        color_1_reason: "Reason 1",
        color_2_reason: "Reason 2",
        color_3_reason: "Reason 3",
        color_4_reason: "Reason 4",
        font_1: "Arial",
        font_2: "Arial",
        prompt: "prompt",
        isPrivate: false,
        isAIGenerated: false,
        tags: [],
      };
      (
        ((db.insert as jest.Mock)().values as jest.Mock)()
          .returning as jest.Mock
      ).mockRejectedValue(new Error());

      await handler(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: "Failed to create theme",
      });
    });
  });
});
