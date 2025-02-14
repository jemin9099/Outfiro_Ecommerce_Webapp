<script setup>
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';
import { useOrderStore } from '@/stores/order';

const props = defineProps({
    isCheckoutBtn: {
        type: Boolean,
        default: true
    }
})
const store = useCartStore();
const orderStore = useOrderStore()
const updateQty = (type , item) => {
   if(type === 'minus'){
        if(item.quantity > 1){
            item.quantity--
            store.updateCart(item.productId , item.quantity)
        }        
   } 
   else if(type === 'plus'){
        if(item.quantity < item.stock){
            item.quantity++
            store.updateCart(item.productId , item.quantity)
        }
   }
}

const calculateGrandTotal = () => {
    const total = store.cart?.reduce((sum, item) => sum + (item.salling_price * item.quantity), 0);
    return total
}
onMounted(() => {
    store.fetchCart()
    
})
</script>
<template>
    <div v-if="store.cart?.length > 0">
        <div class="mt-8 space-y-4 p-4 pt-0" >
            <div class="flex border-b pb-2 items-center space-x-4" v-for="(item, index) in store.cart" :key="index">
                <img :src="item.image" class="w-20 h-20 rounded object-cover" alt="">
                <div class="flex-1">
                    <h3 class="font-extrabold">{{ item.title }}</h3>
                    <div class="flex items-center mt-1" v-if="isCheckoutBtn">
                        <button type="button" id="decrement-button" data-input-counter-decrement="counter-input"
                            class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100" @click="updateQty('minus' , item)">
                            <svg class="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M1 1h16" />
                            </svg>
                        </button>
                        <input type="number" id="counter-input" data-input-counter
                            class="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 "
                            v-model="item.quantity" placeholder="" required />
                        <button type="button" id="increment-button" data-input-counter-increment="counter-input"
                            class="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100" @click="updateQty('plus' , item)">
                            <svg class="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 1v16M1 9h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex flex-col items-end">
                    <p class="font-semibold">$ {{ (item.salling_price * item.quantity).toFixed(2) }} </p>
                    <div class="border border-red-500 cursor-pointer hover:bg-red-100 rounded p-1" v-if="isCheckoutBtn" @click="store.deleteCartItem(item.productId)"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 fill-red-500 " viewBox="0 0 24 24"><title>delete-outline</title><path d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8,9H16V19H8V9M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" /></svg></div>
                </div>
            </div>
        </div>
        <div class="mt-8 space-y-4 p-4">
            <div class="flex justify-between">
                <span class="font-bold">Total</span>
                <span class="font-bold">${{calculateGrandTotal()}}</span>
            </div>
        </div>
        <button class="w-full py-2 mx-4 mt-3 bg-black font-semibold text-white rounded-md" v-if="isCheckoutBtn">
           <RouterLink to="/shop/checkout">
            Checkout
           </RouterLink>
        </button>
        <button class="w-full py-2 mx-4 mt-3 bg-black font-semibold text-white rounded-md" @click="orderStore.createOrder()" v-else>
            Checkout With Paypal
        </button>
    </div>
    <div v-else class="flex h-screen flex-col justify-center items-center">
       <div>
        <img src="../assets/Banners/emptyCart.jpg" class="w-[300px] h-[300px]" alt="">
        <h2 class="text-center text-3xl font-semibold">Your cart is empty</h2>
        <p class="text-center text-xl mt-3">Add Something to make me happy :)</p>
       </div>
       <div>
        <button class="w-full py-2 mx-4 mt-3 bg-black font-semibold text-white rounded-md" v-if="isCheckoutBtn">
            <RouterLink to="/shop/listing">
             Continue Shopping
            </RouterLink>
         </button>
       </div>
    </div>
</template>
<style scoped></style>