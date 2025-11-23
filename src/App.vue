<script setup>
import TheNav from "./components/TheNav.vue";
import { RouterView } from "vue-router";
import ToastMessage from "./components/ToastMessage.vue";


</script>

<template>
  <TheNav />
  <RouterView />
  <ToastMessage />
</template>
