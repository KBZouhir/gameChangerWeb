<script setup>
import { apiGetInterests } from "~/composables/store/useInterests";
import { apiGetDomains, apiGetDomainBySector } from "~/composables/store/useDomains";
import { apiGetBusinessSectors } from "~/composables/store/useBusinessSectors";
import { completeProfile } from "~/composables/store/useApiAuth";
import { errorAlert } from "~/composables/useAlert";
import { useInterestsStore } from "~/stores/interests";
import { useBusinessSectorsStore } from "~/stores/business-sectors";
import { useDomainsStore } from "~/stores/domains";

definePageMeta({
  layout: "auth",
  title: "Login Page",
});

const intrestStore = useInterestsStore();
const intrestBusinessSectorStore = useBusinessSectorsStore();
const intrestDomainsStore = useDomainsStore();

const activeStep = ref(0);
const isOpen = ref(false);
const isOpenMap = ref(true);
const showDomains = ref(false);
const isLoading = ref(false);
const steps = ref(3);
const searchBuinessSector = ref();
const form = ref()


const interests = computed(() => intrestStore.getInterests);
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
  await apiGetInterests();
  await apiGetBusinessSectors()
};

watchEffect(() => {
  getDataFromApi();
});

watch(() => searchBuinessSector.value, (val) => {
  searchBuinessSectors(val);
});

const getdomain = async (sector) => {
  selectedSector.value = sector;
  const qurey = { business_sector: selectedSector.value.id };
  isLoading.value = true;
  await apiGetDomainBySector(qurey).then(() => {
    isLoading.value = false;
  });
  showDomains.value = true;
};

const isSelected = (domain) => {
  return selectedDomains.value.some((selectedDomain) => selectedDomain.id === domain.id);
};

const isSectorOnDomain = (sector) => {
  return selectedDomains.value.some(
    (selectedDomain) => selectedDomain.business_sector_id === sector.id
  );
};

const dispalyDomains = () => {
  isOpen.value = false;
  selectedViewDomains.value = selectedDomains.value;
};

const removeDomain = (domain) => {
  selectedDomains.value = selectedDomains.value.filter((d) => d.id !== domain.id);
  selectedViewDomains.value = selectedDomains.value;
};

const selectDomain = (domain) => {
  if (!isSelected(domain)) {
    selectedDomains.value.push(domain);
  } else {
    selectedDomains.value = selectedDomains.value.filter((d) => d.id !== domain.id);
  }
  selectedViewDomains.value = selectedDomains.value;
};

const searchBuinessSectors = (name) => {
  filteredBusinessSectors.value = businessSectors.value.filter((businessSector) => businessSector.translated_name.toLowerCase().includes(name.toLowerCase()));
}

const formValidation = () => {
  formData.domains = selectedViewDomains.value;

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

  //console.log(payload);
  const result = await completeProfile(payload);
  console.log(result.error.data.errors);
  result.error.data.errors.map((err) => {
    console.log(err);
  })
};
</script>

