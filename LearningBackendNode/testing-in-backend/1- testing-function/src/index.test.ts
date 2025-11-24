import { describe, expect, it } from "@jest/globals";
import { add, multiply } from "./index";


describe("Add module", () => {
    it("adds 1 + 2 to equal 3.", () => {
        expect(add(1, 2)).toBe(3);
    });

    it('negative number test', () => {
        expect(add(-1, -2)).toBe(-3);
    });

    it('large number sum', () => {
        expect(add(10000, 12323)).toBe(22323);
    });
});


describe('Multiply module', () => {
    it("Multiply 9 and 2 get 18.", () => {
        expect(multiply(2, 9)).toBe(18);
    });

    it('Multiply negative numbers.', () => {
        expect(multiply(-9, 1)).toBe(-9);
    });
});

