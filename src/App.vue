<script setup>
import { RouterView } from 'vue-router'
import FooterComponent from '@/components/Footer.vue'
</script>

<template>
  <main class="min-h-screen flex flex-col">
    <div class="flex-1">
      <RouterView />
    </div>
    <FooterComponent />
  </main>
</template>
