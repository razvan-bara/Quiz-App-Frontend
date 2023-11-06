import {JwtPayload} from "jwt-decode";

export interface LoginForm {
    email: string,
    password: string
}

export interface JwtClaims extends JwtPayload {
    isAdmin: boolean,
}