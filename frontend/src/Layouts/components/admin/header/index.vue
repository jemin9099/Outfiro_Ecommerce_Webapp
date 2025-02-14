<script setup lang="ts">
import { ref , defineProps} from 'vue';
import { useRouter } from 'vue-router';
import {useSidebarStore} from '@/stores/sidebar'

const store = useSidebarStore()
const userData = JSON.parse(localStorage.getItem('userData'))
const router = useRouter()
const props = defineProps({
    user:Object
})
const logout = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    router.push('/login')
}
</script>
<template>
    <header class=" rounded shadow-md bg-white px-3 py-4">
        <nav class="flex justify-between">
            <div class=" flex items-center">
                <button aria-label="open" id="open" class="md:hidden me-3" @click="store.toggle()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 24 24"><title>menu</title><path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" /></svg>
                </button>
                <div class="text-xl hidden sm:block">
                    welcome , <span class="font-semibold">{{user?.userName}}</span> 
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="flex items-center gap-2">
                    <button type="button"
                        class="hover:bg-clip-text hover:text-transparent bg-gray-900 border-solid   font-bold text-white px-5 py-2 rounded-full " v-if="!userData"><RouterLink to="/login" >Login</RouterLink></button>
                        <button type="button"
                        class="hover:bg-clip-text hover:text-transparent bg-gray-900 border-solid   font-bold text-white px-5 py-2 rounded-full " v-else @click="logout()"><RouterLink to="/login">Logout</RouterLink></button>
                </div>
            </div>
        </nav>
    </header>
</template>
<style scoped></style>