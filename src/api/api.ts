
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

const host = "http://localhost"
export const quizApi : string = `${host}:3000`
export const userApi : string = `${host}:3002`

function needsAuthenticationHeader(route : string) : boolean {
    switch (route) {
        case "quizzes":
            return true
    }
    return false
}
function configureAxiosForAPI(route : string, baseURL : string) {
    const config : AxiosRequestConfig = {
        baseURL: baseURL,
        headers: {
            "Content-Type": "application/json",
        }
    }

    let instance = axios.create(config)
    if(needsAuthenticationHeader(route)){
        instance.interceptors.request.use(function (config) {
            const token = localStorage.getItem('token');
            config.headers.Authorization =  token ? `Bearer ${token}` : '';
            return config;
        });
    }

    return instance
}
export function configureAxiosForQuizAPI(route : string) : AxiosInstance  {
    return  configureAxiosForAPI(route, quizApi)
}
export function configureAxiosForUserAPI(route : string) : AxiosInstance  {
    return  configureAxiosForAPI(route, userApi)
}
