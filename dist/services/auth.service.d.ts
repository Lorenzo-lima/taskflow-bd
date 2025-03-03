import { UserModel } from "../models/user.model.ts";
import { RegisterDto, LoginDto } from "../dtos/auth.dto.ts";
export declare class AuthService {
    private userModel;
    constructor(userModel: UserModel);
    register(data: RegisterDto): Promise<{
        id: number;
        email: string;
        username: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login(data: LoginDto): Promise<{
        token: string;
    }>;
}
