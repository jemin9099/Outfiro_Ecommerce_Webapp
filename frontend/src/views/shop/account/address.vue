<script setup>
import { useAddressStore } from '@/stores/address';
import { useOrderStore } from '@/stores/order';
import { onMounted, } from 'vue';
const props = defineProps({
    isEdit: {
        type: Boolean,
        default: true
    },
    isOneGrid: {
        type: Boolean,
        default: false
    }
})
const orderStore = useOrderStore()
const store = useAddressStore()
const emit = defineEmits(['edit'])
onMounted(() => {
    store.fetchAddress()
})
</script>
<template>
    <div class="grid grid-cols-1  gap-5" :class="isOneGrid ? 'lg:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'">
        <div class="bg-white p-3 border rounded-md shadow-sm relative" v-for="(item, index) in store.address"
            :key="index">
            <div class="absolute right-2" v-if="!isEdit">
                <label :for="item._id" class="relative ">
                    <input name="framework" type="radio"
                        class="peer h-5 w-5 absolute right-0 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 transition-all"
                        :id="item._id" v-model="orderStore.selectedAddress" :value="item">
                    <span
                        class="absolute bg-slate-800 w-3 h-3 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 top-[10px] right-[-2px] transform -translate-x-1/2 -translate-y-1/2">
                    </span>
                </label>
            </div>
            <div class="flex items-center py-1 ">
                <span class="font-semibold">Address :</span>
                <span class="ms-2">{{ item.address }} </span>
            </div>
            <div class="flex items-center py-1">
                <span class="font-semibold">City :</span>
                <span class="ms-2">{{ item.city }} </span>
            </div>
            <div class="flex items-center py-1">
                <span class="font-semibold">Pincode :</span>
                <span class="ms-2">{{ item.pincode }} </span>
            </div>
            <div class="flex items-center py-1">
                <span class="font-semibold">Phone :</span>
                <span class="ms-2"> {{ item.phone }}</span>
            </div>
            <div class="flex items-center py-1">
                <span class="font-semibold">Note :</span>
                <span class="ms-2">{{ item.notes }} </span>
            </div>
            <div class="flex items-center mt-3 justify-between py-1" v-if="isEdit">
                <button class="py-2 px-4 font-semibold bg-blue-100 text-blue-500 rounded-md flex gap-1 items-center"
                    @click="emit('edit', item)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5  fill-blue-500" viewBox="0 0 24 24">
                        <title>pencil</title>
                        <path
                            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                    </svg>
                    Edit</button>
                <button class="py-2 px-4 font-semibold bg-red-100 text-red-500 rounded-md flex gap-1 items-center"
                    @click="store.deleteAddress(item._id)">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5  fill-red-500" viewBox="0 0 24 24">
                        <title>delete-outline</title>
                        <path
                            d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
                    </svg>
                    Delete</button>
            </div>
        </div>
    </div>
</template>

<style scoped></style>