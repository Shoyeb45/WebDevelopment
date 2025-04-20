import zod from "zod";

export const userSignupSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
});

export const userSigninSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
});