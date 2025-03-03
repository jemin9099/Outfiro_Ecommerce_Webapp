<script setup>
import { ref, computed } from "vue";
import { useShopStore } from "@/stores/shop";
import { useCartStore } from "@/stores/cart";
import StarRating from 'vue-star-rating'
const dialog = ref(false);
const isReviewUpdate = ref();
const isReview = ref();
const store = useShopStore();
const cartStore = useCartStore();
const user = JSON.parse(localStorage.getItem('userData'))
const inputData = ref({
    review: '',
    rating: 0
})
const open = (id) => {
    dialog.value = true;
    store.fetchById(id);
};
const percentage = (selling_price, total_price) => {
    return ((total_price - selling_price) / total_price) * 100;
};


const avatarName = (name) => {
    const first = name.split(' ')[0].charAt(0)
    const last = name.split(' ')[1]?.charAt(0)
    return `${first}${last?last:''}`
}

const submitReview = (id, updateId) => {
    let update = false
    let data
    if (updateId) {
        update = true
        data = {
            id: updateId,
            rating: inputData.value.rating,
            review: inputData.value.review
        }
    }
    else {
        update = false
        data = {
            productId: id,
            rating: inputData.value.rating,
            review: inputData.value.review
        }
    }
    store.submitReview(data , update).then(() => {
        inputData.value.rating = 0
        inputData.value.review = ''
        isReviewUpdate.value = ''
        isReview.value = ''
    })
}

const averageRating = computed(() => {
    if (store.productDetail.reviews?.length === 0) return 0;
    const total = store.productDetail.reviews?.reduce((sum, review) => sum + review.rating, 0);
    return (total / store.productDetail.reviews?.length).toFixed(1);
})
defineExpose({ open });
</script>
<template>
    <div class="fixed z-50 overflow-y-auto top-0 h-full w-full left-0" :class="dialog ? '' : 'hidden'" id="modal">
        <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-950/30 backdrop-blur-sm" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full p-3"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="text-end">
                    <button class="text-2xl me-3" @click="dialog = false">x</button>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-5 pt-0" v-if="store.productDetail">
                    <div>
                        <img :src="store.productDetail.image" class="rounded-lg h-76 w-full object-cover"
                            width="600" height="600" alt="" />
                    </div>
                    <div class="relative">
                        <h2 class="text-2xl font-extrabold mb-2">{{ store.productDetail.title }}</h2>
                        <p class="text-gray-500">{{ store.productDetail.description }}</p>
                        <div class="flex items-center justify-between mt-4">
                            <div class="flex items-center">
                                <p class="text-2xl font-semibold text-black cursor-auto my-3">
                                    $
                                    {{
                                        Number(store.productDetail.salling_price) > 0
                                            ? store.productDetail.salling_price
                                            : store.productDetail.price
                                    }}
                                </p>
                                <del v-if="Number(store.productDetail.salling_price) > 0">
                                    <p class="text-lg text-gray-600 cursor-auto ml-2">
                                        $ {{ store.productDetail.price }}
                                    </p>
                                </del>
                            </div>
                            <div>
                                <p class="text-md bg-green-100 px-3 py-1 text-green-500 rounded cursor-auto ml-2">
                                    {{
                                        percentage(
                                            store.productDetail.salling_price,
                                            store.productDetail.price
                                        ).toFixed(0)
                                    }}% OFF
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center justify-between gap-0.5">
                            <div class="flex items-center gap-3">
                                <star-rating star-size="22" :rating="averageRating" :show-rating="false"
                                    :read-only="true" :increment="0.01" />
                                <span class="text-gray-500 h-[24px] pt-1">({{ averageRating }})</span>
                            </div>
                            <p class="text-red-500 bg-red-100 p-2 rounded-md"
                                v-if="store.productDetail.stock <= 10 && store.productDetail.stock > 0">Only {{
                                    store.productDetail.stock }} left in stock.</p>
                        </div>
                        <button class="w-full py-2 rounded-md mt-4 mb-2"
                            :class="Number(store.productDetail.stock) === 0 ? 'bg-red-100 cursor-not-allowed text-red-500' : 'bg-black text-white'"
                            :disabled="Number(store.productDetail.stock) === 0 ? true : false"
                            @click="cartStore.addToCart(store.productDetail._id)">
                            {{ Number(store.productDetail.stock) === 0 ? 'Out of Stock' : 'Add to Cart' }}
                        </button>
                        <hr />
                        <div class="h-[250px] overflow-auto">
                            <h2 class="text-xl font-bold mb-4">Reviews</h2>
                            <div class="grid gap-6">
                                <div class="flex justify-between gap-4"
                                    v-for="(review, index) in store.productDetail.reviews" :key="index">
                                    <div class="flex gap-4">
                                        <div
                                            class="w-10 h-10 border text-lg flex justify-center items-center bg-black text-white uppercase text-center rounded-full">
                                            {{ avatarName(review.userId.userName) }}
                                        </div>
                                        <div class="grid gap-1">
                                            <div class="flex items-center gap-2">
                                                <h3 class="font-bold">{{ review.userId.userName }}</h3>
                                            </div>
                                            <star-rating star-size="22" :rating="review.rating" :show-rating="false"
                                                :read-only="true" :increment="0.01" />
                                            <p class="text-neutral-500">{{ review.review }}</p>
                                        </div>
                                    </div>
                                    <div v-if="user?._id === review?.userId?._id">
                                        <button @click="isReview = isReview === review._id ? null : review._id">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24">
                                                <title>dots-vertical</title>
                                                <path
                                                    d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z" />
                                            </svg>
                                        </button>
                                        <transition enter-active-class="transform transition duration-500 ease-custom"
                                            enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                                            enter-to-class="translate-y-0 scale-y-100 opacity-100"
                                            leave-active-class="transform transition duration-300 ease-custom"
                                            leave-class="translate-y-0 scale-y-100 opacity-100"
                                            leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                                            <ul v-show="isReview === review._id"
                                                class="absolute  right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden w-20">
                                                <li class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 flex gap-2 justify-center"
                                                    @click="() => { inputData.review = review.review, inputData.rating = review.rating, isReviewUpdate = review._id }">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                                                        viewBox="0 0 24 24">
                                                        <title>pencil</title>
                                                        <path
                                                            d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                                                    </svg>
                                                </li>
                                                <hr>
                                                <li
                                                    class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200 flex gap-2 justify-center" @click="store.deleteReview(review._id)">
                                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                                                        viewBox="0 0 24 24">
                                                        <title>delete</title>
                                                        <path
                                                            d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                                                    </svg>
                                                </li>
                                            </ul>
                                        </transition>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="p-3 ">
                            <div class="flex items-end gap-2">
                                <span class="">Rating :</span>
                                <star-rating star-size="22" v-model:rating="inputData.rating" :show-rating="false"
                                    :increment="0.01" />
                            </div>
                            <div class="mt-6 flex gap-2 w-full">
                                <input type="text" class="w-full outline-none rounded bg-gray-100 p-2"
                                    placeholder="Write a Review..." v-model="inputData.review" required />
                                <button class="px-3 py-1 bg-black text-white rounded"
                                    @click="submitReview(store.productDetail._id, isReviewUpdate)">submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.ease-custom {
    transition-timing-function: cubic-bezier(.61, -0.53, .43, 1.43);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>
