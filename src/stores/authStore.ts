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
    getters: {
        decideIfHasAuth: (state : AuthState) : boolean => {
            let res : boolean = false
            if (state.hasAuth == null) {
                const token = window.localStorage.getItem("token")
                res = (token != null)
            }else {
                res = state.hasAuth
            }

            return res
        },
        decideIfIsAdmin(state : AuthState) : boolean {
            let res : boolean = false
            if (state.isAdmin == null) {
                const token = window.localStorage.getItem("token")
                if (token != null) {
                    res = jwtDecode<JwtClaims>(token).isAdmin
                }
            }else {
                res = state.isAdmin
            }

            return res
        }
    },
    actions: {
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