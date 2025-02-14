<script setup>
import accountImg from '@/assets/Banners/accountImg2.jpg'
import Address from '../account/address.vue';
import Cart from '@/components/cart.vue';
</script>
<template>
    <div class="flex flex-col m-3">
        <div class="relative  w-full overflow-hidden">
            <img :src="accountImg" alt="" class="w-full h-auto object-contain aspect-4/3">
        </div>
        <div class="border py-8 mt-3 rounded-md">
            <div class="grid grid-cols-1  md:grid-cols-2">
                <div class="md:order-1 order-2 md:border-r">
                    <h2 class="text-xl font-semibold px-3">Select Address :</h2>
                    <div role="tabpanel" class="p-3 duration-300  w-full">
                        <Address :isEdit="false" :isOneGrid="true"  @edit="(item) => {}"/>
                      </div>
                </div>

                <div class="md:order-2 order-1 p-3">
                    <Cart :isCheckoutBtn="false"/>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>