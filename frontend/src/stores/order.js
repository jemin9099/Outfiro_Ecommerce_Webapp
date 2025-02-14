import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRoute, useRouter } from 'vue-router'
import { useShopStore } from '@/stores/shop';
import Cookies from 'js-cookie'

export const useOrderStore = defineStore('order', () => {
  const store = useShopStore()
  const selectedAddress = ref()
  const cartItems = ref()
  const orders = ref()
  const totalAmount = ref()
  const orderId = ref()
  const cartId = ref()
  const router = useRouter()

  const fetchOrders = async (isAdmin) => {
    const payload = {
      page: store.pagination.page,
      limit: store.pagination.limit,
      isAdmin: isAdmin
    } 
    const { data, status } = await axios.get('/orders/all',{params: payload})
    if (status === 200) {
      orders.value = data.data
      store.paginationData = data.pagination
    }
  }
  const createOrder = async () => {
    if (!selectedAddress.value) {
      toast('Please Select Address', {
        autoClose: 1000,
        type: 'error',
      })
      return
    } else {
      const payload = {
        cartItems: cartItems.value,
        cartId: cartId.value,
        addressInfo: {
          addressId: selectedAddress.value._id,
          address: selectedAddress.value.address,
          city: selectedAddress.value.city,
          pincode: selectedAddress.value.pincode,
          phone: selectedAddress.value.phone,
          notes: selectedAddress.value.notes,
        },
        orderStatus: 'pending',
        paymentMethod: 'paypal',
        paymentStatus: 'pending',
        totalAmount: totalAmount.value,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
        paymentId: '',
        payerId: '',
      }

      const { data, status } = await axios.post('/orders/create', payload)

      if (status === 201) {
        orderId.value = data.orderId
        Cookies.set('orderId', data.orderId, { expires: 7, path: '' })
        window.open(data.approvalURL, '_blank')
      }
    }
  }
  const completePayment = async (payer, payment) => {
    const orderid = Cookies.get('orderId')
    const { data, status } = await axios.post('/orders/capture', {
      orderId: orderid,
      paymentId: payment,
      PayerID: payer,
    })
    if (status === 200) {
      toast('Payment Successful', {
        autoClose: 1000,
        type: 'success',
      })
      router.push({ name: 'payment-success' })
    }
  }
  
  const updateOrderStatus = async (orderId, orderStatus) => {
    const { data, status } = await axios.put('/orders/'+orderId, {
      orderStatus: orderStatus,
    })
    if (status === 200) {
      toast('Order Status Updated Successfully', {
        autoClose: 1000,
        type: 'success',
      })
      fetchOrders(true)
    }
  }
  return {
    orderId,
    selectedAddress,
    cartItems,
    totalAmount,
    cartId,
    orders,
    updateOrderStatus,
    fetchOrders,
    createOrder,
    completePayment,
  }
})
