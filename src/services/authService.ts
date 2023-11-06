import axios from "axios";
import {userApi} from "@/api.ts";
import {LoginForm, RegisterForm} from "@/types/auth.ts";

const AUTH_ENDPOINTS = {
    LOGIN: `${userApi}/login`,
    REGISTER: `${userApi}/register`
}
export async function loginUser(loginForm : LoginForm) {
    return await axios.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, loginForm)
}

export async function registerUser(registerForm : RegisterForm) {
    return await axios.post(AUTH_ENDPOINTS.REGISTER, registerForm)
}