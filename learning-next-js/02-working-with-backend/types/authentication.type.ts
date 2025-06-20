import { z } from "zod";
import { email } from "zod/v4";

export const userSignInPayload = z.object({
    email: z.string().email(),
    password: z.string()
});

export const userSignUpPayload = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
});

export type SignUpType = z.infer<typeof userSignUpPayload>;
export type SignInType = z.infer<typeof userSignInPayload>;


