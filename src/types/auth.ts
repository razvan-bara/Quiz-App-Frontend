import {JwtPayload} from "jwt-decode";

export interface LoginForm {
    email: string,
    password: string
}

export interface LoginFormValidity {
    email: boolean | null,
    password: boolean | null
}

export interface JwtClaims extends JwtPayload {
    isAdmin: boolean,
}