<template>
  <div class="relative bg-slate-50 dark:bg-slate-800">
    <div class="mx-auto max-w-s w-full max-w-screen-xl  h-full   grid grid-cols-5 gap-0 "
      :class="activeStep != 2 ? 'h-screen' : ''">
      <div class="flex justify-center items-center col-span-5 lg:col-span-3 ">
        <div class="h-full flex flex-col w-full px-4 sm:px-6 lg:px-2 py-8">
          <h1 class="text-3xl font-bold">Complete profile</h1>

          <SteperProgress :steps="steps" v-model="activeStep" class="mb-16 mt-8" />

          <div v-if="activeStep == 0" class="flex-1 overflow-hidden">
            <h1 class="text-2xl font-bold">Select your Interests</h1>
            <p class="text-[#989394]">
              Select a few of your interest to match with users who have similar things in
              common.
            </p>
            <div class="h-full">
              <div class="flex flex-wrap gap-4 py-8 overflow-auto">
                <template v-for="interest in interests" key="person.name">
                  <CustomCheckbox :label="interest.name" v-model="formData.interests" :value="interest" />
                </template>
              </div>
            </div>
          </div>

          <div v-if="activeStep == 1" class="flex-1 flex flex-col overflow-hidden">
            <h1 class="text-2xl font-bold">Select your working domain</h1>
            <p class="text-[#989394]">
              Select a few of your working domain to match with users who have similar
              things in common.
            </p>

            <div v-if="selectedViewDomains.length == 0"
              class="flex flex-1 justify-center items-center gap-4 py-8 overflow-auto bg-slate-50 mt-4 border-dashed border-2 border-[#ABB7C8] rounded-md">
              <button class="flex space-x-4" @click="isOpen = true">
                <p class="text-[#0F1454] text-md">Add domains</p>
              </button>
            </div>

            <div v-if="selectedViewDomains.length > 0"
              class="flex flex-col flex-1 relative gap-4 py-8 overflow-auto bg-slate-50 mt-4 border-dashed border-2 border-[#ABB7C8] rounded-md">
              <div class="flex flex-wrap">
                <div class="flex flex-wrap items-start space-x-4 flex-1 px-4">
                  <span class="flex justify-between items-center space-x-4 px-4 py-2 my-2 bg-gray-200 rounded-xl"
                    v-for="domain in selectedViewDomains">
                    <span class="text-sm">{{ domain.translated_name }}</span>
                    <UButton icon="i-heroicons-x-mark" size="2xs" color="red" @click="removeDomain(domain)" square
                      variant="ghost" />
                  </span>
                </div>
              </div>

              <div class="w-full mx-auto text-center px-4">
                <UButton size="lg" icon="i-heroicons-plus" color="#F0F0F0" variant="outline" @click="isOpen = true">Add
                  domains
                </UButton>
              </div>
            </div>
          </div>

          <div v-if="activeStep == 2" class="flex-1 overflow-auto">
            <h1 class="text-2xl font-bold">Enter your address</h1>
            <p class="text-[#989394]">
              Select a few of your address to match with users who have similar things in
              common.
            </p>

            <div class="pace-x-4 my-8">
              <Map v-model="formData.address" :is-open-map="true" />

              <UForm ref="form" div class="space-y-4 p-1 pt-4 ">
                <UFormGroup label="Address" name="address">
                  <UInput size="lg" placeholder="Address" v-model="formData.address.address" />
                </UFormGroup>

                <div class="grid grid-cols-2 gap-4">
                  <UFormGroup label="City" name="city">
                    <UInput size="lg" placeholder="City" v-model="formData.address.city" />
                  </UFormGroup>

                  <UFormGroup label="Country" name="country">
                    <UInput size="lg" placeholder="Country" v-model="formData.address.country" />
                  </UFormGroup>
                </div>

                <UFormGroup label="Zip code" name="zip_code">
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
            <UButton variant="ghost" @click="activeStep--" :disabled="activeStep <= 0" class="px-6 py-3 text-[#0F1454]">
              Previous
            </UButton>
            <UButton @click="activeStep++" v-if="activeStep + 1 != steps" :disabled="activeStep >= steps - 1"
              class="px-10 py-3 bg-emerald-400">
              Next
            </UButton>

            <UButton @click="submitForm" v-if="activeStep >= steps - 1" class="px-6 py-3 bg-emerald-400">
              Finish
            </UButton>
          </div>
        </div>
        <Loading v-model="isLoading" />

        <USlideover v-model="isOpen">
          <Loading v-model="isLoading" />
          <div class="p-4 flex-1 overflow-y-auto">
            <UButton color="gray" variant="ghost" size="sm" icon="i-heroicons-x-mark-20-solid"
              class="flex sm:hidden absolute end-5 top-5 z-10" square padded @click="isOpen = false" />
            <div class="flex flex-col p-2" v-if="!showDomains">
              <h1 class="text-2xl font-bold">Select your business sector</h1>
              <p class="text-[#989394]">
                Select a few of your business sector to match with users who have similar
                things in common.
              </p>

              <UInput placeholder="Search what you need..." v-model="searchBuinessSector" size="xl" color="gray"
                class="my-4">
                <template #trailing>
                  <span class="text-gray-500 dark:text-gray-400 text-xs">
                    <img src="/assets/svg/icons/search.svg" alt="" srcset="" />
                  </span>
                </template>
              </UInput>

              <div class="flex-1 overscroll-y-auto">
                <div v-for="businessSector in filteredBusinessSectors" @click="getdomain(businessSector)" :class="isSectorOnDomain(businessSector)
                  ? 'bg-green-100 hover:bg-green-200 border-green-300'
                  : ''
                  "
                  class="border-[1px] border-blueGray-200 rounded-md flex justify-between items-center mb-3 px-6 py-3 hover:bg-slate-50 transition-all ease-in-out duration-300 cursor-pointer">
                  <div class="text-[#0F1454]">
                    <h3 class="font-bold text-xl">
                      {{ businessSector.translated_name }}
                    </h3>
                    <small v-if="selectedDomains">
                      <span v-for="(selectDomain, index) in selectedDomains">
                        <span v-if="selectDomain.business_sector_id == businessSector.id">
                          {{ selectDomain.translated_name }},
                        </span>
                      </span>
                    </small>
                  </div>
                  <svg width="10" height="18" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.19995 1.80078L10.36 9.96078L2.19995 18.1208" stroke="#0F172A" stroke-width="2.72"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            <div class="flex flex-col p-2" v-if="showDomains">
              <h1 class="font-bold text-3xl mb-4">
                #{{ selectedSector.translated_name }}
              </h1>
              <h1 class="text-2xl font-bold">Select domains</h1>
              <p class="text-[#989394]">
                Select a few of your working domain to match with things in common.
              </p>

              <UInput placeholder="Search what you need..." size="xl" color="gray" class="my-4">
                <template #trailing>
                  <span class="text-gray-500 dark:text-gray-400 text-xs">EUR</span>
                </template>
              </UInput>

              <div class="flex-1 overscroll-y-auto">
                <div v-for="domain in domains" @click="selectDomain(domain)"
                  :class="isSelected(domain) ? 'bg-green-100 hover:bg-green-200 border-green-300' : ''"
                  class="border-[1px] border-blueGray-200 rounded-md flex justify-between items-center mb-3 px-6 py-3 hover:bg-slate-50 transition-all ease-in-out duration-300 cursor-pointer">
                  <div class="text-[#0F1454]">
                    <h3 class="font-bold text-xl">{{ domain.translated_name }}</h3>
                  </div>
                  <input type="checkbox" name="" :checked="isSelected(domain)" id="" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 sticky bottom-0 bg-white py-4">
                <UButton block color="primary" size="lg" @click="
                    {
                  selectedSector = null;
                  showDomains = false;
                }
                  " variant="outline">Back</UButton>
                <UButton block size="lg" label="Save" @click="dispalyDomains" />
              </div>
            </div>
          </div>
        </USlideover>
      </div>
      <div class=" col-span-2 h-full flex-1 hidden lg:flex justify-center items-center relative">
        <img class="absolute right-0 top-0" width="80%" src="~/assets/svg/particules/gradient.svg" alt="">
        <img src="~/assets/svg/vectors/complete-profile.svg" v-if="activeStep == 0" draggable="false" width="50%">
        <img src="~/assets/svg/vectors/intelligence.svg" v-if="activeStep == 1" draggable="false" width="50%">
        <img src="~/assets/svg/vectors/map.svg" v-if="activeStep == 2" draggable="false" width="50%">
      </div>
    </div>
  </div>
</template>
