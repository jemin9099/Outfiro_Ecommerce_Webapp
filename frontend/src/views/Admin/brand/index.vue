<script setup>
import { ref, onMounted ,watch} from 'vue';
import BrandDialog from './brandDialog.vue';
import { useBrandStore } from '@/stores/brand';
import { useShopStore } from '@/stores/shop';
import moment from 'moment';
import Pagination from '@/components/pagination.vue';
const store = useBrandStore()
const shopStore = useShopStore()
const createOrUpdateBrand = ref()

const updateStatus = (id, status) => {
  store.updateStatus(id, status)
}
watch(shopStore.pagination, () => {
    store.getBrands()
  })
onMounted(() => {
  store.getBrands()
})
</script>
<template>
  <BrandDialog ref="createOrUpdateBrand" />
  <div class="p-3 mt-5 bg-whiite rounded-md shadow">
    <div class="flex p-2 items-center justify-between">
      <h1 class="text-xl font-semibold ">Brands</h1>
      <button class="bg-black text-white font-semibold px-3 py-2 rounded-md flex items-center gap-1"
        @click="createOrUpdateBrand.open()">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <title>plus</title>
          <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
        Add Brand
      </button>
    </div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div class="inline-block min-w-full shadow-sm rounded-lg overflow-hidden">
        <table class="min-w-full leading-normal">
          <thead>
            <tr>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Image
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created At
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th
                class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                <span class="">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in store.brands" :key="index">
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ item.name }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <img :src="item.image" class="w-10 h-10 rounded object-cover" alt="">
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p class="text-gray-900 whitespace-no-wrap">{{ moment(item.createdAt).format('MMM Do YY') }}</p>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <label :for="'status-' + item._id" class="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" :true-value="1" :false-value="0" :id="'status-' + item._id"
                    v-model="item.status" class="sr-only peer" @change="updateStatus(item._id, item.status)"
                    :value="1" />
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black transition-all"></div>
                  <span
                    class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-all"></span>
                </label>
              </td>
              <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm ">
                <div class="gap-3 flex">
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="ms-2  transition-all duration-300 ease-in fill-black w-5 h-5" viewBox="0 0 24 24"
                    @click="createOrUpdateBrand.open(item)">
                    <title>pencil</title>
                    <path
                      d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    class="ms-2  transition-all duration-300 ease-in  fill-red-500 w-5 h-5" viewBox="0 0 24 24"
                    @click="store.deleteBrand(item._id)">
                    <title>delete</title>
                    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                  </svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Pagination/>
    </div>
  </div>
</template>
<style scoped>
input:checked~.dot {
  transform: translateX(100%);
  background-color: black;
}
</style>