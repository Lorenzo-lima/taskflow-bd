import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import logger from "../utils/logger.ts";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ZodError) {
    logger.warn("Erro de validação:", err.errors);
    res.status(400).json({ errors: err.errors });
  } else {
    logger.error("Erro interno:", err.message);
    res.status(500).json({ error: err.message });
  }
};
