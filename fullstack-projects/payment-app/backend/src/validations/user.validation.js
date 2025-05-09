import zod from "zod";

export const userSignupSchema = zod.object({
    username: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().email(),
    password: zod.string(),
});

export const userInfoSchema = zod.object({
    username: zod.string().optional(),
    email: zod.string().email().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(), 
});

export const userSigninSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
});

export const userPasswordSchema = zod.object({
    oldPassword: zod.string(),
    newPassword: zod.string()
});
