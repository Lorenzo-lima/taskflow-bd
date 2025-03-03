import prisma from "../config/database.ts";
export class UserModel {
    async findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }
    async create(data) {
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
