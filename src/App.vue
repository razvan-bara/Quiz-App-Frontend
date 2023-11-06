<script setup lang="ts">

import Navbar from "./components/user/Navbar.vue";

</script>

<template>
  <Navbar/>
  <notifications position="top right" width="350px" classes="vue-notification custom-notif" />
  <router-view></router-view>
</template>

<style scoped>

</style>