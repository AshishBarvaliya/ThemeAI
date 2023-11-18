import handler from "@/pages/api/feedback";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import db from "@/db";

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

jest.mock("@/db", () => {
  return {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn(() => Promise.resolve({ id: "mock-id" })),
  };
});

describe("Feedback API Endpoint", () => {
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

  it("should return 400 if required fields are missing", async () => {
    req.body = {
      color_1: "red",
      color_2: "blue",
      color_3: "green",
      color_4: "yellow",
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
  });

  it("should return 201 if feedback is created successfully", async () => {
    req.body = {
      color_1: "red",
      color_2: "blue",
      color_3: "green",
      color_4: "yellow",
      color_1_reason: "Reason 1",
      color_2_reason: "Reason 2",
      color_3_reason: "Reason 3",
      color_4_reason: "Reason 4",
      prompt: "Prompt",
      isDark: false,
      feedback: "Feedback",
    };

    await handler(req, res);

    expect(db.insert).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: "mock-id",
    });
  });

  it("should return 500 if there is an error", async () => {
    req.body = {
      color_1: "red",
      color_2: "blue",
      color_3: "green",
      color_4: "yellow",
      color_1_reason: "Reason 1",
      color_2_reason: "Reason 2",
      color_3_reason: "Reason 3",
      color_4_reason: "Reason 4",
      prompt: "Prompt",
      isDark: false,
      feedback: "Feedback",
    };

    (
      ((db.insert as jest.Mock)().values as jest.Mock)().returning as jest.Mock
    ).mockRejectedValue(new Error("An error occurred"));

    await handler(req, res);

    expect(db.insert).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to submit feedback",
    });
  });
});
