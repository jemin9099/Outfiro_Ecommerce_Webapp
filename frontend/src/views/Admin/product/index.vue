  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import addProductDialog from './addProductDialog.vue';
  import deleteProductDialog from './deleteProductDialog.vue';
  import { useShopStore } from '@/stores/shop'
  import Pagination from '@/components/pagination.vue';
  const store = useShopStore()
  const addProduct = ref()
  const deleteProduct = ref()
  watch(store.pagination, () => {
    store.fetchProducts()
  })
  onMounted(() => {
    store.fetchProducts()
  })
</script>
  <template>
    <deleteProductDialog ref="deleteProduct" @refresh="store.fetchProducts()" />
    <addProductDialog ref="addProduct" @refresh="store.fetchProducts()" />
    <div class="bg-white p-3 m-3 shadow-md rounded-md">
      <div class="mb-5 flex gap-2 justify-between items-center">
        <div>
          <h1 class="text-xl  font-bold">All Products</h1>
        </div>
        <div class="flex gap-2">
          <button
            class="border border-black text-black font-semibold px-3 hover:bg-black/10 py-2 flex items-center gap-1 rounded-md"
            @click="store.exportProducts()">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-black" viewBox="0 0 24 24">
              <title>tray-arrow-down</title>
              <path
                d="M2 12H4V17H20V12H22V17C22 18.11 21.11 19 20 19H4C2.9 19 2 18.11 2 17V12M12 15L17.55 9.54L16.13 8.13L13 11.25V2H11V11.25L7.88 8.13L6.46 9.55L12 15Z" />
            </svg>
            Export as Excel
          </button>
          <button class="bg-black text-white font-semibold px-3 py-2 rounded-md flex items-center gap-1"
            @click="addProduct.open()">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <title>plus</title>
              <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg> Add Product
          </button>
        </div>
      </div>
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div class="inline-block min-w-full shadow-sm rounded-lg overflow-hidden">
          <table class="min-w-full leading-normal">
            <thead>
              <tr>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Title
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Image
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Brand
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Selling Price
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stock
                </th>
                <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in store.products" :key="index">
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">{{ item.title }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <img :src="item.image" class="w-10 h-10 rounded object-contain" alt="">
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">{{ item.brand.name }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">{{ item.category.name }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">$ {{ item.price }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">$ {{ item.salling_price }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <p class="text-gray-900 whitespace-no-wrap">{{ item.stock }}</p>
                </td>
                <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <div class="flex items-center">
                    <button class="text-indigo-600 hover:text-indigo-900 mr-4"> <svg xmlns="http://www.w3.org/2000/svg"
                        class=" transition-all duration-300 ease-in fill-indigo-600 hover:fill-indigo-900 w-5 h-5"
                        viewBox="0 0 24 24" @click="addProduct.open(item)">
                        <title>pencil</title>
                        <path
                          d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                    </button>
                    <button class="text-red-600 hover:text-red-900"><svg xmlns="http://www.w3.org/2000/svg"
                        class="ms-2  transition-all duration-300 ease-in  fill-red-500 hover:fill-red-900 w-5 h-5"
                        viewBox="0 0 24 24">
                        <title>delete</title>
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Pagination v-if="store.products?.length > 0" />
    </div>
  </template>
<style scoped></style>