<script setup>
// import { apiGetInterests } from "~/composables/store/useInterests";
// import { useInterestsStore } from "~/stores/interests";
import { apiGetBusinessSectors } from "~/composables/store/useBusinessSectors";
import { updateInterests } from "~/composables/store/useProfile";

import { useAuthStore } from '~/stores/authStore'

const intrestBusinessSectorStore = useBusinessSectorsStore();
const authStore = useAuthStore()
const user = computed(() => authStore.getAuthUser)

const loading = ref(false)

// const intrestStore = useInterestsStore();
// const interests = computed(() => intrestStore.getInterests);.

const businessSectors = computed(() => intrestBusinessSectorStore.getBusinessSectors);

const snackbar = useSnackbar();


const formData = reactive({
    interests: user.value?.interests,
})

const getDataFromApi = async () => {
    await apiGetBusinessSectors();
}

watchEffect(() => {
    getDataFromApi();
})

const submitForm = async () => {
    loading.value = true;
    let data = {
        interests: formData.interests.map(interest => interest.id)
    }
    const result = await updateInterests(data);
    loading.value = false;

    console.log(result.success);
    

    if (result.success) {
        snackbar.add({
            type: 'success',
            text: 'Interests updated successfully',
        })
    } else {
        snackbar.add({
            type: 'error',
            text: 'Failed to update interests'
        })
    }


}

</script>

<template>
    <div class="flex flex-wrap gap-4 py-8 overflow-auto">
        <template v-for="interest in businessSectors">
            <CustomCheckbox :label="interest.name" v-model="formData.interests" :value="interest" />
        </template>
    </div>
    <div class="flex justify-end">
        <UButton type="submit" :loading="loading" color="green" class="px-4 py-2" @click="submitForm">
            Save changes
        </UButton>
    </div>
</template>