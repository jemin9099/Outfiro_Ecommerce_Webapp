<script setup>
import { ref,onMounted } from 'vue';
import { useShopStore } from '@/stores/shop';
import { useRoute } from 'vue-router';
import Product from '@/components/product.vue';
import Detail from './listing/detail.vue';

const shopStore = useShopStore()
const route = useRoute()
const productDetail = ref()
const search = ref('')

const handleSearch = () => {
    shopStore.searchProducts(search.value)
}
onMounted(() => {
    search.value = route.query.query
    shopStore.searchProducts(search.value)
})
</script>
<template>
    <Detail ref="productDetail"/>
    <div class="container mt-5 mx-auto ">
        <h2 class="text-xl font-semibold">Search Product</h2>
        <div class="text-center md:px-6 px-4 py-8 bg-white rounded-md shadow mt-3">
            <div class="mb-5 text-center">
                <h2 class="text-2xl font-bold">Search For Products</h2>                
            </div>
            <div class="w-full mx-auto max-w-3xl flex">
                <label for="search" class="sr-only">Search</label>
                <div class="relative w-full flex items-center gap-3">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z">
                            </path>
                        </svg>
                    </div>
                    <input type="text" id="search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
                        placeholder="Search Product" v-model="search" required>
                    <button class="text-white font-semibold  flex gap-2 items-center  bg-black py-2 px-3 rounded-md hover:text-gray-500" @click="handleSearch()">
                        Search
                    </button>
                </div>
            </div>
            <div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    <Product :product="product" v-for="(product, index) in shopStore.searchProductData" :key="index" @next="productDetail.open(product._id)" />
                </div>
            </div>
        </div>
    </div>
</template>

<style  scoped>

</style>