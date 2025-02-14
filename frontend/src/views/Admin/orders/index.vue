<script setup>
import orders from '@/components/orders.vue';
</script>
<template>
    <div class="p-3 mt-5 bg-white h-full rounded-md">
        <h2 class="text-xl font-semibold leading-tight">All Orders</h2>
        <orders :isAdmin="true"/>
    </div>
</template>
<style scoped></style>