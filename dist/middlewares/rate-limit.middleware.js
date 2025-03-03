import rateLimit from "express-rate-limit";
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 200, // Limite de 100 requisições por IP
    message: "Muitas requisições, tente novamente mais tarde.",
});
