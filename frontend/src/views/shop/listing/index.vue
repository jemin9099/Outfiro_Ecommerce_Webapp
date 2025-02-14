<script setup>
import ProductFilter from '@/components/productFilter.vue';
import Product from '@/components/product.vue'
import { ref, onMounted ,watch} from 'vue';
import { useShopStore } from '@/stores/shop'
import Detail from './detail.vue';
import Pagination from '@/components/pagination.vue';
const store = useShopStore()
const productDetail = ref()
watch(store.pagination, () => {
    store.fetchProducts()
  })
onMounted(() => {
    store.fetchProducts()
})
</script>
<template>
    <Detail ref="productDetail"/>
    <div class="relative">
        <div class="p-4 lg:p-6 pb-0 lg:pb-0 flex items-center justify-between">
            <h2 class="text-xl font-extrabold">Products List</h2>
            <button class="border border-black py-1 px-2 text-lg rounded flex items-center me-3 lg:hidden"
                @click="store.isOpenFilterMenu = !store.isOpenFilterMenu">
                <svg xmlns="http://www.w3.org/2000/svg" class="me-2" width="20" height="20" viewBox="0 0 24 24">
                    <title>filter-outline</title>
                    <path
                        d="M15,19.88C15.04,20.18 14.94,20.5 14.71,20.71C14.32,21.1 13.69,21.1 13.3,20.71L9.29,16.7C9.06,16.47 8.96,16.16 9,15.87V10.75L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L15,10.75V19.88M7.04,5L11,10.06V15.58L13,17.58V10.05L16.96,5H7.04Z" />
                </svg>
                <span>Filter</span>
            </button>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 p-4 lg:p-6 ">
            <div class="duration-500 absolute z-30 lg:sticky top-0 h-screen overflow-y-auto w-full lg:h-screen"
                :class="store.isOpenFilterMenu ? 'top-[0%] left-[0%]' : 'top-[0%] left-[-100%]'">
                <ProductFilter>
                    <button class="border border-black py-1 px-2 text-lg rounded flex items-center me-3 lg:hidden"
                        @click="store.isOpenFilterMenu = false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <title>close</title>
                            <path
                                d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
                        </svg>
                    </button>
                </ProductFilter>
            </div>
            <div class="bg-white w-full rounded-lg shadow-md">
                <div class="p-4 border-b flex items-center justify-between">
                    <h2 class="text-lg font-extrabold">All Products</h2>
                    <div class="flex items-center gap-3">
                        <span class="text-muted-foreground ">{{ store.products?.length }} Products</span>
                        <div class="relative">
                            <button class="flex items-center gap-1 border px-3 py-1 rounded font-medium border-black"
                                @click="store.isOpenSortMenu = !store.isOpenSortMenu">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <title>unfold-more-horizontal</title>
                                    <path
                                        d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
                                </svg>
                                <span>sort by</span>
                            </button>
                            <transition enter-active-class="transform transition duration-500 ease-custom"
                                enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                leave-active-class="transform transition duration-300 ease-custom"
                                leave-class="translate-y-0 scale-y-100 opacity-100"
                                leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                                <ul v-show="store.isOpenSortMenu"
                                    class="mt-3 border absolute left-[-50%] z-50 right-[0%] mb-4 bg-white divide-y rounded-md shadow-lg overflow-hidden w-44">
                                    <template v-for="(option, index) in store.sortOption" :key="index">
                                        <li class="px-3 py-2 transition-colors duration-300 hover:bg-gray-100  cursor-pointer flex items-center justify-between"
                                            :class="store.selectedSortOption === option.value ? 'text-black' : 'text-gray-500'"
                                            @click="store.handleSort(option.value)">
                                            <span> {{ option.text }} </span>
                                            <span class="text-green-600 text-lg">{{ store.selectedSortOption ===
                                                option.value? '✓':'' }}</span>
                                        </li>
                                        <hr>
                                    </template>
                                </ul>
                            </transition>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
                    <Product :product="product" v-for="(product, index) in store.products" :key="index" @next="productDetail.open(product._id)" />
                </div>
                <Pagination v-if="store.products?.length > 0"/>
            </div>
        </div>
    </div>
</template>
<style  scoped></style>