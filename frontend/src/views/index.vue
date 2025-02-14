<script setup>
import banner1 from '@/assets/Banners/1.png'
import banner2 from '@/assets/Banners/2.png'
import banner3 from '@/assets/Banners/3.png'
import Product from '@/components/product.vue'
import { useHomeStore } from '@/stores/home'
import { useShopStore } from '@/stores/shop'
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router'
import Detail from './shop/listing/detail.vue'
const router = useRouter()
const store = useHomeStore()
const shopStore = useShopStore()
const currentSlide = ref(0)
const slides = ref([banner1, banner2, banner3])
const productDetail = ref()
let timer = null

const handleBrandClick = (brand) => {
    shopStore.filters.brand = []
    shopStore.filters.brand.push(brand)
    router.push({name:'listing'})
}
const handleCategoryClick = (category) => {
    shopStore.filters.category = []
    shopStore.filters.category.push(category)
    router.push({name:'listing'})
}
onMounted(() => {
    timer = setInterval(() => {
        if (currentSlide.value < (slides.value.length - 1)) {
            currentSlide.value++
        }
        else {
            currentSlide.value = 0
        }
    }, 3000);

    shopStore.fetchProducts()
})

onUnmounted(() => {
    clearInterval(timer);
});
</script>
<template>
    <Detail ref="productDetail"/>
    <div class="flex flex-col min-h-screen">
        <div class="relative w-full h-[600px] overflow-hidden">
            <img :src="banner" :class="index === currentSlide ? 'opacity-100' : 'opacity-0'"
                class="absolute duration-700 top-0 left-0 w-full h-full object-cover" v-for="(banner, index) in slides"
                :key="index" alt="">
            <button
                class="border absolute shadow-md top-1/2 left-4 transform -translate-y-1/2 bg-white border-black px-2 rounded-md py-1"
                @click="currentSlide > 0 && currentSlide--"
                :class="currentSlide === 0 ? 'opacity-40 cursor-not-allowed' : ''">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                    <title>arrow-left</title>
                    <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                </svg>
            </button>
            <button
                class="border absolute shadow-md top-1/2 right-4 transform -translate-y-1/2 bg-white border-black px-2 rounded-md py-1"
                @click="currentSlide < (slides.length - 1) && currentSlide++"
                :class="currentSlide === (slides.length - 1) ? 'opacity-40 cursor-not-allowed' : ''">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24">
                    <title>arrow-right</title>
                    <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
            </button>
        </div>
        <section class="py-12 bg-gray-50">
            <div class="container mx-auto px-4">
                <h2 class="font-bold text-3xl text-center mb-8">Shop by category</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div class="bg-white rounded-md duration-500 shadow hover:shadow-md p-2 cursor-pointer transition-shadow"
                        v-for="(category, index) in store.categories" :key="index"  @click="handleCategoryClick(category.name)">
                        <div class="flex flex-col items-center justify-centerp-6">
                            <span class="mb-2 text-primary" v-html="category.icon"></span>
                            <span class="font-bold text-xl">{{ category.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="py-12 bg-white">
            <div class="container mx-auto px-4">
                <h2 class="font-bold text-3xl text-center mb-8">Feature Product</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    <Product :product="product" v-for="(product, index) in shopStore.products" :key="index"
                        @next="productDetail.open(product._id)"  />
                </div>
            </div>
        </section>
        <section class="py-12 bg-gray-50">
            <div class="container mx-auto px-4">
                <h2 class="font-bold text-3xl text-center mb-8">Shop by Brand</h2>
                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div class="bg-white rounded-md duration-500 shadow hover:shadow-md p-2 cursor-pointer transition-shadow"
                        v-for="(brand, index) in store.brand" :key="index" @click="handleBrandClick(brand.name)">
                        <div class="flex flex-col items-center justify-centerp-6">
                            <span class="mb-2 text-primary" v-html="brand.icon"></span>
                            <span class="font-bold text-xl">{{ brand.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped></style>