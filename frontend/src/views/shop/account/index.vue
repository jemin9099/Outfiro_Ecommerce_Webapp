<script setup>
import accountImg from '@/assets/Banners/accountImg2.jpg'
import Address from './address.vue';
import AddressModel from '@/views/shop/account/addressModel.vue'
import { ref } from 'vue';
import Orders from './orders.vue';
const tab = ref('order')
const addressModels = ref()
</script>
<template>
    <AddressModel ref="addressModels"/>
    <div class="flex flex-col m-3">
        <div class="relative  w-full overflow-hidden">
            <img :src="accountImg" alt="" class="w-full h-auto object-contain aspect-4/3">
        </div>
        <div class="container mx-auto grid grid-cols-1 gap-8 py-8">
            <div class="flex flex-col rounded-lg border bg-background py-6 shadow-sm ">
                <div class="flex items-center justify-center cursor-pointer">
                    <div class="p-3 pt-0 text-xl duration-200"
                        :class="tab === 'order' ? 'font-bold border-b-2 border-black' : 'font-medium'"
                        @click="tab = 'order'">
                        <span>Orders</span>
                    </div>
                    <div class="p-3 pt-0 text-xl duration-200"
                        :class="tab === 'address' ? 'font-bold border-b-2 border-black' : 'font-medium'"
                        @click="tab = 'address'">
                        Address
                    </div>
                </div>
                <hr>
                <div class="w-full ">
                    <transition name="fade" mode="out-in">
                        <div role="tabpanel" class="p-3 duration-300  w-full " v-show="tab === 'order'">
                            <Orders/>
                        </div>
                    </transition>
                    <transition name="fade" mode="out-in">
                        <div role="tabpanel" class="p-3 duration-300  w-full" v-show="tab === 'address'">
                          <div class="text-end">
                            <button class=" px-3 py-2 bg-black mb-3 rounded-md text-white font-semibold" @click="addressModels.open()">
                                Add New Address
                            </button>
                          </div>
                          <Address @edit="(item) => {addressModel.open(item)}"/>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>

</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
</style>
