import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';
import axios from '@/axios'

export const useAddressStore = defineStore('address', () => {
    const address = ref([])
    const fetchAddress = async () => {
        const { data, status } = await axios.get('/address/all')
        if (status === 200) {
            address.value = data.data
        } else {
            toast('Error While Fetching Address', {
                autoClose: 1000,
                type: 'error',
            })
        }
    }

    const addAddress = async (payload) => {
        const {data ,status} = await axios.post('/address/add' , payload)
        if(status === 201){
            toast('Address Added Successfully', {
                autoClose: 1000,
                type: 'success',
            })
            fetchAddress()
            return false
        }
        else{
            toast('Error While Adding Address', {
                autoClose: 1000,
                type: 'error',
            })
            return true
        }
    }

    const updateAddress = async (payload) => {
        const {data ,status} = await axios.put(`/address/${payload._id}` , payload)
        if(status === 200){
            toast('Address Updated Successfully', {
                autoClose: 1000,
                type: 'success',
            })
            fetchAddress()
            return false
        }
        else{
            toast('Error While Updating Address', {
                autoClose: 1000,
                type: 'error',
            })
            return true
        }   
    }

    const deleteAddress = async (id) => {
        const {data ,status} = await axios.delete(`/address/${id}`)
        if(status === 200){
            toast('Address Deleted Successfully', {
                autoClose: 1000,
                type: 'success',
            })
            fetchAddress()
            return false
        }
        else{
            toast('Error While Deleting Address', {
                autoClose: 1000,
                type: 'error',
            })
            return true
        }
    }
    return { address, fetchAddress ,addAddress , updateAddress , deleteAddress , toast}
})