<script setup>
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
 
</script>
<template>
    <div class="container mx-auto flex items-center justify-center  h-[calc(100vh-75px)]">

        <div class="p-5  shadow-md mt-5 bg-white h-[420px]  max-w-4xl w-full  rounded-md">
            <div class="flex mb-5 justify-center">
                <img src="../../assets/Banners/orderSuccess.png" alt="" style="height: 100px;">
            </div>
            <hr>
            <div class="mt-5">
                <h1 class="text-4xl monserrat-font text-center text-gray-500 ">Thank you for your order</h1>
                <div class="text-center mt-3 bg-green-200">
                    <br>
                    <h5 class="text-2xl mb-2 text-black">ORDER CONFIRMATION</h5>
                    <p class="text-lg mb-2">Your order #2465 has been sucessful!</p>
                    <p class="text-lg pb-2">Thank you for choosing Outfiro fashion. You will shortly receive a
                        confirmation email.</p>
                </div>
                <div class="my-3">
                    <button class="w-full bg-black font-semibold text-white py-2  rounded-md" @click="router.push('/account')">View Orders</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style  scoped>
.monserrat-font{
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 2px;
  }
</style>