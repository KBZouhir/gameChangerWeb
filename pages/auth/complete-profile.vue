<template>
  <div class="relative w-full">
    <div class="mx-auto max-w-s max-w-screen-xl h-full ">
      <div class="flex  justify-center items-center col-span-5 lg:col-span-4 ">
        <div class="h-full flex flex-col w-full px-4 sm:px-6 lg:px-2 py-8">
          <h1 class="text-3xl font-bold">Complete profile</h1>

          <SteperProgress :steps="steps" v-model="activeStep" class="mb-16 mt-8" />

          <div v-show="activeStep == 0" class="flex-1 overflow-hidden">
            <h1 class="text-2xl font-bold">Select your Interests</h1>
            <p class="text-[#989394]">
              Select a few of your interest to match with users who have similar things in
              common.
            </p>
            <div class="h-full">
              <div class="flex flex-wrap gap-4 py-8 overflow-auto">
                <template v-for="interest in businessSectors">
                  <CustomCheckbox :label="interest.translated_name" v-model="formData.interests" :value="interest" />
                </template>
              </div>
            </div>
          </div>

          <div v-show="activeStep == 1" class="flex-1 flex flex-col overflow-hidden">
            <h1 class="text-2xl font-bold">Select your working domain</h1>
            <p class="text-[#989394] mb-6">
              Select a few of your working domain to match with users who have similar
              things in common.
            </p>
            <div class="min-h-[400px]">
              <SelectDomain v-model="formData.domains" />
            </div>
          </div>

          <div v-show="activeStep == 2" class="flex-1 overflow-auto">
            <h1 class="text-2xl font-bold">Enter your address</h1>
            <p class="text-[#989394]">
              Select a few of your address to match with users who have similar things in
              common.
            </p>

            <div class="pace-x-4 my-8">
              <Map v-model="formData.address" :is-open-map="true" />

              <UForm ref="form" div class="space-y-4 p-1 pt-4 ">
                <UFormGroup label="Address" name="address.address">
                  <UInput size="lg" placeholder="Address" v-model="formData.address.address" />
                </UFormGroup>

                <div class="grid grid-cols-2 gap-4">
                  <UFormGroup label="City" name="address.city">
                    <UInput size="lg" placeholder="City" v-model="formData.address.city" />
                  </UFormGroup>

                  <UFormGroup label="Country" name="address.country">
                    <UInput size="lg" placeholder="Country" v-model="formData.address.country" />
                  </UFormGroup>
                </div>

                <UFormGroup label="Zip code" name="address.zip_code">
                  <UInput size="lg" placeholder="Zip code" v-model="formData.address.zip_code" />
                </UFormGroup>

                <UFormGroup label="Lat" name="lat" class="hidden">
                  <UInput size="lg" v-model="formData.address.lat" />
                </UFormGroup>

                <UFormGroup label="Lon" name="lon" class="hidden">
                  <UInput size="lg" v-model="formData.address.lon" />
                </UFormGroup>
              </UForm>
            </div>
          </div>

          <div class="flex justify-between space-x-4 my-8">
            <UButton variant="link" @click="activeStep--" :disabled="activeStep <= 0"
              class="px-6 py-3 text-[#0F1454] dark:disabled:text-emerald-300 dark:text-emerald-400 dark:hover:text-emerald-500 hover:no-underline">
              Previous
            </UButton>
            <UButton color="green" @click="activeStep++" v-if="activeStep + 1 != steps" :disabled="!allowNext"
              class="px-10 py-3 ">
              Next
            </UButton>

            <UButton :loading="isLoading" color="green" @click="submitForm" v-if="activeStep >= steps - 1"
              class="px-6 py-3 ">
              Finish
            </UButton>
          </div>
        </div>
        <Loading v-model="isLoading" />

      </div>
      <!-- <div class=" col-span-2  h-full flex-1 hidden lg:flex justify-center items-center ">
        <img class="absolute hidden right-0 top-0" width="80%" :src="greenBlurEffect" alt="">

        <ClientOnly>
          <img :src="$colorMode.value == 'dark' ? completeProfileImageWhite : completeProfileImage"
            v-if="activeStep == 0" draggable="false" width="50%">
          <img :src="$colorMode.value == 'dark' ? intelligenceImageWhite : intelligenceImage" v-if="activeStep == 1"
            draggable="false" width="50%">
          <img :src="$colorMode.value == 'dark' ? mapImageWhite : mapImage" v-if="activeStep == 2" draggable="false"
            width="50%">
        </ClientOnly>

      </div> -->
    </div>
  </div>
