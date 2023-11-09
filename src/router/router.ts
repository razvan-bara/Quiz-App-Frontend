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
    if (to.name == "adminQuizzes") {
        const authStore = useAuthStore()
        if(!authStore.decideIfIsAdmin){
            router.push({name: "unauthorised", replace: true})
        }
    }
    return true
})

export default router