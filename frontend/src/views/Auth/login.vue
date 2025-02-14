<script setup>
import { ref  } from 'vue';
import axios from '@/axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useRouter } from 'vue-router';
const router = useRouter()
const inputData = ref({
    email:'',
    password:''
})

const handleRegister = async() => {
    try{
        const {data , status } = await axios.post('/auth/login' , inputData.value)
    
    if(status === 200) {
        toast("User Login successfully", {
        autoClose: 1000,
        type:'success'
      });
      localStorage.setItem('userData' , JSON.stringify(data.data))
      localStorage.setItem('token' , data.token)
      if(data.data.role === 'admin'){
        router.push('/admin/dashboard')
      }
      else{
       router.push('/')
      }
    }   
    else{
        toast("Error While User Loging", {
        autoClose: 1000,
        type:'error'
      });
    }
    }
    catch (error) {
        toast(error, {
        autoClose: 1000,
        type:'error'
      });
    }
}
</script>
<template>
    <div class="flex">
        <div class="bg-black text-white w-1/2 h-[100vh] items-center justify-center hidden md:flex">
            <div>
                <h1 class="text-4xl font-extrabold ">Welcome To OutFiro Shopping Site</h1>
                <p class="mt-2 text-xl text-center">Shop Smart, Live Better – Your One-Stop Online Store!</p>
            </div>
        </div>
        <div class=" md:w-1/2 h-[100vh] w-full flex items-center justify-center">
            <div class="w-4/5 ">
                <h1 class="text-4xl text-center font-extrabold">
                    Sign in to your account
                </h1>
                <p class="text-center text-lg mt-3">Don't have an account <RouterLink to="/register" class="ms-1 font-semibold underline">Register</RouterLink></p>
                <form @submit.prevent="handleRegister">
                    <div class="mb-4  mt-4 flex">
                        <div class="w-full mr-1">
                            <label class="block text-grey-darker text-sm font-bold mb-2" for="email">Email</label>
                            <input class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker" id="email" type="email" v-model="inputData.email" placeholder="Enter your email" required>
                        </div>
                    </div>
                    <div class="mb-4  mt-4 flex">
                        <div class="w-full mr-1">
                            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">Password</label>
                            <input class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-grey-darker" id="password" type="text" v-model="inputData.password" placeholder="Enter your Password" required>
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="bg-black font-semibold text-white w-full mt-3 rounded-lg hover:bg-white hover:text-black hover:border border-black py-2">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>

</style>