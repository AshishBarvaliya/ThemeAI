import openai from "@/config/openai";
import db from "@/db";
import handler from "@/pages/api/generate";
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
  update: jest.fn(),
}));
jest.mock("@/config/openai", () => ({
  moderations: {
    create: jest.fn(),
  },
  chat: {
    completions: {
      create: jest.fn(),
    },
  },
}));

describe("Generate API Endpoint", () => {
  let req: NextApiRequest, res: NextApiResponse;

  beforeEach(() => {
    req = { method: "POST", body: {} } as NextApiRequest;
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

  it("should return 400 if details are missing", async () => {
    req.body = {
      details: null,
      isDark: false,
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Missing required fields",
    });
  });

  it("should return 404 if user is not found", async () => {
    req.body = {
      details: "test details",
      isDark: false,
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue(null);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "User not found",
    });
  });

  it("should return 400 if pupa is insufficient", async () => {
    req.body = {
      details: "test details",
      isDark: false,
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      pupa: 0,
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error:
        "You don't have enough prompt to generate colors. please purchase prompts!",
    });
  });

  it("should return 400 if content is flagged by OpenAI", async () => {
    req.body = {
      details: "test details",
      isDark: false,
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      pupa: 1,
    });
    (openai.moderations.create as jest.Mock).mockResolvedValue({
      results: [{ flagged: true }],
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Flagged content as violating OpenAI terms",
    });
  });

  it("should return 500 for GPT response error", async () => {
    req.body = {
      details: "test details",
      isDark: false,
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      pupa: 1,
    });
    (openai.moderations.create as jest.Mock).mockResolvedValue({
      results: [{ flagged: false }],
    });
    (openai.chat.completions.create as jest.Mock).mockResolvedValue({
      choices: [
        {
          message: {
            content: null,
          },
        },
      ],
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error generating colors",
    });
  });

  it("should return 500 for json parse error", async () => {
    req.body = {
      details: "test details",
      isDark: false,
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      pupa: 1,
    });
    (openai.moderations.create as jest.Mock).mockResolvedValue({
      results: [{ flagged: false }],
    });
    (openai.chat.completions.create as jest.Mock).mockResolvedValue({
      choices: [
        {
          message: {
            content: "non json",
          },
        },
      ],
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error generating colors",
    });
  });

  it("should return 500 for server error", async () => {
    req.body = {
      details: "test details",
      isDark: false,
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      pupa: 1,
    });
    (openai.moderations.create as jest.Mock).mockResolvedValue({
      results: [{ flagged: false }],
    });
    (openai.chat.completions.create as jest.Mock).mockRejectedValue(
      new Error()
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Something went wrong",
    });
  });

  it("should return 200 and generate colors", async () => {
    let obj = {
      bg: "#ffffff",
      primary: "#000000",
      accent: "#000000",
      complementary: "#000000",
      bg_reason: "good",
      primary_reason: "good",
      accent_reason: "good",
      complementary_reason: "good",
    };
    req.body = {
      details: "test details",
      isDark: false,
    };
    (db.query.users.findFirst as jest.Mock).mockResolvedValue({
      pupa: 1,
    });
    (openai.moderations.create as jest.Mock).mockResolvedValue({
      results: [{ flagged: false }],
    });
    (openai.chat.completions.create as jest.Mock).mockResolvedValue({
      choices: [
        {
          message: {
            content: JSON.stringify(obj),
          },
        },
      ],
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      color_1: obj.bg,
      color_2: obj.primary,
      color_3: obj.accent,
      color_4: obj.complementary,
      color_1_reason: obj.bg_reason,
      color_2_reason: obj.primary_reason,
      color_3_reason: obj.accent_reason,
      color_4_reason: obj.complementary_reason,
    });
  });
});
