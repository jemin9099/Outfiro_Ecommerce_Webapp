<script setup>
import adminLayout from './Layouts/adminLayout.vue';
import shopLayout from './Layouts/shopLayout.vue'
import { useRoute } from 'vue-router';

const route = useRoute()
</script>

<template>
  <adminLayout v-if="route.meta.requiresAuth && route.meta.isAdmin">
    <RouterView />
  </adminLayout>
  <shopLayout v-else-if="route.meta.requiresAuth == false && route.meta.isAdmin == false">
    <RouterView />
  </shopLayout>
  <RouterView v-else-if="route.meta.layout === 'auth'"/>
</template>

<style scoped>
</style>
