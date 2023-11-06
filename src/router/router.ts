import Home from "../views/user/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import Quizzes from "../views/user/Quizzes.vue";
import Login from "@views/Login.vue";

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/quizzes', name: 'quizzes', component: Quizzes },
    { path: '/login', name: 'login', component: Login}
]

export default createRouter({
    history: createWebHistory(),
    routes: routes
})