<script setup>
import { ref , onMounted ,watch} from 'vue';
import OrderDetailDialog from './orderDetailDialog.vue';
import { useOrderStore } from '@/stores/order';
import { useShopStore } from '@/stores/shop';
import Pagination from './pagination.vue';
import moment from 'moment';
const props = defineProps({
    isAdmin: {
        type: Boolean,
        default: false
    }
})
const store = useOrderStore()
const shopStroe = useShopStore()
const orderDetail = ref()

watch(shopStroe.pagination, () => {
    store.fetchOrders(props.isAdmin)
  })
onMounted(() => {
    store.fetchOrders(props.isAdmin)
})
</script>
<template>
    <OrderDetailDialog ref="orderDetail" :isAdmin="isAdmin"/>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow-sm rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Order ID
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Order Date
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Order Status
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Order Price
                        </th>
                        <th
                            class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            <span class="sr-only">Details</span>
                        </th>
                    </tr>
                </thead>
                <tbody> 
                    <tr v-for="(item , index) in store.orders" :key="index" >
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{{item._id}}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">{{moment(item.orderDate).format('MMM Do YY')}}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class=" whitespace-no-wrap inline p-2 rounded-md "  :class="item.orderStatus === 'confirmed'?'bg-green-100 text-green-500':item.orderStatus === 'rejected'?'bg-red-100 text-red-500':item.orderStatus === 'delivered'?'bg-green-100 text-green-500':'bg-sky-100 text-sky-500'">{{item.orderStatus}}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p class="text-gray-900 whitespace-no-wrap">$ {{item.totalAmount}}</p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" @click="orderDetail.open(item)">
                            <a href="#" class="text-Black hover:bg-black hover:text-white font-semibold border p-2 rounded-md border-black">View Details</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <Pagination v-if="store.orders?.length > 0"/>
    </div>
</template>
<style lang="scss" scoped></style>