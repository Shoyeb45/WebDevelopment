import zod from "zod";

export const validationSchema = zod.object({
    username: zod.string().min(5).max(14),
    password: zod.string().min(6).max(10),
});

export const courseSchemaValidation = zod.object({
    title: zod.string(),
    description: zod.string().or(zod.undefined()),
    price: zod.number(),
    imageLink: zod.string().url(),
});