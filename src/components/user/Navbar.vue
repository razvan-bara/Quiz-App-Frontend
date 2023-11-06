<script setup lang="ts">

</script>

<template>
  <nav class="navbar is-link" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu is-active">

      <div class="navbar-start">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          Home
        </router-link>


        <router-link :to="{ name: 'quizzes' }" class="navbar-item">
          Quizzes
        </router-link>

      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <router-link :to="{ name: 'login' }" class="button is-dark">
              Sign up
            </router-link>
            <router-link :to="{ name: 'login' }" class="button is-light">
              Log in
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>

</style>