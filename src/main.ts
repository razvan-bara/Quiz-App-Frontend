import { createApp } from 'vue'
import App from "./App.vue";
import router from "./router/router.ts";
import "./assets/main.scss"
import {createPinia, Pinia} from "pinia";
import {library} from "@fortawesome/fontawesome-svg-core";
import {
    faAngleDown,
    faCaretDown,
    faCaretUp,
    faCheck,
    faEnvelope,
    faEraser,
    faLock,
    faPen,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Notifications from '@kyvg/vue3-notification'

library.add(
    faEnvelope,
    faLock,
    faCheck,
    faUser,
    faPen,
    faEraser,
    faCaretDown,
    faCaretUp,
    faAngleDown
)

const pinia : Pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Notifications)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount("#app")