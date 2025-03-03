<script setup>
import { useShopStore } from '@/stores/shop';
import { ref } from 'vue';
const store = useShopStore()
</script>
<template>
    <div class="p-3 grid md:grid-cols-2 grid-cols-1 gap-4 text-center md:text-start">
        <div class="">
            <span class="me-2 font-semibold">Item par page :</span>
            <select name="" id="" v-model="store.pagination.limit"
                class="w-24 p-2 border bg-white border-black rounded text-lg">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
                <option value="80">80</option>
                <option value="100">100</option>
            </select>
        </div>
        <div>
            <div class="flex justify-center items-center md:justify-end">
               <div class="me-3">
                {{ store.paginationData?.from }} - {{ store.paginationData?.to }} of {{ store.paginationData?.total }}
               </div>
                <a href="#"
                    class="flex items-center justify-center px-2 py-1 mx-1 text-black capitalize bg-white rounded-md border "
                    :class="store.paginationData?.currentPage === 1 ? 'cursor-not-allowed text-gray-500' : 'border-black'"
                    @click="() => { store.paginationData?.currentPage !== 1 && store.pagination.page-- }">
                    <div class="flex items-center -mx-1">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>

                        <span class="mx-1">
                            previous
                        </span>
                    </div>
                </a>
                <a href="#" v-if="store.paginationData?.currentPage > 1"
                    class="hidden px-3 py-1 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline  hover:bg-black border border-black hover:text-white"
                    @click="store.pagination.page = store.paginationData?.currentPage - 1">
                    {{ store.paginationData?.currentPage - 1 }}
                </a>

                <a href="#"
                    class="hidden px-3 py-1 mx-1 transition-colors duration-300 transform rounded-md sm:inline  bg-black border border-black text-white ">
                    {{ store.paginationData?.currentPage }}
                </a>


                <a href="#" v-if="store.paginationData?.currentPage < store.paginationData?.totalPages"
                    class="hidden px-3 py-1 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline  hover:bg-black border border-black hover:text-white"
                    @click="store.pagination.page = store.paginationData?.currentPage + 1">
                    {{ store.paginationData?.currentPage + 1 }}
                </a>

                <a href="#"
                    class="flex items-center justify-center px-2 py-1 mx-1 text-black  transition-colors duration-300 transform bg-white rounded-md border "
                    :class="store.paginationData?.currentPage === store.paginationData?.totalPages ? 'cursor-not-allowed text-gray-500' : 'border-black hover:bg-black  hover:text-white'"
                    @click="() => { store.paginationData?.currentPage !== store.paginationData?.totalPages && store.pagination.page++ }">
                    <div class="flex items-center -mx-1">
                        <span class="mx-1">
                            Next
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-1 rtl:-scale-x-100" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<style scoped></style>