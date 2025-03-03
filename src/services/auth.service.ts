import { UserModel } from "../models/user.model.ts";
import { RegisterDto, LoginDto } from "../dtos/auth.dto.ts";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import redisClient from "../config/redis.ts";
import logger from "../utils/logger.ts";

export class AuthService {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  async register(data: RegisterDto) {
    const { username, email, password, role } = data;
    const existingUser = await this.userModel.findByEmail(email);
    if (existingUser) throw new Error("Email já está em uso");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });
    logger.info(`Usuário registrado: ${email}`);
    return user;
  }

  async login(data: LoginDto) {
    console.log("Dados recebidos para login: ", data);
    const { email, password } = data;
    const cachedUser = await redisClient.get(`user:${email}`);
    let user;

    if (cachedUser) {
      user = JSON.parse(cachedUser);
    } else {
      user = await this.userModel.findByEmail(email);
      if (user)
        await redisClient.setEx(`user:${email}`, 3600, JSON.stringify(user));
    }

    if (!user) throw new Error("Usuário não encontrado");
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );
    if (!isPasswordValid) throw new Error("Senha inválida");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "2h",
    });
    logger.info(`Login bem-sucedido: ${email}`);
    return { token };
  }
}
