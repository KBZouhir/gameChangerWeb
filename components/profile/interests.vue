<script setup>
import { apiGetInterests } from "~/composables/store/useInterests";
import { useInterestsStore } from "~/stores/interests";
import { useAuthStore } from '~/stores/authStore'
const authStore = useAuthStore()
const user = computed(()=>authStore.getAuthUser)


const intrestStore = useInterestsStore();
const interests = computed(() => intrestStore.getInterests);

const formData = reactive({
  interests: user.value?.interests,
});

const getDataFromApi = async () => {
    await apiGetInterests();
};

watchEffect(() => {
    getDataFromApi();
});

</script>

<template>
    <div class="flex flex-wrap gap-4 py-8 overflow-auto">
        <template v-for="interest in interests">
            <CustomCheckbox :label="interest.name" v-model="formData.interests" :value="interest" />
        </template>
    </div>
    <div class="flex justify-end">
        <UButton type="submit" class="px-4 py-2">
            Save changes
        </UButton>
    </div>
</template>