<script setup>
import VueSimpleRangeSlider from "vue-simple-range-slider";
import "vue-simple-range-slider/css";
import { useShopStore } from '@/stores/shop'
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute()
const store = useShopStore()
// const range = ref([10 , 100])

const isChecked = (key , value) => {
    if(store.filters[key].includes(value)){
        return true
    }
}
</script>
<template>
    <div class="rounded-lg shadow-md bg-white">
        <div class="p-4 border-b flex items-center justify-between">
            <h2 class="text-lg font-semibold">Filters</h2>
            <slot />
        </div>
        <div class="p-4 space-y-4">
            <template v-for="(values, key) in store.filterOption">
                <h3 class="text-base font-bold">{{ key }}</h3>
                <div class="grid gap-2 mt-2">
                    <div class="flex items-center space-x-3 py-2" v-for="(item, index) in values" :key="index">
                        <input type="checkbox" class="border-gray-300 rounded h-5 w-5" :id="item"
                            @change="store.handleFilter(key, item)" :checked="isChecked(key , item)" />
                        <label :for="item">{{ item }}</label>
                    </div>
                </div>
                <hr>
            </template>
            <!-- <h3 class="text-base font-bold">Price</h3>
            <VueSimpleRangeSlider style="width: 250px" :min="0" :max="100"  v-model="store.range">
            </VueSimpleRangeSlider> -->
        </div>
    </div>
</template>
<style scoped></style>