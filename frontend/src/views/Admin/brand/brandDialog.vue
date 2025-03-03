<script setup>
import { ref,watch } from 'vue'
import slugify from 'slugify'
import { useBrandStore } from '@/stores/brand';
const store = useBrandStore()
const dialog = ref(false)
const dialogTitle = ref('')
const updateId = ref()
const previewImg = ref()
const inputData = ref({
    name: '',
    slug: '',
    image: null,
    status: 1
})
const open = (item) => {
    dialog.value = true
    if (item) {
        dialogTitle.value = 'Edit Brand'
        updateId.value = item._id
        inputData.value = {
            name: item.name,
            slug: item.slug,
            status: item.status,
        }
        previewImg.value = item.image
    }
    else {
        dialogTitle.value = 'Add Brand'
    }
}
const onChange = (event) => {
    const target = event.target;
    const file = target.files?.[0];
    inputData.value.image = file

    const reader = new FileReader();
    reader.onload = () => {
        previewImg.value = reader.result;
    };
    reader.readAsDataURL(file);

}
watch(() => inputData.value.name, () => {
    const slug = slugify(inputData.value.name, { lower: true })
    inputData.value.slug = slug
})

const handleSubmit = () => {
    console.log(inputData.value);
    
    let data = new FormData()
    data.append('name', inputData.value.name)
    data.append('slug', inputData.value.slug)
    data.append('status', inputData.value.status)
    data.append('file', inputData.value.image)

    if (!updateId.value) {
        store.AddBrand(data).then((response) => {
            inputData.value = {
                name: '',
                slug: '',
                image: null,                
                status: [1]
            }
            previewImg.value = null
            dialog.value = false
        })
    }
    else{
        store.updateBrand(updateId.value,data).then((response) => {
            inputData.value = {
                name: '',
                slug: '',
                image: null,                
                status: [1]
            }
            previewImg.value = null
            dialog.value = false
        })
    }
}
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
                <div class="p-3">
                    <form @submit.prevent="handleSubmit()">
                        <label class="font-medium text-gray-800">Name</label>
                        <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                          v-model="inputData.name"  placeholder="Enter Brand Name" required />
                        <label class="font-medium text-gray-800">Slug</label>
                        <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                          v-model="inputData.slug"  placeholder="Enter Slug" required />
                        <label class="font-medium text-gray-800">Image</label>
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
                                <img :src="previewImg" class="w-[90px] h-[90px] m-auto" alt="">
                                <span class="p-1 bg-gray-200 rounded-lg absolute top-[-8px] right-[-8px] cursor-pointer"
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
                        <div class="flex items-center  w-full mb-5 mt-5">
                            <label :for="'status-' " class="inline-flex relative items-center cursor-pointer">
                                <div class="me-3 text-gray-800 font-medium">
                                    Status
                                </div>
                                <input type="checkbox" :true-value="1" :false-value="0" :id="'status-' "
                                  v-model="inputData.status" class="sr-only peer" 
                                  :value="1" />
                                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black transition-all"></div>
                                <span
                                  class="absolute left-[59px] top-0.5 w-5 h-5 bg-white rounded-full peer-checked:translate-x-5 transition-all"></span>
                              </label>
                        </div>
                        <div class="pt-3 text-right">
                            <button type="button"
                                class="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-700 mr-2"
                                @click="dialog = false"><i class="fas fa-times"></i> Cancel</button>
                            <button type="submit"
                                class="py-2 px-4 bg-black text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                                {{ dialogTitle === 'Edit Brand' ? 'Update' : 'Submit' }} </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
input:checked~.dot {
    transform: translateX(100%);
    background-color: black;
}
</style>