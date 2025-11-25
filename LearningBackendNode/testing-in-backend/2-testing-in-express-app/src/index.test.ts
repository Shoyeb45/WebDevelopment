import { app } from "./app";
import { describe, it, expect} from "@jest/globals";
import request from "supertest";

describe("POST /sum", () => {
    it("should be 3", async () => {
        const res = await request(app).post("/sum").send({ a: 1, b: 2 });
        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
    });

    it("Should give error, invalid data", async () => {
        const res = await request(app).post("/sum").send({ a: "Shoyeb", b: 123 });
        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe("Invalid Data");
    });
});