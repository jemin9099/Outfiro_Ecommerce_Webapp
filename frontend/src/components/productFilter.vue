<script setup>
import VueSimpleRangeSlider from "vue-simple-range-slider";
import "vue-simple-range-slider/css";
import { useShopStore } from '@/stores/shop'
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()
const store = useShopStore()

const handleCategoryChange = (category) => {
    if (store.filters.category.includes(category._id)) {
        selectAllChildren(category)
    }
    else {
        deselectAllChildren(category)
    }
}

const selectAllChildren = (category) => {
    category.subCategory.forEach((sub) => {
        if (!store.filters.category.includes(sub._id)) {
            store.filters.category.push(sub._id)
        }
        selectAllChildren(sub)
    })
}

const deselectAllChildren = (category) => {
    category.subCategory.forEach((sub) => {
        if (store.filters.category.includes(sub._id)) {
            store.filters.category.splice(store.filters.category.indexOf(sub._id), 1)
        }
        deselectAllChildren(sub)
    })
}

const brandData = computed(() => {
    let brand = []
    store.products?.forEach((product) => {
        if (!brand.includes(product.brand)) {
            brand.push(product.brand)
        }
    })
    const uniqueArray = brand?.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t._id === value._id
        ))
    );
    
    return uniqueArray
})
onMounted(() => {
    store.fetchCategory()
})
</script>
<template>
    <div class="rounded-lg shadow-md bg-white">
        <div class="p-4 border-b flex items-center justify-between">
            <h2 class="text-lg font-semibold">Filters</h2>
            <slot />
        </div>
        <div class="p-4 space-y-4">
            <h3 class="text-base font-bold">{{ 'Categories' }}</h3>
            <div class="grid gap-2 mt-2">
                <div class="flex items-center space-x-3 py-2" v-for="(item, index) in store.categoryData" :key="index">
                    <input type="checkbox" class="border-gray-300 rounded h-5 w-5" :id="item._id"
                        v-model="store.filters.category" :value="item._id" @change="handleCategoryChange(item)" />
                    <label :for="item._id">{{ item.name }}</label>
                </div>
            </div>
            <hr>
            <h3 class="text-base font-bold">{{ 'Brand' }}</h3>
            <div class="grid gap-2 mt-2">
                <div class="flex items-center space-x-3 py-2" v-for="(item, index) in brandData" :key="index">
                    <input type="checkbox" class="border-gray-300 rounded h-5 w-5" :id="item._id"
                        v-model="store.filters.brand" :value="item._id" />
                    <label :for="item._id">{{ item.name }}</label>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>