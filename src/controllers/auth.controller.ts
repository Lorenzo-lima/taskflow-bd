import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.ts";
import { RegisterDto, LoginDto } from "../dtos/auth.dto.ts";

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  async register(req: Request, res: Response) {
    const data: RegisterDto = req.body;
    const user = await this.authService.register(data);
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  }

  async login(req: Request, res: Response) {
    const data: LoginDto = req.body;
    const { token } = await this.authService.login(data);

    res.cookie("jwt", token, {
      httpOnly: true, // Impede acesso via JavaScript (mais seguro contra XSS)
      secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
      sameSite: "strict", // Protege contra CSRF
      maxAge: 60 * 60 * 2000, // 2 horas em milissegundos (igual ao expiresIn do token)
    });

    res.json({ message: "Login bem-sucedido" });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.json({ message: "Logout bem-sucedido" });
  }
}
