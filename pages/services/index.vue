<template>
  <div class="mx-auto w-full max-w-screen-xl px-2 py-8">
    <div class="col-span-6 col-span-12 lg:col-span-6 mb-4">
      <!-- <div
        class="mb-4 ring-1 ring-gray-200 dark:ring-gray-800 bg-white rounded-xl text-sm font-medium dark:bg-slate-800 shadow-sm p-4 p-8 bg-gradient-to-r from-green-500 to-yellow "
      >
        <div class="flex flex-col justify-between gap-y-16 sm:flex-row sm:gap-y-0">
          <div class="flex flex-col">
            <p class="text-4xl mb-3 text-white">Services</p>
            <p class="text-muted-100 mb-6  text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Si longus, levis
              dictata sunt. Quare attende, quaeso
            </p>
            <div class="flex items-center gap-2  text-white">
              <a href="/layouts/send" class="rounded-md"> Manage Orders</a>
            </div>
          </div>
          <div class="relative min-h-[80px] min-w-[180px] shrink-0">
            <div class="absolute bottom-0 -top-10">
            
            </div>
          </div>
        </div>
      </div> -->
      <div class="mx-auto max-w-7xl ">
        <div
          class="relative border dark:border-slate-800 isolate overflow-hidden bg-gradient-to-br dark:from-slate-800 dark:to-slate-800 px-6 pt-8 dark:shadow-2xl sm:rounded-xl sm:px-8 md:pt-16 lg:flex lg:gap-x-20 lg:px-16 lg:pt-0">
          <svg viewBox="0 0 1024 1024"
            class="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true">
            <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fill-opacity="0.7" />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stop-color="#0f1454" />
                <stop offset="1" stop-color="#34d399" />
              </radialGradient>
            </defs>
          </svg>
          <div class="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 class="text-3xl font-bold tracking-tight text-black dark:text-white sm:text-4xl">Services</h2>
            <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"> Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Si longus, levis
              dictata sunt. Quare attende, quaeso</p>

          </div>
          <div class="relative mt-16 h-80 lg:mt-8">
            <img class="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png" alt="App screenshot"
              width="1824" height="1080">
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="text-2xl font-bold mb-4">Services by game changer</p>
      <UCarousel v-slot="{ item }" arrows :items="items">
        <UCard :ui="{ body: 'p-0' }"
          class="overflow-hidden bg-white rounded-xl text-sm font-medium dark:bg-slate-800 shadow-sm p-4 w-64 mr-2"
          v-for="(service, index) in services?.data?.slice().reverse()">
          <div class="relative">
            <nuxt-link :to="`/services/details/${service?.id}`">
              <div :class="`relative h-32 rounded-lg bg-cover`" :style="`background-image:url('${service.image_url}')`">
              </div>
            </nuxt-link>

            <div class="absolute -bottom-3 right-1 flex justify-end">
              <UBadge color="primary" size="xs" class="px-4   border border-white" :ui="{
                rounded: 'rounded-full',
              }">
                <span v-if="service.price" class="capitalize text-white">{{ service.price }} €</span>
                <span class="capitalize text-white" v-else>Estimate</span>
              </UBadge>
            </div>
          </div>
          <div class="">
            <div class="flex items-center space-x-2  my-2 mt-4">
              <nuxt-link :to="`/profile/${service?.user.id}`">
                <UAvatar :src="service.user.image_url" :alt="service.user.full_name" size="xs"
                  class="dark:bg-gray-600" />
              </nuxt-link>

              <div class="flex flex-col">
                <nuxt-link :to="`/profile/${service?.user.id}`">
                  <h4 class="font-medium mb-0">{{ service.user.full_name }}</h4>
                </nuxt-link>
              </div>
            </div>

            <div class="min-h-12">
              <nuxt-link :to="`/services/details/${service?.id}`">
                <h3 class="text-md font-medium truncate mb-1">
                  {{ service?.title }}
                </h3>
                <div class="text-xs font-light text-slate-600 dark:text-gray-400 line-clamp-1">
                  {{ service?.description }}
                </div>
              </nuxt-link>
            </div>
          </div>
        </UCard>

      </UCarousel>
    </div>
    <div class="flex  justify-between my-6">
      <span>
        {{ $t('Total services') }}: <span class="font-bold">{{ services?.meta?.total }}</span>
      </span>
      <nuxt-link v-if="user?.role.id != 3" :to="`/services/create`">
        <UButton label="Create" color="green" size="md"></UButton>
      </nuxt-link>
    </div>
    <div class="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
      <UCard :ui="{ body: 'p-0' }"
        class="overflow-hidden bg-white rounded-xl text-sm font-medium dark:bg-slate-800 shadow-sm p-4"
        v-for="(service, index) in services?.data">
        <div class="relative">
          <nuxt-link :to="`/services/details/${service?.id}`">
            <div :class="`relative h-64 rounded-lg bg-cover`" :style="`background-image:url('${service.image_url}')`">
            </div>
          </nuxt-link>

          <div class="absolute top-3 right-3 flex justify-end">
            <UBadge color="primary" size="md" class="px-4 z-20 bg-opacity-75 dark:bg-opacity-75 border border-white"
              :ui="{
                rounded: 'rounded-full',
              }">
              <span v-if="service.price" class="capitalize text-white">{{ service.price }} €</span>
              <span class="capitalize text-white" v-else>Estimate</span>
            </UBadge>
          </div>
        </div>
        <div class="">
          <div class="flex items-center space-x-4 my-4">
            <nuxt-link :to="`/profile/${service?.user.id}`">
              <UAvatar :src="service.user.image_url" :alt="service.user.full_name" size="sm" class="dark:bg-gray-600" />
            </nuxt-link>

            <div class="flex flex-col">
              <nuxt-link :to="`/profile/${service?.user.id}`">
                <h4 class="font-bold mb-0">{{ service.user.full_name }}</h4>
              </nuxt-link>
              <span class="text-xs text-slate-400 -mt-[0.5px]">{{
                $dayjs(service.created_at).format("DD/MM/YYYY h:MM A")
              }}</span>
            </div>
          </div>

          <div class="min-h-20">
            <nuxt-link :to="`/services/details/${service?.id}`">
              <h3 class="text-lg font-semibold truncate mb-2">{{ service?.title }}</h3>
              <div class="text-xs text-slate-600 dark:text-gray-400 line-clamp-2">
                {{ service?.description }}
              </div>
            </nuxt-link>
          </div>

          <div class="relative flex items-center whitespace-nowrap overflow-hidden">
            <UBadge :label="domain.translated_name" :ui="{
              rounded: 'rounded-full',
            }" color="white" size="xs" class="px-3 m-0.5 text-[10px] bg-opacity-75 dark:bg-opacity-75"
              v-for="domain in service.domains" />
          </div>
        </div>
      </UCard>
    </div>

    <div v-if="loading" class="grid md:grid-cols-3 grid-cols-1 gap-4">
      <UCard :ui="{ body: 'p-0' }" class="overflow-hidden" v-for="i in 9">
        <USkeleton class="h-64 w-full" />

        <div class="p-4">
          <div class="flex items-center space-x-4">
            <USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
            <div class="space-y-2">
              <USkeleton class="h-4 w-[250px]" />
              <USkeleton class="h-4 w-[200px]" />
            </div>
          </div>

          <div class="min-h-32">
            <h3 class="text-lg font-semibold truncate mt-2 mb-6"></h3>
            <div class="flex flex-col space-y-4">
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-full" />
              <USkeleton class="h-4 w-[200px]" />
            </div>
          </div>
        </div>
        <template #footer>
          <div class="flex flex-wrap space-x-3 items-center">
            <USkeleton class="h-6 w-[70px]" v-for="i in 4" />
          </div>
        </template>
      </UCard>
    </div>

    <InfiniteLoading class="py-8" v-if="services" @infinite="fetchMoreServices">
      <template #spinner>
        <div class="flex justify-center w-full">
          <LoadingIcon />
        </div>
      </template>
      <template v-if="services?.data?.length > 0" #complete>
        <div class="flex justify-center my-4">
          <span>No more data found!</span>
        </div>
      </template>
    </InfiniteLoading>
  </div>
</template>

<script setup>
import { useServicesStore } from "~/stores/services";
import { getServices } from "~/composables/store/useService";
import { getPaginationsComments } from "~/composables/store/usePost";
import { useAuthStore } from "~/stores/authStore";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

definePageMeta({
  layout: "auth",
  title: "Service",
  middleware: ["auth"],
});
const items = ["https://picsum.photos/600/800?random=6"];
const authStore = useAuthStore();
const servicesStore = useServicesStore();
const loading = ref(false);
const services = computed(() => servicesStore.getServices);
const user = computed(() => authStore.getAuthUser);

const fetchMoreServices = async ($state) => {
  try {
    loading.value = true;

    const result = await getPaginationsComments(services.value.links.next);
    services.value.data.push(...result.data);
    services.value.links = result.links;
    if (result.data.length < 10) $state.complete();
    loading.value = false;
  } catch (error) {
    $state.error();
    loading.value = false;
  }
};

const getDataFromApi = async () => {
  loading.value = true;
  await getServices();
  loading.value = false;
};

watchEffect(() => {
  getDataFromApi();
});
</script>
