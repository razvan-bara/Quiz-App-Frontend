<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {LoginForm, LoginFormValidity} from "@ctypes/auth.ts";
import {ref} from "vue";
import {loginUser} from "@services/authService.ts";
import { useNotification } from "@kyvg/vue3-notification";
import {useAuthStore} from "@stores/authStore.ts";
import {useRouter} from "vue-router";

const notification   = useNotification()
const authStore = useAuthStore()
const submitBtn = ref<HTMLButtonElement>()
const router = useRouter()

let loginForm = ref<LoginForm>({
  email: "",
  password: ""
})

let formState = ref<LoginFormValidity>({
  email: null,
  password: null
})

function validateEmail(){

  if(loginForm.value.email.length < 2){
    formState.value.email = false
    return
  }

  if (loginForm.value.email.indexOf("@") === -1){
    formState.value.email = false
    return
  }

  if (loginForm.value.email.indexOf(".") === -1){
    formState.value.email = false
    return
  }

  formState.value.email = true
}

function validatePassword(){

  if(loginForm.value.password.length <= 5){
    formState.value.password = false
    return
  }

  formState.value.password = true
}

function submit() : void{
  submitBtn.value?.classList.add("is-loading")
  loginUser(loginForm.value).then(res => {

    if (res.status === 200) {
      authStore.setAuth(res.data)
      notification.notify({type:"success", title:"Logged in successfully"});
      router.push({ path: 'home' })
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
      <label class="label is-size-4">Log in with your credentials</label>
      <div class="form-divider has-background-white mb-2"></div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input"
                 :class="{'is-success': formState.email, 'is-danger': formState.email != null && formState.email == false}"
                 type="email"
                 @input="validateEmail"
                 placeholder="ex. something@gmail.com"
                 v-model="loginForm.email">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-envelope"/>
          </span>
          <span v-show="formState.email" class="icon is-small is-right">
            <font-awesome-icon icon="fa-solid fa-check"/>
          </span>
        </div>
        <p v-show="formState.email != null && formState.email == false" class="help is-danger">This email is invalid</p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input"
                 :class="{'is-success': formState.password, 'is-danger': formState.password != null && formState.password == false}"
                 type="password"
                 @input="validatePassword"
                 placeholder="Insert your password"
                 v-model="loginForm.password">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-lock"/>
          </span>
          <span v-show="formState.password" class="icon is-small is-right">
              <font-awesome-icon icon="fa-solid fa-check"/>
          </span>
        </div>
        <p v-show="formState.password != null && formState.password == false" class="help is-danger">Password must have minimum 6 characters</p>
      </div>

      <div class="field">
        <p class="control">
          <button type="submit" class="button is-success" ref="submitBtn" :disabled="!(formState.password && formState.email)">Submit</button>
        </p>
      </div>

    </form>
  </section>

</template>

<style scoped>
  .form-divider{
    width: 100%;
    height: 2px;
  }
</style>