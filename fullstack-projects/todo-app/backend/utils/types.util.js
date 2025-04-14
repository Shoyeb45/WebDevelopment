import zod from "zod";

const todoSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
});

const todoUpdateSchema = zod.object({
    id: zod.string(),
});

export {
    todoSchema,
    todoUpdateSchema
};