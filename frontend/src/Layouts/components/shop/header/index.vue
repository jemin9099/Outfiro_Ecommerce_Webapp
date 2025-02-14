<script setup>
import { ref, onMounted } from 'vue';
import cart from '@/components/cart.vue';
import Menu from './menu'
import { useUserDetailStore } from '@/stores/userDetail'
import { useRouter } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { useShopStore } from '@/stores/shop';
const shopStore = useShopStore();
const store = useCartStore();
const userStore = useUserDetailStore()
const isLoggedIn = localStorage.getItem('userData') && localStorage.getItem('token');
const isOpenMenu = ref(false)
const isOpenCartDrawer = ref(false)
const isOptionsExpanded = ref(false)
const router = useRouter()

const avatarName = () => {
    const first = userStore.currentUser?.userName.split(' ')[0].charAt(0)
    const last = userStore.currentUser?.userName.split(' ')[1]?.charAt(0)
    return `${first}${last?last:''}`
}

const handleLogout = () => {
    localStorage.removeItem('userData')
    localStorage.removeItem('token')
    router.push('/login')
}
onMounted(() => {
    userStore.fetchCurrentUser()
})
</script>
<template>
    <header class="sticky top-0 z-40 w-full border-b shadow-md">
        <nav class="flex justify-between py-3 px-4 bg-white">
            <div class="w-[130px] md:w-[200px] flex items-center">
                <RouterLink to="/" class="flex items-center gap-2">
                    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M1 17H0H1ZM7 17H6H7ZM17 27V28V27ZM27 17H28H27ZM17 0C12.4913 0 8.1673 1.79107 4.97918 4.97918L6.3934 6.3934C9.20644 3.58035 13.0218 2 17 2V0ZM4.97918 4.97918C1.79107 8.1673 0 12.4913 0 17H2C2 13.0218 3.58035 9.20644 6.3934 6.3934L4.97918 4.97918ZM0 17C0 21.5087 1.79107 25.8327 4.97918 29.0208L6.3934 27.6066C3.58035 24.7936 2 20.9782 2 17H0ZM4.97918 29.0208C8.1673 32.2089 12.4913 34 17 34V32C13.0218 32 9.20644 30.4196 6.3934 27.6066L4.97918 29.0208ZM17 34C21.5087 34 25.8327 32.2089 29.0208 29.0208L27.6066 27.6066C24.7936 30.4196 20.9782 32 17 32V34ZM29.0208 29.0208C32.2089 25.8327 34 21.5087 34 17H32C32 20.9782 30.4196 24.7936 27.6066 27.6066L29.0208 29.0208ZM34 17C34 12.4913 32.2089 8.1673 29.0208 4.97918L27.6066 6.3934C30.4196 9.20644 32 13.0218 32 17H34ZM29.0208 4.97918C25.8327 1.79107 21.5087 0 17 0V2C20.9782 2 24.7936 3.58035 27.6066 6.3934L29.0208 4.97918ZM17 6C14.0826 6 11.2847 7.15893 9.22183 9.22183L10.636 10.636C12.3239 8.94821 14.6131 8 17 8V6ZM9.22183 9.22183C7.15893 11.2847 6 14.0826 6 17H8C8 14.6131 8.94821 12.3239 10.636 10.636L9.22183 9.22183ZM6 17C6 19.9174 7.15893 22.7153 9.22183 24.7782L10.636 23.364C8.94821 21.6761 8 19.3869 8 17H6ZM9.22183 24.7782C11.2847 26.8411 14.0826 28 17 28V26C14.6131 26 12.3239 25.0518 10.636 23.364L9.22183 24.7782ZM17 28C19.9174 28 22.7153 26.8411 24.7782 24.7782L23.364 23.364C21.6761 25.0518 19.3869 26 17 26V28ZM24.7782 24.7782C26.8411 22.7153 28 19.9174 28 17H26C26 19.3869 25.0518 21.6761 23.364 23.364L24.7782 24.7782ZM28 17C28 14.0826 26.8411 11.2847 24.7782 9.22183L23.364 10.636C25.0518 12.3239 26 14.6131 26 17H28ZM24.7782 9.22183C22.7153 7.15893 19.9174 6 17 6V8C19.3869 8 21.6761 8.94821 23.364 10.636L24.7782 9.22183ZM10.3753 8.21913C6.86634 11.0263 4.86605 14.4281 4.50411 18.4095C4.14549 22.3543 5.40799 26.7295 8.13176 31.4961L9.86824 30.5039C7.25868 25.9371 6.18785 21.9791 6.49589 18.5905C6.80061 15.2386 8.46699 12.307 11.6247 9.78087L10.3753 8.21913ZM23.6247 25.7809C27.1294 22.9771 29.1332 19.6127 29.4958 15.6632C29.8549 11.7516 28.5904 7.41119 25.8682 2.64741L24.1318 3.63969C26.7429 8.20923 27.8117 12.1304 27.5042 15.4803C27.2001 18.7924 25.5372 21.6896 22.3753 24.2191L23.6247 25.7809Z"
                            fill="black" />
                    </svg>
                    <p class="text-2xl leading-6 font-bold">OutFiro</p>
                </RouterLink>
            </div>
            <div class="flex items-center gap-3">
                <div class="navLinks duration-500 absolute md:static md:w-auto w-full md:h-auto h-[85vh] bg-white flex md:items-center gap-[1.5vw] top-[100%] px-5 md:py-0 py-5"
                    :class="isOpenMenu ? 'left-[0%]' : 'left-[-100%]'">
                    <ul class="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
                        <li class="relative max-w-fit pr-3 md:pr-0 py-1 after:bg-black  after:absolute after:h-1 after:w-0 after:bottom-0 after:left-0 hover:after:w-full after:transition-all after:duration-300"
                            v-for="(menuItem, index) in Menu" :key="index">
                            <RouterLink :to="menuItem.link" @click="() => {menuItem.name !== 'Home' && !shopStore.filters.category.includes(menuItem.name) && shopStore.filters.category.push(menuItem.name)}">{{ menuItem.name }}</RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center flex-row gap-4">
                    <div class="md:hidden">
                        <button class="border p-1 rounded" @click="isOpenMenu = !isOpenMenu">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <title>menu</title>
                                <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
                            </svg>
                            <span class="sr-only">Toggle header menu</span>
                        </button>
                    </div>
                    <button class="border p-1 rounded relative" @click="isOpenCartDrawer = true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <title>cart-outline</title>
                            <path
                                d="M17,18A2,2 0 0,1 19,20A2,2 0 0,1 17,22C15.89,22 15,21.1 15,20C15,18.89 15.89,18 17,18M1,2H4.27L5.21,4H20A1,1 0 0,1 21,5C21,5.17 20.95,5.34 20.88,5.5L17.3,11.97C16.96,12.58 16.3,13 15.55,13H8.1L7.2,14.63L7.17,14.75A0.25,0.25 0 0,0 7.42,15H19V17H7C5.89,17 5,16.1 5,15C5,14.65 5.09,14.32 5.24,14.04L6.6,11.59L3,4H1V2M7,18A2,2 0 0,1 9,20A2,2 0 0,1 7,22C5.89,22 5,21.1 5,20C5,18.89 5.89,18 7,18M16,11L18.78,6H6.14L8.5,11H16Z" />
                        </svg>
                        <span class="sr-only">User cart</span>
                        <span v-if="store.cart?.length > 0"
                            class="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {{ store.cart.length }}
                          </span>
                    </button>
                    <transition name="slide">
                        <div v-show="isOpenCartDrawer"
                            class="fixed  right-0 top-0 h-full w-full max-w-xl bg-white shadow-xl z-50 ">
                            <div class="flex justify-between items-center bg-gray-50  pb-2 p-4">
                                <h2 class="text-lg font-semibold">Cart</h2>
                                <button @click="isOpenCartDrawer = false" class="text-gray-500 hover:text-gray-800">
                                    ✖
                                </button>
                            </div>
                            <hr>
                            <cart/>
                        </div>
                    </transition>
                    <div v-if="isOpenCartDrawer" @click="isOpenCartDrawer = false"
                        class="fixed inset-0 bg-black bg-opacity-50 z-40">
                    </div>
                    <button type="button"
                        class="hover:bg-clip-text  border-solid border-2 border-black  font-bold px-5 py-2 rounded-full"
                        v-if="!isLoggedIn">
                        <RouterLink to="/login">Login</RouterLink>
                    </button>
                    <div v-else class="relative">
                        <button
                            class="m-1 mr-2 w-10 h-10 relative flex justify-center items-center rounded-full bg-black text-xl text-white uppercase cursor-pointer"
                            @click="isOptionsExpanded = !isOptionsExpanded" >
                            {{ avatarName() }}</button>
                        <transition enter-active-class="transform transition duration-500 ease-custom"
                            enter-class="-translate-y-1/2 scale-y-0 opacity-0"
                            enter-to-class="translate-y-0 scale-y-100 opacity-100"
                            leave-active-class="transform transition duration-300 ease-custom"
                            leave-class="translate-y-0 scale-y-100 opacity-100"
                            leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
                            <ul v-show="isOptionsExpanded"
                                class="absolute left-[-100px] right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden w-40">
                                <li class="px-3 py-2 transition-colors duration-300 ">
                                    <div class="font-semibold">
                                        {{ userStore.currentUser?.userName }}
                                    </div>
                                    <div class="text-gray-600 text-sm">
                                        {{ userStore.currentUser?.email }}
                                    </div>
                                </li>
                                <hr>
                                <li class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200">
                                    <RouterLink to="/account" class="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="me-2" width="20" height="20"
                                            viewBox="0 0 24 24">
                                            <title>account</title>
                                            <path
                                                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                                        </svg>
                                        Account
                                    </RouterLink>
                                </li>
                                <hr>
                                <li class="px-3 py-2 transition-colors duration-300 hover:bg-gray-200">
                                    <div class="flex items-center" @click="handleLogout()">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="me-2" width="20" height="20"
                                            viewBox="0 0 24 24">
                                            <title>logout</title>
                                            <path
                                                d="M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12M4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z" />
                                        </svg>
                                        Logout
                                    </div>
                                </li>
                            </ul>
                        </transition>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>
<style scoped>
.ease-custom {
    transition-timing-function: cubic-bezier(.61, -0.53, .43, 1.43);
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease-in-out;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>