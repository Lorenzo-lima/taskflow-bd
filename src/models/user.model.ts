import prisma from "../config/database.ts";
import { Prisma } from "@prisma/client";

export class UserModel {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async create(data: Prisma.UserCreateInput) {
    return prisma.user.create({
      data,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      },
    });
  }
}
