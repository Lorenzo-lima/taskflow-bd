import { Prisma } from "@prisma/client";
export declare class UserModel {
    findByEmail(email: string): Promise<{
        id: number;
        email: string;
        username: string | null;
        password: string;
        role: import(".prisma/client").$Enums.Role;
    } | null>;
    create(data: Prisma.UserCreateInput): Promise<{
        id: number;
        email: string;
        username: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
