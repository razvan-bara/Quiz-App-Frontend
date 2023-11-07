import {LoginForm, RegisterForm} from "@/types/auth.ts";
import {configureAxiosForUserAPI} from "@api/api.ts";

const AUTH_ENDPOINTS = {
    LOGIN: `login`,
    REGISTER: `register`
}
export async function loginUser(loginForm : LoginForm) {
    return await configureAxiosForUserAPI(AUTH_ENDPOINTS.LOGIN).post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, loginForm)
}

export async function registerUser(registerForm : RegisterForm) {
    return await configureAxiosForUserAPI(AUTH_ENDPOINTS.REGISTER).post(AUTH_ENDPOINTS.REGISTER, registerForm)
}