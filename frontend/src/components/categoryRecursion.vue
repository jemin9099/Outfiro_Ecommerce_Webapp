<script setup>
import { ref } from 'vue';
import { useCategoryStore } from '@/stores/category';
const props = defineProps({
    category: Object
})
const store = useCategoryStore()
const emit = defineEmits(['edit'])
const isOpen = ref(false) 
const selectedMenuId = ref()
</script>
<template>
    <li class="m-2 me-0 overflow-hidden">
        <div class="p-2 flex items-center bg-gray-100  text-gray-500 rounded-md border group">
            <svg class="w-6 h-6  fill-gray-500" :class="isOpen?'rotate-180':'rotate-0'" @click="isOpen = !isOpen , selectedMenuId = category._id" v-if="category.subCategory.length > 0" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <title>chevron-right</title>
                <path d="M7.41,8.58,12,13.17l4.59-4.59L18,10l-6,6-6-6Z" />
            </svg>
            {{ category.name }}
            <svg xmlns="http://www.w3.org/2000/svg" class="ms-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in fill-black w-4 h-4" viewBox="0 0 24 24" @click="emit('edit',category)"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="ms-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in  fill-red-500 w-4 h-4" viewBox="0 0 24 24" @click="store.deleteCategory(category._id)"><title>delete</title><path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" /></svg>
        </div>
        <ul v-if="category.subCategory.length > 0 && isOpen && selectedMenuId === category._id" class="ms-2  transition-all duration-700 ease-in-out overflow-hidden">
            <CategoryRecursion v-for="(category, index) in category.subCategory" :key="index" :category="category" @edit="(editItem) => {emit('edit',editItem)}"/>
        </ul>
    </li>
</template>
<style scoped>

</style>