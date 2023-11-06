<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {LoginForm} from "@ctypes/auth.ts";
import {ref} from "vue";
import {loginUser} from "@services/authService.ts";
import { useNotification } from "@kyvg/vue3-notification";
import {useAuthStore} from "@stores/authStore.ts";

const notification   = useNotification()
const authStore = useAuthStore()
const submitBtn = ref<HTMLButtonElement>()

let loginForm = ref<LoginForm>({
  email: "rzvbara@gmail.com",
  password: "michaeljack"
})
function submit() : void{
  submitBtn.value?.classList.add("is-loading")
  loginUser(loginForm.value).then(res => {

    if (res.status === 200) {
      authStore.setAuth(res.data)
      notification.notify({type:"success", title:"Logged in successfully"});
    }


  }).catch(err => {
    const status = err.response.status
    let errText! : string

    if (status <= 500) {
      errText = "Invalid credentials"
    } else if (status <= 600) {
      errText = "Server error, try again later"
    }

    notification.notify({type:"error", title: errText});
  }).finally( () => {
    submitBtn.value?.classList.remove("is-loading")
  })
}

</script>

<template>
  <section class="container is-max-desktop flex-form">
    <form class="notification flex-form-item is-light" v-on:submit.prevent="submit">
      <label class="label">Login with your credentials</label>
      <div class="field">
        <div class="control has-icons-left">
          <input class="input" type="email" placeholder="Email" v-model="loginForm.email">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-envelope"/>
          </span>
        </div>
<!--        <p class="help is-danger">This email is invalid</p>-->
      </div>
      <div class="field">
        <div class="control has-icons-left">
          <input class="input" type="password" placeholder="Password" v-model="loginForm.password">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-lock"/>
          </span>
        </div>
        <!--        <p class="help is-danger">This email is invalid</p>-->
      </div>
      <div class="field">
        <p class="control">
          <button type="submit" class="button is-success" ref="submitBtn">Submit</button>
        </p>
      </div>
    </form>
  </section>

</template>

<style scoped>

</style>