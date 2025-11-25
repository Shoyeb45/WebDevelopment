import { app } from "../app";
import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { prisma } from "../__mocks__/db";

vi.mock("../db");

describe("POST /sum", () => {
  it("should be 3", async () => {
    prisma.sum.create.mockResolvedValue({
      id: 1, 
      a: 1, 
      b: 2,
      sum: 3
    });

    vi.spyOn(prisma.sum, 'create');

    const res = await request(app).post("/sum").send({ a: 1, b: 2 });
    
    expect(prisma.sum.create).toHaveBeenCalledWith({
      data: {
        a: 1, b: 2, sum: 3
      }
    });
    
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
    expect(res.body.id).toBe(1);
  });

  it("Should give error, invalid data", async () => {
    const res = await request(app).post("/sum").send({ a: "Shoyeb", b: 123 });
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe("Invalid Data");
  });

  it("Should give -9", async () => {
    const res = await request(app).post('/sum').send({ a: -15, b: 6 });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(-9);
    expect(res.body.id).toBe(1);
  });
});
