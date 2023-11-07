<script setup lang="ts">

import {computed} from "vue";

const props = defineProps({
  title: {type: String, required: true},
  message: {type: String, required: true},
  eclass : {type: Number, required: false}
})

const classObject = computed(() => ({
  'is-info' :   props.eclass === 0,
  'is-danger' : props.eclass === undefined,
  'is-warning': props.eclass === 1
}))
</script>

<template>
  <section class="hero is-large" :class="classObject">
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