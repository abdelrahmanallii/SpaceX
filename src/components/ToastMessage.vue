<template>
  <div v-if="store.showToast" class="toast">
    {{ store.toastMessage }}
  </div>
</template>

<script setup>
import { useLocalStore } from '../stores/local.js'

const store = useLocalStore()
</script>

<style>
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #333;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  z-index: 9999;
  opacity: 0.9;
  transition: all 0.3s ease;
}
</style>
