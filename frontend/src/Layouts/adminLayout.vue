<script setup >
import Sidebar from '@/Layouts/components/admin/sidebar/index.vue'
import Header from '@/Layouts/components/admin/header/index.vue'
import {useSidebarStore} from '@/stores/sidebar'
import {useUserDetailStore} from '@/stores/userDetail'

const userStore = useUserDetailStore()
const store = useSidebarStore()


userStore.fetchCurrentUser()
</script>
<template>
   <div class="container-box">
    <!-- Sidebar -->
    <div class="sidebar" :class="store.isOpen?'open':''" id="sidebar">
        <!-- Sidebar content here -->
        <Sidebar/>
    </div>

    <!-- Main content container -->
    <div class="main-content">
        <!-- Navbar -->
        <div class="navbar bg-white/30 backdrop-blur-xl">
            <!-- Navbar content here -->
            <Header :user="userStore.currentUser"/>            
        </div>
        
        <!-- Main section with scrollable content -->
        <div class="main-section">
            <slot/>
        </div>
    </div>
</div>
</template>

<style scoped>

</style>