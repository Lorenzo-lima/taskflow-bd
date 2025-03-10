import { Request, Response } from "express";
import { AuthService } from "../services/auth.service.ts";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(req: Request, res: Response): Promise<void>;
    login(req: Request, res: Response): Promise<void>;
}
