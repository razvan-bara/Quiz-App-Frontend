<script setup lang="ts">
import {useAuthStore} from "@stores/authStore.ts";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const authStore = useAuthStore()
</script>

<template>
  <nav class="navbar is-light has-shadow" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu is-active">

      <div class="navbar-start">
        <router-link :to="{ name: 'home' }" class="navbar-item is-white">
          Home
        </router-link>


        <router-link :to="{ name: 'quizzes' }" class="navbar-item">
          Quizzes
        </router-link>

      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-if="!authStore.decideIfHasAuth">
            <router-link :to="{ name: 'register' }" class="button is-inverted is-primary">
              Sign up
            </router-link>
            <router-link :to="{ name: 'login' }" class="button is-primary">
              Log in
            </router-link>
          </div>
          <div v-else class="buttons">
            <button class="button is-dark" v-if="authStore.decideIfIsAdmin">
              <span class="icon is-small mr-1">
                <font-awesome-icon icon="fa-solid fa-user"/>
              </span>
              Admin
            </button>
            <button class="button is-primary" @click="authStore.logOut()">
              Sign out
            </button>
          </div>
        </div>

      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>