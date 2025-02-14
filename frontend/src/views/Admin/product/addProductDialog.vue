<script setup>
import { ref, defineExpose, defineEmits } from 'vue';
import axios from '@/axios'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const categoryData = ['Men', 'Women', 'Kids', 'Accessories', 'Footwear']
const brandData = ['Nike', 'Adidas', 'Puma', "Levi's", 'Zara', 'H&M']
const dialog = ref(false)
const previewImg = ref([])
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
        previewImg.value = [product.image]
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
        previewImg.value.push(reader.result);
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
    const { data, status } = await axios.put('/products/'+inputData.value._id, productData);

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
                                        <select class="w-full outline-none rounded bg-gray-100 p-3 mt-2 mb-3"
                                            v-model="inputData.category" required>
                                            <option v-for="(category, index) in categoryData" :key="index"
                                                :value="category">{{ category }}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="font-medium text-gray-800">Brand</label>
                                        <select class="w-full outline-none rounded bg-gray-100 p-3 mt-2 mb-3"
                                            v-model="inputData.brand" required>
                                            <option v-for="(brand, index) in brandData" :key="index" :value="brand">
                                                {{ brand }}</option>
                                        </select>
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
                                <div>
                                    <label class="font-medium text-gray-800">Upload Image</label>
                                    <div class="border border-dashed border-gray-500 relative">
                                        <input type="file" accept="image/*"
                                            class="cursor-pointer relative block opacity-0 w-full h-full p-20 z-50"
                                            @change="onChange" :required="isUpdate ? false : true">
                                        <div class="text-center p-10 absolute top-0 right-0 left-0 m-auto"
                                            v-if="!previewImg.length">
                                            <h4>
                                                Drop files anywhere to upload
                                                <br />or
                                            </h4>
                                            <p class="">Select Files</p>
                                        </div>
                                        <div v-else
                                            class="text-center p-10 absolute top-0 right-0 left-0 m-auto grid grid-cols-8 gap-4">
                                            <div v-for="(img, index) in previewImg" :key="index">
                                                <img :src="img" class="shadow-lg" alt="">
                                            </div>
                                        </div>
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
<style scoped></style>