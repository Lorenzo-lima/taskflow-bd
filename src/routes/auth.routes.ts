import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.ts";
import { AuthService } from "../services/auth.service.ts";
import { UserModel } from "../models/user.model.ts";
import { validate } from "../middlewares/validation.middleware.ts";
import { registerSchema, loginSchema } from "../dtos/auth.dto.ts";
import { rateLimiter } from "../middlewares/rate-limit.middleware.ts";

const router = Router();
const authController = new AuthController(new AuthService(new UserModel()));

router.post(
  "/register",
  rateLimiter,
  validate(registerSchema),
  authController.register.bind(authController)
);
router.post(
  "/login",
  rateLimiter,
  validate(loginSchema),
  authController.login.bind(authController)
);
router.post(
  "/logout",
  rateLimiter, 
  authController.logout.bind(authController)
);

export default router;
