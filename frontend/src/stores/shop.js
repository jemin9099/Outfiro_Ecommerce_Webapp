import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useRoute, useRouter } from 'vue-router'

export const useShopStore = defineStore('shop', () => {
  const route = useRoute()
  const router = useRouter()
  const userData = JSON.parse(localStorage.getItem('userData'))
  const isOpenFilterMenu = ref(false)
  const isOpenSortMenu = ref(false)
  const categoryData = ref()
  const selectedSortOption = ref('a-z')
  const filters = ref({
    category: [],
    brand: [],
  })
  const products = ref()
  const searchProductData = ref()
  const productDetail = ref()
  const range = ref([10, 100])
  const pagination = ref({
    page: 1,
    limit: 10,
  })
  const paginationData = ref()
 
  const sortOption = [
    { value: 'highToLow', text: 'High To Low' },
    { value: 'lowToHigh', text: 'Low To High' },
    { value: 'a-z', text: 'A - Z Order' },
    { value: 'z-a', text: 'Z - A Order' },
  ]

  const fetchCategory = async () => {
    const { data, status } = await axios.get('/category/all')
    if (status === 200) {
      categoryData.value = data.data
    }
  }
  const fetchProducts = async () => {
    const payload = {
      ...filters.value,
      page: pagination.value.page,
      limit: pagination.value.limit,
      sort: selectedSortOption.value,
    }

    const { data, status } = await axios.get('/products/all', {
      params: payload,
    })

    if (status === 200) {
      products.value = data.data
      paginationData.value = data.pagination
    }
  }
  
  const fetchById = async (id) => {
    const { data, status } = await axios.get(`/products/${id}`)
    if (status === 200) {
      productDetail.value = data.data
      fetchReview(productDetail.value._id)
    }
  }
  const handleSort = (option) => {
    selectedSortOption.value = option
    fetchProducts()
  }

  const fetchReview = async (id) => {
    const { data, status } = await axios.get(`/review/all`, { params: { productId: id } })
    if (status === 200) {
      productDetail.value.reviews = data.data
    }
  }

  const submitReview = async (payload, isUpdate) => {
    if (userData) {
      if (isUpdate) {
        const { data, status } = await axios.put(`/review/${payload.id}`, payload)
        if (status === 200) {
          toast('Review Updated Successfully', {
            autoClose: 1000,
            type: 'success',
          })
          fetchReview(productDetail.value._id)
        }
      } else {
        const { data, status } = await axios.post('/review/add', payload)
        if (status === 201) {
          toast('Review Created Successfully', {
            autoClose: 1000,
            type: 'success',
          })
          fetchReview(payload.productId)
        }
      }
    } else {
      toast('you are not login', {
        autoClose: 1000,
        type: 'error',
      })
      router.push('/login')
    }
  }

  const deleteReview = async (id) => {
    const { data, status } = await axios.delete(`/review/${id}`)
    if (status === 200) {
      toast('Review Deleted Successfully', {
        autoClose: 1000,
        type: 'success',
      })
      fetchReview(productDetail.value._id)
    }
  }

  const searchProducts = async (search) => {
    router.push({ name: 'search', query: { query: search } })
    const { data, status } = await axios.get(`/products/search`, { params: { query: search } })
    if (status === 200) {
      searchProductData.value = data.data
    }
  }
  watch(
    () => filters.value,
    () => {            
      fetchProducts()
    },
    {
      deep: true,
    },
  )

  return {
    sortOption,
    isOpenFilterMenu,
    isOpenSortMenu,
    selectedSortOption,
    filters,
    products,
    productDetail,
    range,
    pagination,
    paginationData,
    searchProductData,
    categoryData,
    fetchCategory,
    fetchProducts,
    handleSort,
    fetchById,
    submitReview,
    fetchReview,
    deleteReview,
    searchProducts,
  }
})
