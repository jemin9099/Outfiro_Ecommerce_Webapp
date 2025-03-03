<script setup>
import { ref , watch , onMounted } from 'vue';
import { useBrandStore } from '@/stores/brand';
const props = defineProps({
    initialBrand: Object
})
const store = useBrandStore()
const emit = defineEmits(['selectedId'])
const openMenu = ref(false)
const showSelectedBrandName = ref()
const selectedId = ref()

watch(() => props.initialBrand, () => {
    if (props.initialBrand) {
        showSelectedBrandName.value = props.initialBrand.name
        selectedId.value = props.initialBrand._id
    }
})
onMounted(() => {    
    store.getBrands(false)
})
</script>
<template>
    <label class="font-medium text-gray-800">Brand</label>
    <div class="relative">
        <div class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
            @click="openMenu = !openMenu">
            <span v-if="showSelectedBrandName">{{ showSelectedBrandName
                }}</span>
            <span class="text-gray-400" v-else>{{ 'Select Brand' }}</span>
        </div>
        <div class="w-full border rounded-md shadow-md bg-white p-2 mt-2 mb-3  z-50 top-10 absolute category-box"
            :class="openMenu ? 'show' : ''">
            <ul class="max-h-[200px] overflow-y-auto" v-if="store.brands">
                <li v-for="brand in store.brands" :key="brand._id"
                class="flex items-center justify-between p-1 cursor-pointer" :class="brand._id == selectedId ? 'bg-black/10 rounded-md' : ''"  @click="showSelectedBrandName = brand.name , selectedId = brand._id , emit('selectedId' ,brand._id)">
                <div class="flex items-center gap-3">
                    <div
                        class="w-[50px] h-[50px] cursor-pointer  overflow-hidden object-contain">
                        <img :src="brand.image" class="w-full h-full rounded-full object-contain" alt="">
                    </div>
                    {{ brand.name }}
                </div>
            </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.category-box {
    transition: all .2s ease;
    transform: translateY(-20px);
    opacity: 0;
    visibility: hidden;
}

.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
</style>