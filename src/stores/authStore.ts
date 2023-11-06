import {defineStore} from "pinia";
import {jwtDecode} from "jwt-decode";
import {JwtClaims} from "@/types/auth.ts";

interface AuthState {
    hasAuth: boolean | null,
    isAdmin: boolean | null,
    accessToken: string
}
export const useAuthStore = defineStore('auth', {
    state: () => {
        return <AuthState>{
            hasAuth: null,
            isAdmin: null,
            accessToken: ""
        }
    },
    actions: {
        getHasAuth(): boolean {
           if (this.hasAuth == null) {
               const token = window.localStorage.getItem("token")
               this.hasAuth = (token != null)
           }

           return this.hasAuth
        },
        getIsAdmin(): boolean{
            if (this.isAdmin == null) {
                const token = window.localStorage.getItem("token")
                this.isAdmin = (token != null)
            }

            return this.isAdmin
        },
        deleteToken(): void {
            window.localStorage.removeItem("token")
        },
        saveToken(token: string): void {
            window.localStorage.setItem("token", token)
            console.log(jwtDecode<JwtClaims>(token))
        },
        setAuth(response : LoginResponse){
            this.hasAuth = true
            this.isAdmin = response.user.isAdmin
            this.accessToken = response.accessToken
            this.saveToken(this.accessToken)
        }
    }
})