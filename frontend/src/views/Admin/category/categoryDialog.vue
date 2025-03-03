<script setup>
import { ref, watch } from 'vue';
import slugify from 'slugify'
import { useCategoryStore } from '@/stores/category';
import CategoryMenu from '@/components/categoryMenu.vue';
import { onMounted } from 'vue';
const store = useCategoryStore()
const openCategoryMenu = ref(false)
const showSelectedCategoryName = ref()
const previewImg = ref()
const updateId = ref()
const initialCategory = ref()
const title = ref('Create Category')
const inputData = ref({
    name: '',
    slug: '',
    image: null,
    description: '',
    parent_id: null,
    status: [1]
})
const open = (item) => {
    if (item) {
        title.value = 'Edit Category'
        updateId.value = item._id
        inputData.value = {
            name: item.name,
            slug: item.slug,
            description: item.description,
            parent_id: item.parent_id,
            status: [item.status],
        }
        previewImg.value = item.image
        const findParentCategory = (category) => {
            if (category._id === item.parent_id) {
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
        showSelectedCategoryName.value = initialCategory.value.name
    }
    else {

        title.value = 'Create Category'
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

    let data = new FormData()
    data.append('name', inputData.value.name)
    data.append('slug', inputData.value.slug)
    data.append('description', inputData.value.description)
    data.append('parent_id', inputData.value.parent_id)
    data.append('status', inputData.value.status.length > 0 ? inputData.value.status[0] : 0)
    data.append('file', inputData.value.image)

    if (!updateId.value) {
        store.addCategory(data).then((response) => {
            inputData.value = {
                name: '',
                slug: '',
                image: null,
                description: '',
                parent_id: null,
                status: [1]
            }
            previewImg.value = null

        })
    }
    else {
        store.updateCategory(updateId.value, data).then((response) => {
            inputData.value = {
                name: '',
                slug: '',
                image: null,
                description: '',
                parent_id: null,
                status: [1]
            }
            title.value = 'Create Category'
            previewImg.value = null
        })
    }
}
defineExpose({ open })
</script>
<template>
    <div id="categoryModel">
        <div class="font-semibold text-2xl  p-3">
            {{ title }}
        </div>
        <hr>
        <div class="p-5 pb-2">
            <form @submit.prevent="handleSubmit()">
                <label class="font-medium text-gray-800">Name</label>
                <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    v-model="inputData.name" placeholder="Enter Category Name" required />
                <label class="font-medium text-gray-800">Slug</label>
                <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    v-model="inputData.slug" placeholder="Enter Slug" required />
                <label class="font-medium text-gray-800">Description</label>
                <textarea type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                    v-model="inputData.description" placeholder="Enter Description here" required />
                <label class="font-medium text-gray-800">Perent Category</label>
                <div class="relative">
                    <div class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                        @click="openCategoryMenu = !openCategoryMenu">
                        <span v-if="showSelectedCategoryName">{{ showSelectedCategoryName }}</span>
                        <span class="text-gray-400" v-else>{{ 'Select Category' }}</span>
                    </div>
                    <div class="w-full border rounded-md shadow-md bg-white p-2 mt-2 mb-3  z-10 top-10 absolute category-box"
                        :class="openCategoryMenu ? 'show' : ''">
                        <CategoryMenu @selected-id="(value) => { inputData.parent_id = value }"
                            @currentCategory="showSelectedCategoryName = $event.name" :initialId="initialCategory" />
                    </div>
                </div>
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
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 fill-black " viewBox="0 0 24 24">
                                <title>window-close</title>
                                <path
                                    d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="flex items-center  w-full mb-5 mt-5">
                    <label for="toogleA" class="flex items-center cursor-pointer">
                        <!-- label -->
                        <div class="me-3 text-gray-800 font-medium">
                            Status
                        </div>
                        <!-- toggle -->
                        <div class="relative">
                            <!-- input -->
                            <input id="toogleA" type="checkbox" v-model="inputData.status" :value="1" class="sr-only" />
                            <!-- line -->
                            <div class="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                            <!-- dot -->
                            <div class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition">
                            </div>
                        </div>
                    </label>
                </div>
                <div class="pt-3 text-right">
                    <button type="submit"
                        class="py-2 px-4 bg-black text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                        {{ title === 'Edit Category' ? 'Update' : 'Submit' }} </button>
                </div>
            </form>
        </div>
    </div>
</template>
<style scoped>
input:checked~.dot {
    transform: translateX(100%);
    background-color: black;
}

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