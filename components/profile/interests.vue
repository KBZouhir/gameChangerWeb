<script setup>
// import { apiGetInterests } from "~/composables/store/useInterests";
// import { useInterestsStore } from "~/stores/interests";
import { apiGetBusinessSectors } from "~/composables/store/useBusinessSectors";

import { useAuthStore } from '~/stores/authStore'

const intrestBusinessSectorStore = useBusinessSectorsStore();
const authStore = useAuthStore()
const user = computed(()=>authStore.getAuthUser)

console.log(user.value);

// const intrestStore = useInterestsStore();
// const interests = computed(() => intrestStore.getInterests);.

const businessSectors = computed(() => intrestBusinessSectorStore.getBusinessSectors);


const formData = reactive({
  interests: user.value?.interests,
});

const getDataFromApi = async () => {
    await apiGetBusinessSectors();
};

watchEffect(() => {
    getDataFromApi();
});

const submitForm = () =>{
    formData.value.forEach((element) => {
        let profile = element.can_disscuss
        console.log(profile);
    })
}

</script>

<template>
    <div class="flex flex-wrap gap-4 py-8 overflow-auto">
        <template v-for="interest in businessSectors">
            <CustomCheckbox :label="interest.name" v-model="formData.interests" :value="interest" />
        </template>
    </div>
    <div class="flex justify-end">
        <UButton type="submit" class="px-4 py-2" @click="submitForm">
            Save changes
        </UButton>
    </div>
</template>