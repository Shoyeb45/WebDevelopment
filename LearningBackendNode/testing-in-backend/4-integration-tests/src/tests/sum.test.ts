import { describe, expect, it } from "vitest";
import { app } from "../app.js";
import request from "supertest";

describe("POST /sum", () => {
    it("Should return the addition 2 given numbers.", async () => {
        const { status, body } = await request(app).post('/sum').send({ a : 1, b : 2});
        expect(status).toBe(200);
        expect(body).toEqual({ answer: 3, id: expect.any(Number)});
    });
});
