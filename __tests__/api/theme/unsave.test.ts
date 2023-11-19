import handler from "@/pages/api/theme/dislike";
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
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  where: jest.fn(() => Promise.resolve({ id: "mock-id" })),
}));

describe("Theme Unsave API Endpoint", () => {
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
    req.body = { themeId: null };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
  });

  it.todo("should return 202 if theme is unsaved");

  it.todo("should return 500 if there is an error");
});
