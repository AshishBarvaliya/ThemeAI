import { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/contact-us";
import db from "@/db";

jest.mock("@/db", () => {
  return {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returning: jest.fn(() => Promise.resolve({ id: "mock-id" })),
  };
});

describe("Support Ticket API Endpoint", () => {
  let req: NextApiRequest, res: NextApiResponse;

  beforeEach(() => {
    req = {
      method: "",
      body: {},
    } as NextApiRequest;

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

  it("should return 400 if required fields are missing", async () => {
    req.method = "POST";
    req.body = { name: "Test", email: "test@example.com" };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing required fields" });
  });

  it("should return 201 and create a new support ticket", async () => {
    req.method = "POST";
    req.body = {
      name: "Test",
      email: "test@example.com",
      topic: "Test Topic",
      description: "Test Description",
    };

    await handler(req, res);

    expect(db.insert).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      id: expect.any(String),
    });
  });

  it("should return 500 if there is an error", async () => {
    req.method = "POST";
    req.body = {
      name: "Test",
      email: "test@example.com",
      topic: "Test Topic",
      description: "Test Description",
    };

    (
      ((db.insert as jest.Mock)().values as jest.Mock)().returning as jest.Mock
    ).mockRejectedValue(new Error("An error occurred"));

    await handler(req, res);

    expect(db.insert).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to create support ticket",
    });
  });
});
