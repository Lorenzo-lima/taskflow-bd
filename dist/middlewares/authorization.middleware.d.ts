import { Request, Response, NextFunction } from "express";
export declare const authorizeRole: (roles: string[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
