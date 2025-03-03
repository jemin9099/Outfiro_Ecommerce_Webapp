<script setup>
import { useCategoryStore } from '@/stores/category';
import { ref,watch } from 'vue';
const props = defineProps({
    initialId:Object
})
const emit = defineEmits(['selectedId' , 'currentCategory'])
const store = useCategoryStore()
const currentCategory = ref()
const previousCategories = ref([]);
const selectedCategory = ref()

const showSubcategories = (category) => {
    previousCategories.value.push(store.categories)
    currentCategory.value = category
}
const goBack = () => {
    const lastCategories = previousCategories.value.pop();
    store.categories = lastCategories
    currentCategory.value = null
}

watch(() => selectedCategory.value, () => {
    if (selectedCategory.value) {
        emit('selectedId' , selectedCategory.value._id)   
        emit('currentCategory' , selectedCategory.value)     
    }
})
watch(() => props.initialId, () => {
//     if (props.initialId) {
        selectedCategory.value =  props.initialId 
        console.log(selectedCategory.value);
        
//     }
})
</script>
<template>
    <div class="border rounded-t-md">
        <div class="py-2 px-3 bg-gray-100 rounded-t-md border-b">
            <span v-if="!currentCategory">
                All
            </span> 
            <span v-else @click="goBack()" class="cursor-pointer">
                Back
            </span>
        </div>
        <ul class="max-h-[200px] overflow-y-auto" v-if="store.categories && !currentCategory">
            <li v-for="category in store.categories" :key="category.id"
                class="flex items-center justify-between p-1 ">
                <div class="flex items-center gap-3">
                    <div
                        class="w-[50px] h-[50px] cursor-pointer  overflow-hidden object-contain">
                        <img :src="category.image" class="w-full h-full object-contain" alt="">
                    </div>
                    {{ category.name }}
                </div>
                <div class="flex items-center gap-1">
                    <button type="button" class="px-3 border py-2  rounded-md" @click="selectedCategory = category" :class="category._id == selectedCategory?._id ? 'bg-black text-white' : 'bg-black/10'">
                        {{ category._id == selectedCategory?._id ? 'Selected' : 'Select' }}
                    </button>
                    <span v-if="category.subCategory.length > 0" @click="showSubcategories(category)">
                        <svg class="w-6 h-6 -rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>chevron-right</title>
                            <path d="M7.41,8.58,12,13.17l4.59-4.59L18,10l-6,6-6-6Z" />
                        </svg>
                    </span>
                </div>
            </li>
        </ul>
        <ul class="max-h-[200px] overflow-y-auto" v-else>
            <li v-for="category in currentCategory.subCategory" :key="category.id"
                class="flex items-center justify-between p-2">
                <div class="flex items-center gap-3">
                    <div
                        class="w-[50px] h-[50px] cursor-pointer  overflow-hidden object-contain">
                        <img :src="category.image" class="w-full h-full object-contain" alt="">
                    </div>
                    {{ category.name }}
                </div>
                <div class="flex items-center gap-1">
                    <button type="button" class="px-3 border py-2  rounded-md" @click="selectedCategory = category" :class="category._id == selectedCategory?._id ? 'bg-black text-white' : 'bg-black/10'">
                        {{ category._id == selectedCategory?._id ? 'Selected' : 'Select' }}
                    </button>
                    <span v-if="category.subCategory.length > 0" @click="showSubcategories(category)">
                        <svg class="w-6 h-6 -rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <title>chevron-right</title>
                            <path d="M7.41,8.58,12,13.17l4.59-4.59L18,10l-6,6-6-6Z" />
                        </svg>
                    </span>
                </div>
            </li>
        </ul>                               
    </div>
</template>

<style  scoped>

</style>