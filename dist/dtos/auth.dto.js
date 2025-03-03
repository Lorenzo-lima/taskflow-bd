import { z } from "zod";
export const registerSchema = z
    .object({
    username: z.string().min(3, "Username deve ter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirm_password: z.string(),
    role: z.enum(["USER", "ADMIN"]).default("USER"),
})
    .refine((data) => data.password === data.confirm_password, {
    message: "As senhas devem ser iguais",
    path: ["confirm_password"],
});
export const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
