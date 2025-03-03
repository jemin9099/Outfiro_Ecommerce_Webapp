import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios'
import { useShopStore } from '@/stores/shop';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useBrandStore = defineStore('brand', () => {
    const store = useShopStore()
    const brands = ref([])
    const getBrands = async (isPaginate = true) => {
        const payload = {
            page: store.pagination.page,
            limit: store.pagination.limit,
          } 
        const { data , status } = await axios.get('/brand/all', {params: isPaginate?payload:{}})
        if (status === 200) {
            brands.value = data.data
            if(isPaginate){
                store.paginationData = data.pagination
            }
        }
    }
    const AddBrand = async (payload) => {
        const { data , status } = await axios.post('/brand/add', payload)
        if (status === 201) {
            toast('Brand added successfully', {
                autoClose: 1000,
                type: 'success',
            })
            getBrands()
        }
    }
    const updateStatus = async (id , payload) => {
        const { data , status } = await axios.put(`/brand/updateStatus/${id}` , {status:payload })
        if (status === 200) {
            toast('Brand updated successfully', {
                autoClose: 1000,
                type: 'success',
            })
            getBrands()
        }
    }

    const updateBrand = async (id , payload) => {
        const { data , status } = await axios.put(`/brand/${id}` , payload)
        if (status === 200) {
            toast('Brand updated successfully', {
                autoClose: 1000,
                type: 'success',
            })
            getBrands()
        }
    }

    const deleteBrand = async (id) => {
        const { data , status } = await axios.delete(`/brand/${id}`)
        if (status === 200) {
            toast('Brand deleted successfully', {
                autoClose: 1000,
                type: 'success',
            })
            getBrands()
        }
    }
    return { getBrands, brands ,AddBrand ,updateStatus , updateBrand , deleteBrand}
})