  <script setup>
  import { ref, onMounted } from 'vue';
  import addProductDialog from './addProductDialog.vue';
  import deleteProductDialog from './deleteProductDialog.vue';
  import axios from '@/axios'

  const allProduct = ref()
  const addProduct = ref()
  const deleteProduct = ref()
  const fetchProducts = async () => {
    const { data, status } = await axios.get('/products/all')

    if (status === 200) {
      console.log(data);
      
      allProduct.value = data.data
    }
  }

  onMounted(() => {
    fetchProducts()
  })
  </script>
  <template>
    <deleteProductDialog ref="deleteProduct" @refresh="fetchProducts()" />
    <addProductDialog ref="addProduct"  @refresh="fetchProducts()"/>
    <div class="bg-white p-3 m-3 shadow-md rounded-md">
      <div class="mb-5 flex justify-end">
        <button class="bg-black text-white px-3 py-2 rounded-md" @click="addProduct.open()">
          Add New Product
        </button>
      </div>
      <section
        class="w-full mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        <div class="w-full bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" v-for="(item , index) in allProduct" :key="index">
          <a href="#">
            <img
              :src="item.image"
              alt="Product" class="h-80 w-full object-cover rounded-t-xl" />
            <div class="px-4 py-3 w-full">
              <span class="text-gray-400 mr-3 uppercase text-xs">{{item.brand}}</span>
              <p class="text-lg font-bold text-black truncate block capitalize">{{item.title}}</p>
              <div class="flex items-center">
                <p class="text-lg font-semibold text-black cursor-auto my-3">₹ {{item.salling_price}}</p>
                <del>
                  <p class="text-sm text-gray-600 cursor-auto ml-2">₹ {{item.price}}</p>
                </del>
              </div>
              <div class="flex gap-4">
                <button class="border border-black w-full rounded py-1 flex items-center justify-center" @click="addProduct.open(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="me-1" width="16" viewBox="0 0 24 24"><title>pencil</title><path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" /></svg>
                  Edit
                </button>
                <button class="border border-red-500 text-red-500  w-full rounded py-1 flex items-center justify-center" @click="deleteProduct.open(item)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="me-1" width="16"  viewBox="0 0 24 24"><title>trash-can-outline</title><path  fill="red" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>
                  Delete
                </button>
              </div>
            </div>
          </a>
        </div>
      </section>
    </div>
  </template>
  <style lang="scss" scoped></style>