import {JwtPayload} from "jwt-decode";

export interface LoginForm {
    email: string,
    password: string
}
export interface RegisterForm {
    email: string,
    firstName: string,
    lastName: string,
    password: string
}

export interface RegisterFormValidity {
    email: boolean | null,
    firstName: boolean | null,
    lastName: boolean | null,
    password: boolean | null
}

export interface LoginFormValidity {
    email: boolean | null,
    password: boolean | null
}

export interface JwtClaims extends JwtPayload {
    isAdmin: boolean,
}