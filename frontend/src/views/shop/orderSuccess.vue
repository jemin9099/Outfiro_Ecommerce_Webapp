<script setup>
import { useOrderStore } from '@/stores/order';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()
const store = useOrderStore()
onMounted(() => {
    store.completePayment(route.query.PayerID, route.query.paymentId)
}) 
</script>
<template>

    <div class="container mx-auto flex items-center justify-center  h-[calc(100vh-75px)]">
        <div class="p-5  shadow-md mt-5 bg-white h-[200px]  max-w-4xl w-full  rounded-md">
            <div class="flex mb-5 justify-center">
                <img src="../../assets/Banners/payment-processor.png" alt="" style="height: 100px;">
            </div>
            <h2 class="text-4xl monserrat-font text-center text-gray-500 ">Processing Payment....</h2>
        </div>
    </div>
</template>
<style scoped>
.monserrat-font {
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 2px;
}
</style>