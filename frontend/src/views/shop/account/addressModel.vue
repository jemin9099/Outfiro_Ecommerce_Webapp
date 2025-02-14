<script setup>
import { ref } from "vue";
import { useAddressStore } from "@/stores/address";
const store = useAddressStore()
const dialog = ref(false);
const isUpdate = ref(false)
const inputData = ref({
    address: '',
    city: '',
    phone: '',
    pincode: '',
    notes: ''
})
const open = (item) => {
    dialog.value = true;

    if (item) {
        Object.keys(item)?.forEach((key) => {
            inputData.value[key] = item[key]
        })
        isUpdate.value = true
    }
    else {
        isUpdate.value = false
    }
};

const handleSubmit = () => {
    if (isUpdate.value) {
        store.updateAddress(inputData.value).then((response) => {
            dialog.value = response
        })
    }
    else {
        if (store.address.length < 3) {
            store.addAddress(inputData.value).then((response) => {
                dialog.value = response
            })
        }
        else {
            store.toast('You can add max 3 address',{
                autoClose: 1000,
                type: 'error'
            })
        }
    }

}
defineExpose({ open });
</script>
<template>
    <div class="fixed z-50 overflow-y-auto top-0 h-full w-full left-0" :class="dialog ? '' : 'hidden'" id="modal">
        <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-950/30 backdrop-blur-sm" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full p-3"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="flex items-center justify-center mb-3">
                    <h2 class="text-2xl font-semibold">{{ isUpdate ? 'Update Address' : 'Add Address' }}</h2>
                </div>
                <hr>
                <div class="p-3">
                    <form @submit.prevent="handleSubmit">
                        <label class="font-medium text-gray-800">Address :</label>
                        <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                            placeholder="Enter Address here" v-model="inputData.address" required />
                        <div class="grid grid-cols-3 gap-5">
                            <div>
                                <label class="font-medium text-gray-800">City :</label>
                                <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                                    placeholder="Enter City here" v-model="inputData.city" required />
                            </div>
                            <div>
                                <label class="font-medium text-gray-800">Pincode :</label>
                                <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                                    placeholder="Enter Pincode here" v-model="inputData.pincode" required />
                            </div>
                            <div>
                                <label class="font-medium text-gray-800">Phone :</label>
                                <input type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                                    placeholder="Enter Phone here" v-model="inputData.phone" required />
                            </div>
                        </div>
                        <label class="font-medium text-gray-800">Notes</label>
                        <textarea type="text" class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
                            placeholder="Enter Notes here" v-model="inputData.notes" required />
                        <div class=" px-4 py-3 text-right">
                            <button type="button"
                                class="py-2 px-4 bg-gray-400 text-white rounded hover:bg-gray-700 mr-2"
                                @click="dialog = false"><i class="fas fa-times"></i> Cancel</button>
                            <button type="submit"
                                class="py-2 px-4 bg-black text-white rounded font-medium hover:bg-blue-700 mr-2 transition duration-500">
                                {{ isUpdate ? 'Update' : 'Submit' }} </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>