import Home from "../views/user/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import Quizzes from "../views/user/Quizzes.vue";
import Login from "@views/Login.vue";
import Register from "@views/Register.vue";
import QuizzesView from "@views/admin/QuizzesView.vue";
import {useAuthStore} from "@stores/authStore.ts";
import NotFound from "@views/NotFound.vue";
import Unauthorised from "@views/Unauthorised.vue";
import QuizAddView from "@views/admin/QuizAddView.vue";
import QuizEditView from "@views/admin/QuizEditView.vue";
import {notify} from "@kyvg/vue3-notification";

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/quizzes', name: 'quizzes', component: Quizzes },
    { path: '/login', name: 'login', component: Login},
    { path: '/register', name: 'register', component: Register},
    { path: '/admin/quizzes', name: 'adminQuizzes', component: QuizzesView},
    { path: '/admin/quizzes/create', name: 'quizAdd', component: QuizAddView},
    { path: '/admin/quizzes/:id', name: 'quizEdit', component: QuizEditView, props: true},
    { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
    { path: '/unauthorised', name: 'unauthorised', component: Unauthorised }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})
router.beforeEach((to, _) => {
    const authStore = useAuthStore()
    if (to.name == "adminQuizzes") {

        if(!authStore.decideIfIsAdmin){
            router.push({name: "unauthorised", replace: true})
        }
    }

    if((to.name == "register" || to.name == "login") && authStore.decideIfHasAuth){
        notify({type: "warning", title: "You are already logged in"})
        return false
    }

    if(to.name == "quizzes" && !authStore.decideIfHasAuth){
        notify({type: "error", title: "You need to be logged in to access quizzes"})
        return false
    }


    return true
})

export default router