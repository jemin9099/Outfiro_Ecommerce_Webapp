<script setup>
import { ref } from 'vue';
import moment from 'moment';
import { useOrderStore } from '@/stores/order';
const props = defineProps({
    isAdmin: {
        type: Boolean,
        default: false
    }
})
const store = useOrderStore()
const statusOption = [
    { value: 'pending', text: 'Pending' },
    { value: 'inProcess', text: 'In Process' },
    { value: 'inShipping', text: 'In Shipping' },
    { value: 'delivered', text: 'Delivered' },
    { value: 'rejected', text: 'Rejected' },

]
const dialog = ref(false);
const orderDetail = ref()
const orderStatus = ref()
const user = JSON.parse(localStorage.getItem('userData'))
const open = (item) => {
    dialog.value = true
    orderDetail.value = item
}

const statusUpdate = async () => {
    store.updateOrderStatus(orderDetail.value._id , orderStatus.value).then(() => {
        dialog.value = false
    })
}
defineExpose({ open })
</script>
<template>
    <div class="fixed z-50 overflow-y-auto top-0 h-full w-full left-0" :class="dialog ? '' : 'hidden'" id="modal">
        <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-950/30 backdrop-blur-sm" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full p-3"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="flex items-center justify-between mb-3">
                    <h2 class="text-2xl font-semibold">{{ 'Order Detail' }}</h2>
                    <span class="text-xl cursor-pointer font-semibold" @click="dialog = false">&#x2715;</span>
                </div>
                <hr>
                <div class="grid " v-if="orderDetail">
                    <div class="grid grid-cols-2 gap-4 p-3">
                        <div class="">
                            <p class="font-semibold"> {{ 'Order Id :' }}</p>
                            <span class="text-gray-700">{{ orderDetail._id }}</span>
                        </div>
                        <div class="">
                            <p class="font-semibold"> {{ 'Order Date :' }}</p>
                            <span class="text-gray-700">{{ moment(orderDetail.orderDate).format('MMM Do YY') }}</span>
                        </div>
                        <div class="">
                            <p class="font-semibold mb-2"> {{ 'Order Status :' }}</p>
                            <span class=" p-2  rounded-md "  :class="orderDetail.orderStatus === 'confirmed'?'bg-green-100 text-green-500':orderDetail.orderStatus === 'rejected'?'bg-red-100 text-red-500':orderDetail.orderStatus === 'delivered'?'bg-green-100 text-green-500':'bg-sky-100 text-sky-500'">{{orderDetail.orderStatus}}</span>
                        </div>
                        <div class="">
                            <p class="font-semibold"> {{ 'Order Price :' }}</p>
                            <span class="text-gray-700">{{ '$ '+ orderDetail.totalAmount   }}</span>
                        </div>
                        <div class="">
                            <p class="font-semibold"> {{ 'Payment Method :' }}</p>
                            <span class="text-gray-700">{{  orderDetail.paymentMethod   }}</span>
                        </div>
                        <div class="">
                            <p class="font-semibold mb-2"> {{ 'Payment Status :' }}</p>
                            <span class=" p-2  rounded-md "  :class="orderDetail.paymentStatus === 'paid'?'bg-green-100 text-green-500':'bg-sky-100 text-sky-500'">{{orderDetail.paymentStatus}}</span>
                        </div>
                    </div>
                    <hr>
                    <div class="grid gap-4 p-3">
                        <div class="font-semibold">{{ 'Order Items' }}</div>
                        <ul class="grid grid-cols-1 gap-3 border py-3 px-2">
                            <li class="border-b pb-2" v-for="(item, index) in orderDetail.cartItems" :key="index">
                                <div class="grid grid-cols-4">
                                    <div class="font-medium col-span-2"> {{ item.title }}</div>
                                    <div>{{'Qty : '+ item.quantity  }}</div>
                                    <div>{{ '$ '+ item.price   }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="grid gap-4 p-3">
                        <div class="font-semibold">{{ 'Shipping Info' }}</div>
                        <div class="grid gap-0.5 text-gray-500">
                            <span>{{ user.userName }} </span>
                            <span>{{ orderDetail.addressInfo.address }} </span>
                            <span>{{ orderDetail.addressInfo.city }} </span>
                            <span>{{ orderDetail.addressInfo.pincode }} </span>
                            <span>{{ orderDetail.addressInfo.phone }} </span>
                            <span>{{ orderDetail.addressInfo.notes }} </span>
                        </div>
                    </div>
                    <div v-if="isAdmin">
                      <form @submit.prevent="statusUpdate()">
                        <label class="font-medium text-gray-800">Order Status</label>
                        <select class="w-full outline-none rounded bg-gray-100 p-3 mt-2 mb-3" v-model="orderStatus" required>
                            <option v-for="(status, index) in statusOption" :key="index" :value="status.value">
                                {{ status.text }}</option>
                        </select>
                        <button type="submit" class="w-full py-2 bg-black text-white font-semibold rounded-md">Update Status</button>
                      </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>