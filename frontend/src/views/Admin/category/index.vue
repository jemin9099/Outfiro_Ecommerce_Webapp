<script setup>
import { ref, onMounted } from 'vue';
import CategoryDialog from './categoryDialog.vue';
import { useCategoryStore } from '@/stores/category';
import CategoryRecursion from '@/components/categoryRecursion.vue';
const store = useCategoryStore()
const categoryModel = ref()
const height = ref()
onMounted(() => {  
    height.value = `max-h-[${document.getElementById('categoryModel').clientHeight}px]`
    store.getCategories()
})
</script>
<template>
    <div class="p-3 mt-5 bg-white  rounded-md">
        <div class="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div class="border rounded-md">
                <h2 class="p-3 pb-0 text-2xl font-semibold">All Categories</h2>
                <ul class="p-3  overflow-y-auto" :class="height">
                    <CategoryRecursion v-for="(category, index) in store.categories" :key="index"
                        :category="category" @edit="(editItem) => {categoryModel.open(editItem)}" />
                </ul>
            </div>
            <div class="col-span-2 border rounded-md">
                <CategoryDialog ref="categoryModel" />
            </div>
        </div>
    </div>
</template>
<style scoped></style>