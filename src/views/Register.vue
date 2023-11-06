<script setup lang="ts">
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {RegisterForm, RegisterFormValidity} from "@ctypes/auth.ts";
import {ref, computed} from "vue";
import {registerUser} from "@services/authService.ts";
import { useNotification } from "@kyvg/vue3-notification";
import {useRouter} from "vue-router";

const notification   = useNotification()
const submitBtn = ref<HTMLButtonElement>()
const router = useRouter()

let registerForm = ref<RegisterForm>({
  email: "",
  firstName: "",
  lastName: "",
  password: ""
})

let formState = ref<RegisterFormValidity>({
  email: null,
  firstName: null,
  lastName: null,
  password: null
})

const isInvalidValidEmail = computed(() => {
  return formState.value.email != null && !formState.value.email
})

const isInvalidValidFirstName = computed(() => {
  return formState.value.firstName != null && !formState.value.firstName
})

const isInvalidValidLastName = computed(() => {
  return formState.value.lastName != null && !formState.value.lastName
})

const isInvalidPassword = computed(() => {
  return formState.value.password != null && !formState.value.password
})

const isFormValid = computed(() => {
  return formState.value.lastName && formState.value.firstName && formState.value.email && formState.value.password
})

function validateEmail(){

  if(registerForm.value.email.length < 2){
    formState.value.email = false
    return
  }

  if (registerForm.value.email.indexOf("@") === -1){
    formState.value.email = false
    return
  }

  if (registerForm.value.email.indexOf(".") === -1){
    formState.value.email = false
    return
  }

  formState.value.email = true
}

function validatePassword(){

  if(registerForm.value.password.length <= 5){
    formState.value.password = false
    return
  }

  formState.value.password = true
}

function validateFirstName(){
  if(registerForm.value.firstName.length <= 0){
    formState.value.firstName = false
    return
  }

  formState.value.firstName = true
}

function validateLastName(){
  if(registerForm.value.lastName.length <= 0){
    formState.value.lastName = false
    return
  }

  formState.value.lastName = true
}

function submit() : void{
  submitBtn.value?.classList.add("is-loading")
  registerUser(registerForm.value).then(res => {
    if (res.status === 200) {
      notification.notify({type:"success", title:"Registered successfully", text: "Log in with the new created account"});
      router.push({ path: 'home' })
    }


  }).catch(err => {
    const status = err.response.status
    let errText! : string

    if (status == 400 && err.response.message == "pick a different email"){
      errText = "Email already registered"
    }
    else if (status <= 500) {
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
      <label class="label is-size-4">Register a new account</label>
      <div class="form-divider has-background-white mb-2"></div>

      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input"
                 :class="{'is-success': formState.email, 'is-danger': isInvalidValidEmail}"
                 type="email"
                 @input="validateEmail"
                 placeholder="ex. something@gmail.com"
                 v-model="registerForm.email">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-envelope"/>
          </span>
          <span v-show="formState.email" class="icon is-small is-right">
            <font-awesome-icon icon="fa-solid fa-check"/>
          </span>
        </div>
        <p v-show="isInvalidValidEmail" class="help is-danger">This email is invalid</p>
      </div>

      <div class="field">
        <label class="label">First name</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input"
                 :class="{'is-success': formState.firstName, 'is-danger': isInvalidValidFirstName}"
                 type="text"
                 @input="validateFirstName"
                 placeholder="Insert your first name"
                 v-model="registerForm.firstName">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-envelope"/>
          </span>
          <span v-show="formState.firstName" class="icon is-small is-right">
            <font-awesome-icon icon="fa-solid fa-check"/>
          </span>
        </div>
        <p v-show="isInvalidValidFirstName" class="help is-danger">First name must not be empty</p>
      </div>

      <div class="field">
        <label class="label">Last name</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input"
                 :class="{'is-success': formState.lastName, 'is-danger': isInvalidValidLastName}"
                 type="text"
                 @input="validateLastName"
                 placeholder="Insert your last name"
                 v-model="registerForm.lastName">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-envelope"/>
          </span>
          <span v-show="formState.lastName" class="icon is-small is-right">
            <font-awesome-icon icon="fa-solid fa-check"/>
          </span>
        </div>
        <p v-show="isInvalidValidLastName" class="help is-danger">Last name must not be empty</p>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left has-icons-right">
          <input class="input"
                 :class="{'is-success': formState.password, 'is-danger': isInvalidPassword}"
                 type="password"
                 @input="validatePassword"
                 placeholder="Insert your password"
                 v-model="registerForm.password">
          <span class="icon is-small is-left">
            <font-awesome-icon icon="fa-solid fa-lock"/>
          </span>
          <span v-show="formState.password" class="icon is-small is-right">
              <font-awesome-icon icon="fa-solid fa-check"/>
          </span>
        </div>
        <p v-show="isInvalidPassword" class="help is-danger">Password must have minimum 6 characters</p>
      </div>

      <div class="field">
        <p class="control">
          <button type="submit" class="button is-success" ref="submitBtn" :disabled="!isFormValid">Submit</button>
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