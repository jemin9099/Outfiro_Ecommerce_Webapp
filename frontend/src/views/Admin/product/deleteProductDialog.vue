<script setup>
import { ref, defineExpose , defineEmits } from 'vue';
import axios from '@/axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const emit = defineEmits(['refresh'])
const dialog = ref(false)
const productId = ref()

const open = (item) => {
    dialog.value = true
    productId.value = item._id
}

const handleDelete = async() => {
    const {status} =await axios.delete('/products/'+productId.value)

    if(status === 200){
        toast("Product Remove successfully", {
                autoClose: 1000,
                type: 'success'
            });
        emit('refresh')
        dialog.value = false
    }
    else{
        toast("Error While Remove Product", {
                autoClose: 1000,
                type: 'error'
            });
    }
}
defineExpose({ open })
</script>
<template>
    <div v-if="dialog" class="fixed inset-0 z-9999 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div class="bg-white dark:bg-boxdark rounded-lg shadow-lg max-w-lg w-full p-6">
            <div class="text-center">
                <span class="mx-auto inline-block">
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect opacity="0.1" width="60" height="60" rx="30" fill="#DC2626"></rect>
                        <path
                            d="M30 27.2498V29.9998V27.2498ZM30 35.4999H30.0134H30ZM20.6914 41H39.3086C41.3778 41 42.6704 38.7078 41.6358 36.8749L32.3272 20.3747C31.2926 18.5418 28.7074 18.5418 27.6728 20.3747L18.3642 36.8749C17.3296 38.7078 18.6222 41 20.6914 41Z"
                            stroke="#DC2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </span>
            </div>
            <h2 class="text-xl text-center font-semibold mb-4">Are you sure you want to delete this Product?</h2>
            <div class="flex justify-center space-x-4">
                <button class="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 focus:outline-none" @click="dialog=false">
                    Cancel
                </button>
                <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none" @click="handleDelete()">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>