<script setup>
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
const props = defineProps({
    product: Object,
    isViewBtn: Boolean
})
const store = useCartStore();
const router = useRouter()
const emit = defineEmits('next')
const percentage = (selling_price, total_price) => {
    return ((total_price - selling_price) / total_price) * 100;
}
</script>
<template>
    <div class="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#" class="relative" @click="emit('next')">
            <div class="relative">
                <div v-if="percentage(Number(product.salling_price), Number(product.price)) > 0"
                    class="absolute top-[11px]  left-2">
                    <span class="   text-center z-10  ">
                        <div class=" m-auto ">
                            <span class="bg-red-500 px-2 py-1 rounded text-white">Sale</span>
                        </div>
                    </span>
                </div>
                <img :src="product.image" alt="Product" class="h-80 w-full object-cover rounded-t-xl" />
            </div>
            <div class="px-4 py-3 w-full">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-gray-600 mr-3 uppercase text-xs">{{ product.brand }}</span>
                    <span class="text-gray-600 mr-3 uppercase text-xs">{{ product.category }}</span>
                </div>
                <p class="text-lg font-bold text-black truncate block capitalize">{{ product.title }}</p>
                <div class="flex items-center ">
                    <p class="text-lg font-semibold text-black cursor-auto my-3">$ {{ Number(product.salling_price) > 0
                        ? product.salling_price : product.price }}</p>
                    <del v-if="Number(product.salling_price) > 0">
                        <p class="text-sm text-gray-600 cursor-auto ml-2">$ {{ product.price }}</p>
                    </del>
                </div>
                <p class="text-red-500" v-if="product.stock <= 10 && product.stock > 0">Only {{ product.stock }} left in
                    stock.</p>
            </div>
        </a>
        <div class="px-4 py-3">
            <button class="w-full py-2 rounded-md "
                :class="Number(product.stock) === 0 ? 'bg-red-100 cursor-not-allowed text-red-500' : 'bg-black text-white'"
                :disabled="Number(product.stock) === 0 ? true : false" @click="store.addToCart(product._id)"
                v-if="!isViewBtn">
                {{ Number(product.stock) === 0 ? 'Out of Stock' : 'Add to Cart' }}
            </button>
            <button class="w-full bg-black text-white py-2  rounded-md" @click="router.push('/shop/listing')" v-else>
                View
            </button>
        </div>
    </div>
</template>
<style scoped></style>