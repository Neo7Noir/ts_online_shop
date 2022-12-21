import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface TokenInfo extends JwtPayload{
    id: string;
    username: string;
    role: string;
}

export interface UserRequest extends Request{
    user: TokenInfo
}