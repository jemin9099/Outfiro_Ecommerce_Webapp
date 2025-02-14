import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import { useOrderStore } from '@/stores/order';
import axios from '@/axios'
import { useRoute, useRouter } from 'vue-router'

export const useCartStore = defineStore('cart', () => {
  const cart = ref([])
  const router = useRouter()
  const orderStore = useOrderStore()
  const userData = JSON.parse(localStorage.getItem('userData'))
  const fetchCart = async () => {
    const { data, status } = await axios.get('/cart/all')
    if (status === 200) {
      cart.value = data.data.products
      orderStore.cartId = data.data._id
      orderStore.cartItems = data.data.products?.map((item) => ({
        title: item.title,
        productId: item.productId,
        image: item.image,
        price: item.salling_price > 0 ? item.salling_price : item.price,
        quantity: item.quantity
      }))      
      orderStore.totalAmount = cart.value?.reduce((sum, item) => sum + (item.salling_price * item.quantity), 0);
    }
  }

  const addToCart = async (id, qty) => {
    if(userData){
        try {
        let quantity = 1
        if (qty) {
          quantity = qty
        }
        const { data, status } = await axios.post('/cart/add', {
          productId: id,
          quantity: quantity,
        })
        if (status === 201) {
          toast('Product added to cart successfully', {
            autoClose: 1000,
            type: 'success',
          })
          fetchCart()
        } else {
          toast('Error While Product adding to cart', {
            autoClose: 1000,
            type: 'error',
          })
        }
      }    
      catch (error) {
       toast('you are not add product more then stock', {
         autoClose: 1000,
         type: 'error',
       })
      }
   }
   else{
    toast('you are not login', {
      autoClose: 1000,
      type: 'error',
    })
    router.push('/login')
  }
  }

  const updateCart = async (id, qty) => {
      const { data, status } = await axios.put('/cart/update', {
        productId: id,
        quantity: qty,
      })
      if (status === 200) {
        toast('Product Update to cart successfully', {
          autoClose: 1000,
          type: 'success',
        })
        fetchCart()
      } else {
        toast('Error While Product updating to cart', {
          autoClose: 1000,
          type: 'error',
        })
      }
      
  }

  const deleteCartItem = async (id) => {
    const { data, status } = await axios.delete(`/cart/${id}`)
    if (status === 200) {
      toast('Product Delete to cart successfully', {
        autoClose: 1000,
        type: 'success',
      })
      fetchCart()
    } else {
      toast('Error While Product deleting to cart', {
        autoClose: 1000,
        type: 'error',
      })
    }
  }
  return { cart, fetchCart, addToCart ,updateCart , deleteCartItem}
})
