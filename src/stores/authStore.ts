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
                if (token != null) {
                    this.isAdmin = jwtDecode<JwtClaims>(token).isAdmin
                }else {
                    this.isAdmin = false
                }

            }

            return this.isAdmin
        },
        logOut(): void {
            window.localStorage.removeItem("token")
            this.hasAuth = false
            this.isAdmin = false
            this.accessToken = ""
        },
        setAuth(response : LoginResponse){
            this.hasAuth = true
            this.isAdmin = response.user.isAdmin
            this.accessToken = response.accessToken
            window.localStorage.setItem("token", this.accessToken)
        }
    }
})