</template>

<script setup>
import { apiGetInterests } from "~/composables/store/useInterests"
import { apiGetDomains, apiGetDomainBySector } from "~/composables/store/useDomains"
import { apiGetBusinessSectors } from "~/composables/store/useBusinessSectors"
import { completeProfile } from "~/composables/store/useApiAuth"
import { errorAlert } from "~/composables/useAlert"
import { useInterestsStore } from "~/stores/interests"
import { useBusinessSectorsStore } from "~/stores/business-sectors"
import { useDomainsStore } from "~/stores/domains"
import { handleApiError } from '~/composables/useApiError'

import completeProfileImage from '~/assets/svg/vectors/complete-profile.svg'
import completeProfileImageWhite from '~/assets/svg/vectors/complete-profile-white.svg'

import intelligenceImage from '~/assets/svg/vectors/intelligence.svg'
import intelligenceImageWhite from '~/assets/svg/vectors/intelligence.svg'

import mapImage from '~/assets/svg/vectors/map.svg'
import mapImageWhite from '~/assets/svg/vectors/map.svg'

import greenBlurEffect from '~/assets/img/green-blur-effect.png'

definePageMeta({
  layout: "validation",
  title: "Login Page",
  middleware: ['auth']
});

const intrestStore = useInterestsStore();
const intrestBusinessSectorStore = useBusinessSectorsStore();
const intrestDomainsStore = useDomainsStore();

const allowNext = computed(() => {
  if (activeStep.value == 0) {
    return formData.interests.length > 0
  }

  if (activeStep.value == 1) {
    return formData.domains.length > 0
  }
})


const activeStep = ref(0);
const isOpen = ref(false);
const isOpenMap = ref(true);
const showDomains = ref(false);
const isLoading = ref(false);
const domainLoading = ref(false);
const steps = ref(3);
const searchBuinessSector = ref();
const form = ref()


// const interests = computed(() => intrestStore.getInterests);
const domains = computed(() => intrestDomainsStore.getDomains);
const businessSectors = computed(() => intrestBusinessSectorStore.getBusinessSectors);
const filteredBusinessSectors = computed(() => intrestBusinessSectorStore.getBusinessSectors);


const selectedSector = ref(null);
const selectedDomains = ref([]);
const selectedViewDomains = ref([]);

const formData = reactive({
  interests: [],
  domains: [],
  address: {
    address: "",
    city: "",
    zip_code: "",
    country: "",
    lat: "",
    lon: "",
  },
});

const getDataFromApi = async () => {
  // await apiGetInterests();
  await apiGetBusinessSectors()
};

watchEffect(() => {
  getDataFromApi();
});

watch(() => searchBuinessSector.value, (val) => {
  searchBuinessSectors(val);
});



const isSelected = (domain) => {
  return selectedDomains.value.some((selectedDomain) => selectedDomain.id === domain.id);
};



const searchBuinessSectors = (name) => {
  filteredBusinessSectors.value = businessSectors.value.filter((businessSector) => businessSector.translated_name.toLowerCase().includes(name.toLowerCase()));
}

const formValidation = () => {

  if (formData.interests.length == 0) {
    errorAlert("Interests is required");
    activeStep.value = 0;
    return;
  }

  if (formData.domains.length == 0) {
    errorAlert("domains is required");
    activeStep.value = 1;
    return;
  }
};

const submitForm = async () => {
  formValidation();

  let payload = {
    address: null,
    interests: [],
    domains: [],
  };

  formData.interests.forEach((item) => {
    payload.interests.push(item.id);
  });

  formData.domains.forEach((item) => {
    payload.domains.push(item.id);
  });

  payload.address = formData.address;

  payload.address.lat = payload.address.lat.toString();
  payload.address.lon = payload.address.lon.toString();

  isLoading.value = true;
  const result = await completeProfile(payload);
  isLoading.value = false;
  console.log(result);

  if (!result.data) {
    const error = handleApiError(result.error);
    if (error.status === 422) {
      form.value.setErrors(error.errors);
    }
  }
  if (result?.data?.success) {
    setTimeout(() => {
      location.reload();
    }, 500);
    await navigateTo('/')
  }
};
</script>
