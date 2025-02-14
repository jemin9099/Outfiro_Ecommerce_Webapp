import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from '@/axios'

export const useUserDetailStore = defineStore('userDetail', () => {
    const isOpen = ref(false)
    const currentUser = ref()
    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    const fetchCurrentUser = async () => {
        const { data , status } = await axios.get('/auth/current-user')
        if(status === 200){
            currentUser.value = data.data[0]
        }
    }
  
    return { isOpen, toggle ,currentUser , fetchCurrentUser}
  })