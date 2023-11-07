<script setup lang="ts">
const props = defineProps(['title', 'message'])
</script>

<template>
  <section class="hero is-large is-danger">
  <div class="hero-body">
    <p class="title">
      {{ props.title }}
    </p>
    <p class="subtitle">
      {{ props.message }}
    </p>
    <router-link :to="{name: 'home'}" class="button is-outlined is-white">Click me to go home</router-link>
  </div>
  </section>
</template>

<style scoped>

</style>