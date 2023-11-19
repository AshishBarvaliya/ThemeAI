import db from "@/db";
import handler from "@/pages/api/tags";
import { NextApiRequest, NextApiResponse } from "next";

jest.mock("@/db", () => ({
  query: {
    tags: {
      findMany: jest.fn(),
    },
  },
}));

describe("Tags API Endpoint", () => {
  let req: NextApiRequest, res: NextApiResponse;

  beforeEach(() => {
    req = { method: "GET" } as NextApiRequest;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    jest.clearAllMocks();
  });

  it("should return 405 for non-GET methods", async () => {
    req.method = "POST";

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method not allowed" });
  });

  it("should return 200 if tags are fetched successfully", async () => {
    (db.query.tags.findMany as jest.Mock).mockResolvedValue([{ id: 1 }]);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
  });

  it("should return 500 if there is an error", async () => {
    (db.query.tags.findMany as jest.Mock).mockRejectedValue(
      new Error("An error occurred")
    );

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to fetch tags",
    });
  });
});
