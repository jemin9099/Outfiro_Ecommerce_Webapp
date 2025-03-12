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
const categorySlider = ref()
const brandSlider = ref()
const scrollAmount = ref(300)
let timer = null

const handleBrandClick = (brand) => {
    shopStore.filters.brand = []
    shopStore.filters.brand.push(brand)
    router.push({ name: 'listing' })
}
const handleCategoryClick = (category) => {
    shopStore.filters.category = []
    shopStore.filters.category.push(category)
    router.push({ name: 'listing' })
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
    shopStore.fetchCategory()
    shopStore.fetchBrands()
})

const scroll = (direction , name) => {
   if(name === 'brand'){
    if (direction === 'prev') {
        brandSlider.value.scrollBy({
            left: -scrollAmount.value,
            behavior: 'smooth'
        })
    }
    else {
        brandSlider.value.scrollBy({
            left: scrollAmount.value,
            behavior: 'smooth'
        })
    }
   }
   else{
    if (direction === 'prev') {
        categorySlider.value.scrollBy({
            left: -scrollAmount.value,
            behavior: 'smooth'
        })
    }
    else {
        categorySlider.value.scrollBy({
            left: scrollAmount.value,
            behavior: 'smooth'
        })
    }
   }
}
onUnmounted(() => {
    clearInterval(timer);
});
</script>
<template>
    <Detail ref="productDetail" />
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
            <div class="container mx-auto px-4 relative">
                <h2 class="font-bold text-3xl text-center mb-8">Shop by category</h2>
                <div class="flex overflow-hidden gap-4" ref="categorySlider">
                    <div class="bg-white flex justify-center items-center rounded-md duration-500 shadow hover:shadow-md mb-4 p-2 cursor-pointer transition-shadow"
                        v-for="(category, index) in shopStore.categoryData" :key="index"
                        @click="handleCategoryClick(category._id)">
                        <div class="flex flex-col w-52 items-center justify-center ">
                            <span class="mb-2 text-primary">
                                <img :src="category.image" class="w-[50px] h-[50px] object-contain" alt="">
                            </span>
                            <span class="font-bold text-xl">{{ category.name }}</span>
                        </div>
                    </div>
                    <button @click="scroll('prev' , 'category')"
                        class="absolute left-0 top-2/3 transform -translate-y-2/3 bg-black text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                            <title>arrow-left</title>
                            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                        </svg>
                    </button>
                    <button @click="scroll('next' , 'category')"
                        class="absolute right-0 top-2/3 transform -translate-y-2/3 bg-black text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                            <title>arrow-right</title>
                            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
        <section class="py-12 bg-white">
            <div class="container mx-auto px-4">
                <h2 class="font-bold text-3xl text-center mb-8">Feature Product</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    <Product :product="product" v-for="(product, index) in shopStore.products" :key="index"
                        @next="productDetail.open(product._id)" />
                </div>
            </div>
        </section>
        <section class="py-12 bg-gray-50">
            <div class="container mx-auto px-4 relative">
                <h2 class="font-bold text-3xl text-center mb-8">Shop by Brand</h2>
                <div class="flex overflow-hidden gap-4" ref="brandSlider">
                    <div class="bg-white rounded-md mb-4 duration-500 shadow hover:shadow-md p-2 cursor-pointer transition-shadow"
                        v-for="(brand, index) in shopStore.brandData" :key="index"
                        @click="handleBrandClick(brand._id)">
                        <div class="flex flex-col w-60 items-center justify-center">
                            <span class="mb-2 text-primary">
                                <img :src="brand.image" class="w-[50px] h-[50px] object-contain" alt="">
                            </span>
                            <span class="font-bold text-xl">{{ brand.name }}</span>
                        </div>
                    </div>
                </div>
                <button @click="scroll('prev' , 'brand')"
                    class="absolute left-0 top-2/3 transform -translate-y-2/3 bg-black text-white p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <title>arrow-left</title>
                        <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
                    </svg>
                </button>
                <button @click="scroll('next' , 'brand')"
                    class="absolute right-0 top-2/3 transform -translate-y-2/3 bg-black text-white p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <title>arrow-right</title>
                        <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                    </svg>
                </button>
            </div>
        </section>
    </div>
</template>
<style scoped></style>