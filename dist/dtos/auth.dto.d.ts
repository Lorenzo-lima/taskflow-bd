import { z } from "zod";
export declare const registerSchema: z.ZodEffects<z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirm_password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["USER", "ADMIN"]>>;
}, "strip", z.ZodTypeAny, {
    email: string;
    username: string;
    password: string;
    role: "USER" | "ADMIN";
    confirm_password: string;
}, {
    email: string;
    username: string;
    password: string;
    confirm_password: string;
    role?: "USER" | "ADMIN" | undefined;
}>, {
    email: string;
    username: string;
    password: string;
    role: "USER" | "ADMIN";
    confirm_password: string;
}, {
    email: string;
    username: string;
    password: string;
    confirm_password: string;
    role?: "USER" | "ADMIN" | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
