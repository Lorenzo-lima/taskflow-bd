import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/database.ts";

interface TokenPayload {
  id: string;
}

export const authorizeRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader)
        return res.status(401).json({ error: "Token não fornecido" });

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as TokenPayload;

      const user = await prisma.user.findUnique({
        where: { id: Number(decoded.id) },
      });

      if (!user)
        return res.status(401).json({ error: "Usuário não encontrado" });

      if (!roles.includes(user.role)) {
        return res.status(403).json({ error: "Acesso negado" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: "Token inválido" });
    }
  };
};
