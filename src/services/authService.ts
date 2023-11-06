import axios from "axios";
import {userApi} from "@/api.ts";
import {LoginForm} from "@/types/auth.ts";

const AUTH_ENDPOINTS = {
    LOGIN: `${userApi}/login`
}
export async function loginUser(loginForm : LoginForm) {
    return await axios.post<LoginResponse>(AUTH_ENDPOINTS.LOGIN, loginForm)
}