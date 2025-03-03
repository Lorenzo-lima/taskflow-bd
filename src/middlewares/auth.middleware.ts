import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt; 

  if (!token) {
    return res
      .status(401)
      .json({ error: "Não autorizado: token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };
    req.user = { id: decoded.id }; // Adiciona o ID do usuário ao objeto req
    next();
  } catch (error) {
    return res.status(401).json({ error: "Não autorizado: token inválido" });
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: { id: number };
    }
  }
}
