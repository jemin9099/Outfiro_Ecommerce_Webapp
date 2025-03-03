<script setup>
import { ref, defineExpose, defineEmits, onMounted } from 'vue';
import axios from '@/axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useCategoryStore } from '@/stores/category';
import CategoryMenu from '@/components/categoryMenu.vue';
import BrandMenu from '@/components/brandMenu.vue';
const store = useCategoryStore()
const openCategoryMenu = ref(false)
const showSelectedCategoryName = ref()
const initialCategory = ref()
const dialog = ref(false)
const previewImg = ref()
const selectedImg = ref()
const dialogTitle = ref()
const isUpdate = ref(false)
const inputData = ref({
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salling_price: '',
    stock: ''
})

const emit = defineEmits(['refresh'])
const open = (product) => {
    dialog.value = true
    if (product) {
        isUpdate.value = true
        dialogTitle.value = 'Edit product'
        Object.keys(product).forEach((key) => {
            inputData.value[key] = product[key]
        })
        const findParentCategory = (category) => {             
            if (category._id === product.category._id) {
                initialCategory.value = category                
            }
            else {
                if (category.subCategory.length > 0) {
                    return category.subCategory.find((sub) => {
                        return findParentCategory(sub)
                    })
                }
            }
        }
        store.categories.find((category) => {
            return findParentCategory(category)
        })
        previewImg.value = product.image
    }
    else {
        isUpdate.value = false
        dialogTitle.value = 'Add product'
    }
}

const onChange = (event) => {
    const target = event.target;
    const file = target.files?.[0];
    selectedImg.value = file

    const reader = new FileReader();
    reader.onload = () => {
        previewImg.value = reader.result;
    };
    reader.readAsDataURL(file);

}

const handleSubmit = async () => {
    const productData = new FormData();
    productData.append('title', inputData.value.title);
    productData.append('description', inputData.value.description);
    productData.append('category', inputData.value.category);
    productData.append('brand', inputData.value.brand);
    productData.append('price', inputData.value.price);
    productData.append('salling_price', inputData.value.salling_price);
    productData.append('stock', inputData.value.stock);
    productData.append('file', selectedImg.value);
    

    if (isUpdate.value) {
        const { data, status } = await axios.put('/products/' + inputData.value._id, productData);

        if (status === 200) {
            toast("Product Updated successfully", {
                autoClose: 1000,
                type: 'success'
            });
            dialog.value = false;
            inputData.value = {
                title: '',
                description: '',
                category: '',
                brand: '',
                price: '',
                sallingPrice: '',
                stock: '',
                file: '',
            };
            previewImg.value = [];
            emit('refresh')
        }
        else {
            toast("Error While Product Updateing", {
                autoClose: 1000,
                type: 'error'
            });
        }
    }
    else {
        const { data, status } = await axios.post('/products/add', productData);

        if (status === 201) {
            toast("Product Added successfully", {
                autoClose: 1000,
                type: 'success'
            });
            dialog.value = false;
            inputData.value = {
                title: '',
                description: '',
                category: '',
                brand: '',
                price: '',
                sallingPrice: '',
                stock: '',
                file: '',
            };
            previewImg.value = [];
            emit('refresh')
        }
        else {
            toast("Error While Product Creating", {
                autoClose: 1000,
                type: 'error'
            });
        }
    }
};
defineExpose({ open })
onMounted(() => {
    store.getCategories()
})
</script>
<template>
    <div class="fixed z-10 overflow-y-auto top-0 h-full w-full left-0 " :class="dialog ? '' : 'hidden'" id="modal">
        <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-950/30 backdrop-blur-sm" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="font-semibold text-2xl text-center p-3">
                    {{ dialogTitle }}
                </div>
                <hr>
                <form @submit.prevent="handleSubmit()">
                    <div class="">
                        <div class="grid grid-cols-3">
                            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-2 col-span-3">
                                <label class="font-medium text-gray-800">Name</label>
                                <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                                    v-model="inputData.title" placeholder="Enter Product Name" required />
                                <label class="font-medium text-gray-800">Description</label>
                                <textarea type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                                    v-model="inputData.description" placeholder="Enter Description here" required />
                                <div class="grid grid-cols-2 gap-4">
                                    <div>
                                        <label class="font-medium text-gray-800">Category</label>
                                        <div class="relative">
                                            <div class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                                                @click="openCategoryMenu = !openCategoryMenu">
                                                <span v-if="showSelectedCategoryName">{{ showSelectedCategoryName
                                                    }}</span>
                                                <span class="text-gray-400" v-else>{{ 'Select Category' }}</span>
                                            </div>
                                            <div class="w-full border rounded-md shadow-md bg-white p-2 mt-2 mb-3  z-10 top-10 absolute category-box"
                                                :class="openCategoryMenu ? 'show' : ''">
                                                <CategoryMenu @selected-id="(value) => { inputData.category = value }"
                                                    @currentCategory="showSelectedCategoryName = $event.name"
                                                    :initialId="initialCategory" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <BrandMenu @selected-id="(value) => { inputData.brand = value }" :initialBrand="inputData.brand" />
                                    </div>
                                </div>
                                <div class="grid grid-cols-3 gap-4">
                                    <div>
                                        <label class="font-medium text-gray-800">Price</label>
                                        <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                                            v-model="inputData.price" placeholder="Enter Price" required />
                                    </div>
                                    <div>
                                        <label class="font-medium text-gray-800">Sale Price</label>
                                        <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                                            v-model="inputData.salling_price" placeholder="Enter Sale Price" required />
                                    </div>
                                    <div>
                                        <label class="font-medium text-gray-800">Total Stock</label>
                                        <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                                            v-model="inputData.stock" placeholder="Enter Stock" required />
                                    </div>
                                </div>
                                <label class="font-medium text-gray-800">Upload Image</label>
                                <div class="flex gap-3">
                                    <div
                                        class="w-24 bg-gray-100 h-24 mt-2 mb-5 rounded-xl border border-gray-200 flex items-center relative">
                                        <input type="file" class="opacity-0 w-full z-10 h-full" @change="onChange"
                                            :required="updateId ? false : true">
                                        <svg class="fill-gray-500 w-6 absolute left-[34px] z-0 right-0"
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <title>plus</title>
                                            <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                                        </svg>
                                    </div>
                                    <div class="w-24 bg-gray-100 h-24 mt-2 mb-5 rounded-xl border border-gray-200 flex items-center relative"
                                        v-if="previewImg">
                                        <img :src="previewImg" class="w-[90px] h-[90px] object-contain m-auto" alt="">
                                        <span
                                            class="p-1 bg-gray-200 rounded-lg absolute top-[-8px] right-[-8px] cursor-pointer"
                                            @click="previewImg = null">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 fill-black "
                                                viewBox="0 0 24 24">
                                                <title>window-close</title>
                                                <path
                                                    d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-gray-200 px-4 py-3 text-right">
                        <button type="button" class="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-700 mr-2"
                            @click="dialog = false"><i class="fas fa-times"></i> Cancel</button>
                        <button type="submit"
                            class="py-2 px-4 bg-black text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                            {{ isUpdate ? 'Update' : 'Submit' }} </button>
                    </div>
                </form>
            </div>
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