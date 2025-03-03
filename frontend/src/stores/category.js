import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([])

    const getCategories = async() => {
        const {data , status} = await axios.get('/category/all')
        categories.value = data.data
    }
    const addCategory = async(formData) => {
        const {data , status} = await axios.post('/category/add' , formData)
        if(status === 201){
            toast('Category Added Successfully', {
                autoClose: 1000,
                type: 'success',
            })
            getCategories()
            return false
        }
        else{
            toast('Error While Adding Category', {
                autoClose: 1000,
                type: 'error',
            })
            return true
        }
    }

    const updateCategory = async(id,formData) => {
        const {data , status} = await axios.put('/category/'+id, formData)
        if(status === 200){
            toast('Category Updated Successfully', {
                autoClose: 1000,
                type: 'success',
            })
            getCategories()
            return false
        }
        else{
            toast('Error While Updating Category', {
                autoClose: 1000,
                type: 'error',
            })
            return true
        }
    }

    const deleteCategory = async(id) => {
        const {data , status} = await axios.delete('/category/'+id)
        if(status === 200){
            toast('Category Deleted Successfully', {
                autoClose: 1000,
                type: 'success',
            })
            getCategories()
            return false
        }
        else{
            toast('Error While Deleting Category', {
                autoClose: 1000,
                type: 'error',
            })
            return true
        }
    }

    return {
        categories,
        addCategory,
        getCategories,
        updateCategory,
        deleteCategory
    }
})