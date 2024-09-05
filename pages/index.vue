<template>
  <div
    class="h-full grid grid-cols-6 gap-6 dark:bg-[#0f172a] bg-[#F1F5F9] py-8 text-dark dark:text-white"
  >
    <!-- <div class="gridlines absolute inset-x-0 z-10 -mt-8 py-20"></div> -->
    <div class="flex flex-col col-span-6 lg:col-span-4 space-y-6 mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-6 text-white">
        <div
          class="md:col-span-3 bg-[url('~/assets/img/announcent.webp')] bg-cover rounded-lg overflow-hidden"
        >
          <div
            class="p-8 w-full h-full flex flex-col space-y-4 bg-gradient-to-r from-primary to-transparent"
          >
            <div>
              <span class="text-xs">Game changer media </span>
              <h2 class="text-2xl font-bold">Service banner</h2>
            </div>
            <p class="text-sm">
              In publishing and graphic design, Lorem ipsum is a placeholder text
            </p>
            <div>
              <UButton
                label="Discover"
                :ui="{ rounded: 'rounded-full' }"
                color="white"
                variant="solid"
                class="px-4 py-2"
              >
                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
                </template>
              </UButton>
            </div>
          </div>
        </div>

        <div
          class="md:col-span-2 p-8 bg-[#FFBB0C] rounded-lg flex flex-col justify-center space-y-6"
        >
          <div>
            <h2 class="text-2xl font-semibold">Offer</h2>
            <p class="text-4xl font-bold">Get 15%</p>
          </div>
          <div>
            <UButton
              label="Grab Offer"
              :ui="{ rounded: 'rounded-full' }"
              color="white"
              variant="solid"
              class="px-4 py-2"
            >
              <template #trailing>
                <UIcon name="i-heroicons-arrow-right-20-solid" class="w-5 h-5" />
              </template>
            </UButton>
          </div>
        </div>
      </div>

      <div
        class="p-4 px-6 ring-1 relative overflow-hidden ring-gray-200 dark:ring-gray-800 shadow bg-white dark:bg-slate-800 rounded-xl flex flex-col space-y-6 "
      >
        <img
          src="~/assets/svg/vectors/pattern-rectangle.svg"
          class="w-12 absolute top-0 right-0"
          alt=""
          srcset=""
        />
        <div>
          <h2>Hello {{ user?.first_name }} 👋</h2>
          <h1 class="text-2xl font-bold text-dark dark:text-white">
            What are you looking for today?
          </h1>
        </div>

        <div class="flex items-center space-x-4">
          <div
            class="p-[2px] bg-gray-100 dark:bg-gray-800 border dark:border-slate-700 border-slate-200 rounded-full flex items-center justify-center"
          >
            <UAvatar :src="user?.image_url" :alt="user.full_name" size="md" />
          </div>

          <button
            class="flex-1 text-start bg-slate-100 dark:bg-white/5 py-3 px-4 rounded-lg"
            @click="isOpen = true"
          >
            <span class="pt-2 select-none text-sm text-dark dark:text-white"
              >Write something ...</span
            >
          </button>
          <button
            @click="isOpen = true"
            type="button"
            class="rounded-full bg-primary dark:bg-emerald-500 p-2 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
              />
            </svg>
          </button>
        </div>
      </div>

      <post @deletePostFun="deletePostFun" @editPostFun="editPostFun" :post="post" :user="user" v-for="(post,index) in posts?.data" :key="index" />

      <InfiniteLoading @infinite="fetchMorePosts">
        <template #spinner>
          <div class="flex justify-center w-full">
            <LoadingIcon />
          </div>
        </template>
        <template v-if="posts?.data?.length > 0" #complete>
          <span>{{ $t("No more data found!") }}</span>
        </template>
      </InfiniteLoading>

      <div v-if="!posts" class="flex flex-1 flex-col items-center justify-center py-4">
        <img
          class="flex dark:hidden mx-auto"
          src="~/assets/svg/vectors/empty.svg"
          draggable="false"
          alt=""
          srcset=""
        />
        <img
          class="hidden dark:flex mx-auto"
          src="~/assets/svg/vectors/empty-white.svg"
          draggable="false"
          alt=""
          srcset=""
        />
        <h2 class="font-semibold text-2xl">No data founds !</h2>
        <p>You don't have any notification yet.</p>
      </div>

      <ClientOnly fallback-tag="div" fallback="">
        <UModal v-model="isOpen" :ui="{ width: 'w-full sm:w-full' }" prevent-close>
          <UCard
            :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {{ $t("Create publication") }}
                </h3>
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  class="-my-1"
                  @click="isOpen = false"
                />
              </div>
            </template>
            <div class="flex flex-col space-y-4 relative">
              <div class="flex flex-col">
                <div
                  class="relative"
                  :class="
                    keyExists('content') && content.replace(/<[^>]*>/g, '').trim() == ''
                      ? 'border-[1px] border-red-400 rounded-md'
                      : ''
                  "
                >
                  <QuillEditor
                    :class="colorMode.value == 'dark' ? 'dark-theme' : ''"
                    :options="options"
                    theme="bubble"
                    @text-change="onTextChange"
                    v-model:content="content"
                    contentType="html"
                  />
                  <p
                    class="m-0 absolute bottom-2 right-2 text-[8px] font-semibold"
                    :class="charCount >= maxLength ? 'text-red-400' : 'text-slate-400'"
                  >
                    {{ charCount }} / {{ maxLength }}
                  </p>
                </div>
                <p
                  v-show="
                    keyExists('content') && content.replace(/<[^>]*>/g, '').trim() == ''
                  "
                  class="text-red-500 text-[10px] mb-2"
                >
                  {{ getErrorMessage("content") }}
                </p>

                <div v-if="compressedFiles?.length > 0" class="my-4">
                  <div
                    class="flex flex-nowrap overflow-x-auto space-x-4 items-center scrollbar-thin scrollbar-h-2 scrollbar-thumb-rounded-full scrollbar-thumb-slate-300/80 scrollbar-track-slate-100"
                  >
                    <div
                      v-for="(file, index) in compressedFiles"
                      :key="index"
                      class="relative group w-32 h-32 flex-none ring-1 ring-gray-200 dark:ring-gray-800 shadow rounded-md overflow-hidden transition-all duration-150 ease-in-out"
                    >
                      <div class="w-full h-full overflow-hidden border-e">
                        <img
                          :src="file?.preview"
                          alt="Selected Image"
                          class="object-cover w-full h-full"
                        />
                      </div>
                      <div
                        v-if="file?.progress < 100"
                        class="absolute w-full h-full dark:bg-black/60 bg-white/80 top-0 left-0 flex justify-center items-center"
                      >
                        <UButton
                          loading
                          :color="colorMode.value != 'light' ? 'white' : 'primary'"
                          variant="link"
                          disabled
                        >
                          Compressing...
                        </UButton>
                      </div>
                      <div
                        class="bg-primary/75 w-full h-full absolute top-0 group-hover:flex items-center justify-center hidden"
                      >
                        <UButton
                          @click="removeImage(index)"
                          icon="i-heroicons-trash"
                          class="bg-transparent text-red-400 hover:bg-red-700/5 hover:text-red-500 text-xs dark:text-white"
                          size="2xs"
                          color="primary"
                          square
                          variant="soft"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div v-show="videoUrl" class="my-4 rounded-md overflow-hidden relative">
                  <video ref="videoContainer" :src="videoUrl" controls width="100%" />
                  <UButton
                    @click="removeVideo"
                    icon="i-heroicons-trash"
                    class="absolute z-20 top-1 right-1 bg-transparent text-red-400 hover:bg-red-700/5 hover:text-red-500 text-xs dark:text-white"
                    size="2xs"
                    color="primary"
                    square
                    variant="soft"
                  />

                  <!-- <div class="w-full z-10 absolute top-0 left-0 h-full flex items-center justify-center"
                                        v-if="progress > 0 && progress < 100">
                                        <UButton loading color="black" variant="link">
                                            Uploding ({{ progress }}%)...
                                        </UButton>
                                    </div> -->
                  <div class="w-full" v-if="progress > 0">
                    <div
                      class="relative dark:bg-slate-800 bg-slate-300 h-2 rounded-md overflow-hidden"
                    >
                      <div
                        class="bg-green-600 absolute top-0 left-0 h-full"
                        :style="`width: ${progress}%;`"
                      ></div>
                    </div>
                  </div>
                </div>
                <div class="flex space-x-4 items-center pt-4">
                  <input
                    ref="inputFileImage"
                    type="file"
                    id="file-input-image"
                    @change="onImageFileChange"
                    accept="image/*"
                    hidden
                    :multiple="multiple"
                  />
                  <input
                    ref="inputVideoPicker"
                    type="file"
                    id="file-input-video"
                    @change="onVideoFileChange"
                    accept="video/*"
                    hidden
                    :multiple="multiple"
                  />
                  <UButton
                    :disabled="postHasMedia"
                    @click="triggerFileInput"
                    icon="i-heroicons-photo"
                    size="xs"
                    color="primary"
                    square
                    variant="ghost"
                    class="hover:bg-primary dark:text-white disabled:text-primary transition-all duration-300 ease-in-out hover:text-white px-2"
                    label="Image"
                  />
                  <UButton
                    :disabled="postHasMedia"
                    @click="triggerVideoPicker"
                    icon="i-heroicons-video-camera"
                    size="xs"
                    class="hover:bg-primary dark:text-white disabled:text-primary transition-all duration-300 ease-in-out hover:text-white px-2"
                    color="primary"
                    square
                    variant="ghost"
                    label="Video"
                  />
                </div>
              </div>
            </div>
            <template #footer>
              <div class="flex justify-end">
                <UButton
                  size="lg"
                  @click="submitForm"
                  color="green"
                  :disabled="submitBtn"
                  :loading="isLoading"
                  class="px-4 py-2"
                  icon="i-heroicons-arrow-right"
                  trailing
                  >{{ $t("Post") }}</UButton
                >
              </div>
            </template>
          </UCard>
        </UModal>

        <UModal v-model="editPost" :ui="{ width: 'w-full sm:w-full' }" prevent-close>
          <UCard
            :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
          >
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  {{ $t("Create publication") }}
                </h3>
                <UButton
                  color="gray"
                  variant="ghost"
                  icon="i-heroicons-x-mark-20-solid"
                  class="-my-1"
                  @click="closeEdit"
                />
              </div>
            </template>
            <div class="flex flex-col space-y-4 relative">
              <div class="flex flex-col">
                <div
                  class="relative"
                  :class="
                    keyExists('content') && content.replace(/<[^>]*>/g, '').trim() == ''
                      ? 'border-[1px] border-red-400 rounded-md'
                      : ''
                  "
                >
                  <QuillEditor
                    :class="colorMode.value == 'dark' ? 'dark-theme' : ''"
                    :options="options"
                    theme="bubble"
                    @text-change="onTextChange"
                    v-model:content="content"
                    contentType="html"
                  />
                  <p
                    class="m-0 absolute bottom-2 right-2 text-[8px] font-semibold"
                    :class="charCount >= maxLength ? 'text-red-400' : 'text-slate-400'"
                  >
                    {{ charCount }} / {{ maxLength }}
                  </p>
                </div>
                <p
                  v-show="
                    keyExists('content') && content.replace(/<[^>]*>/g, '').trim() == ''
                  "
                  class="text-red-500 text-[10px] mb-2"
                >
                  {{ getErrorMessage("content") }}
                </p>

                <div v-if="compressedFiles?.length > 0" class="my-4">
                  <div
                    class="flex flex-nowrap overflow-x-auto space-x-4 items-center scrollbar-thin scrollbar-h-2 scrollbar-thumb-rounded-full scrollbar-thumb-slate-300/80 scrollbar-track-slate-100"
                  >
                    <div
                      v-for="(file, index) in compressedFiles"
                      :key="index"
                      class="relative group w-32 h-32 flex-none ring-1 ring-gray-200 dark:ring-gray-800 shadow rounded-md overflow-hidden transition-all duration-150 ease-in-out"
                    >
                      <div class="w-full h-full overflow-hidden border-e">
                        <img
                          :src="file.preview"
                          alt="Selected Image"
                          class="object-cover w-full h-full"
                        />
                      </div>
                      <div
                        v-if="file.progress < 100"
                        class="absolute w-full h-full dark:bg-black/60 bg-white/80 top-0 left-0 flex justify-center items-center"
                      >
                        <UButton
                          loading
                          :color="colorMode.value != 'light' ? 'white' : 'primary'"
                          variant="link"
                          disabled
                        >
                          Compressing...
                        </UButton>
                      </div>
                      <div
                        class="bg-primary/75 w-full h-full absolute top-0 group-hover:flex items-center justify-center hidden"
                      >
                        <UButton
                          @click="removeImage(index)"
                          icon="i-heroicons-trash"
                          class="bg-transparent text-red-400 hover:bg-red-700/5 hover:text-red-500 text-xs dark:text-white"
                          size="2xs"
                          color="primary"
                          square
                          variant="soft"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div v-if="videoUrl" class="my-4 rounded-md overflow-hidden relative">
                  <video :src="videoUrl" controls width="100%" />
                  <UButton
                    @click="removeVideo"
                    icon="i-heroicons-trash"
                    class="absolute top-1 right-1 bg-transparent text-red-400 hover:bg-red-700/5 hover:text-red-500 text-xs dark:text-white"
                    size="2xs"
                    color="primary"
                    square
                    variant="soft"
                  />
                </div>
                <div class="flex space-x-4 items-center pt-4">
                  <input
                    ref="inputFileImage"
                    type="file"
                    id="file-input-image"
                    @change="onImageFileChange"
                    accept="image/*"
                    hidden
                    :multiple="multiple"
                  />
                  <input
                    ref="inputVideoPicker"
                    type="file"
                    id="file-input-video"
                    @change="onVideoFileChange"
                    accept="video/*"
                    hidden
                    :multiple="multiple"
                  />
                  <UButton
                    :disabled="postHasMedia"
                    @click="triggerFileInput"
                    icon="i-heroicons-photo"
                    size="xs"
                    color="primary"
                    square
                    variant="ghost"
                    class="hover:bg-primary dark:text-white disabled:text-primary transition-all duration-300 ease-in-out hover:text-white px-2"
                    label="Image"
                  />
                  <UButton
                    :disabled="postHasMedia"
                    @click="triggerVideoPicker"
                    icon="i-heroicons-video-camera"
                    size="xs"
                    class="hover:bg-primary dark:text-white disabled:text-primary transition-all duration-300 ease-in-out hover:text-white px-2"
                    color="primary"
                    square
                    variant="ghost"
                    label="Video"
                  />
                </div>
              </div>
            </div>
            <template #footer>
              <div class="flex justify-end">
                <UButton
                  color="green"
                  size="lg"
                  @click="submitForm"
                  :disabled="submitBtn"
                  :loading="isLoading"
                  class="px-4 py-2"
                  icon="i-heroicons-arrow-right"
                  trailing
                  >{{ $t("Submit") }}</UButton
                >
              </div>
            </template>
          </UCard>
        </UModal>
      </ClientOnly>
    </div>
    <div class="relative col-span-6 lg:col-span-2">
      <div class="sticky top-100 hidden md:block gap-4">
      
        <div
          class="card bg-white rounded-xl text-sm font-medium dark:bg-slate-800 shadow-sm p-4 mb-4"
        >
          <ClientOnly>
                    <VCalendar ref="calendarRef" expanded color="green"   
                    view="weekly" transparent borderless
                     :min-date="new Date()" :value="new Date()"
                     :week-height="100"
      :show-weeks="1"
                        :is-dark="colorMode.value == 'dark' ? true : false"></VCalendar>
                    <template #fallback>
                        <p>{{ $t('Loading calendar...') }}</p>
                    </template>
                </ClientOnly>
        </div>
        <div
          class="card bg-white rounded-xl text-sm font-medium dark:bg-slate-800 mb-4 shadow-sm p-5 px-6"
        >
          <div class="flex justify-between text-black dark:text-white">
            <h3 class="font-bold text-base">Peaple You might know</h3>
            <button type="button">
              <i
                name="sync-outline"
                class="text-xl md hydrated"
                role="img"
                aria-label="sync outline"
              ></i>
            </button>
          </div>

          <div
            class="space-y-4 capitalize text-xs font-normal mt-5 mb-2 text-gray-500 dark:text-white/80"
          >
            <div class="flex items-center gap-3">
              <a href="profile.html">
                <img
                  src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-7.jpg"
                  alt=""
                  class="bg-gray-200 rounded-full w-10 h-10"
                />
              </a>
              <div class="flex-1">
                <a href="profile.html"
                  ><h4 class="font-semibold text-sm text-black dark:text-white">
                    Johnson smith
                  </h4></a
                >
                <div class="mt-0.5">Suggested For You</div>
              </div>
              <button
                type="button"
                class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
              >
                Follow
              </button>
            </div>
            <div class="flex items-center gap-3">
              <a href="profile.html">
                <img
                  src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-5.jpg"
                  alt=""
                  class="bg-gray-200 rounded-full w-10 h-10"
                />
              </a>
              <div class="flex-1">
                <a href="profile.html"
                  ><h4 class="font-semibold text-sm text-black dark:text-white">
                    James Lewis
                  </h4></a
                >
                <div class="mt-0.5">Followed by Johnson</div>
              </div>
              <button
                type="button"
                class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
              >
                Follow
              </button>
            </div>
            <div class="flex items-center gap-3">
              <a href="profile.html">
                <img
                  src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg"
                  alt=""
                  class="bg-gray-200 rounded-full w-10 h-10"
                />
              </a>
              <div class="flex-1">
                <a href="profile.html"
                  ><h4 class="font-semibold text-sm text-black dark:text-white">
                    John Michael
                  </h4></a
                >
                <div class="mt-0.5">Followed by Monroe</div>
              </div>
              <button
                type="button"
                class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
              >
                Follow
              </button>
            </div>
            <div class="flex items-center gap-3">
              <a href="profile.html">
                <img
                  src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-3.jpg"
                  alt=""
                  class="bg-gray-200 rounded-full w-10 h-10"
                />
              </a>
              <div class="flex-1">
                <a href="profile.html"
                  ><h4 class="font-semibold text-sm text-black dark:text-white">
                    Monroe Parker
                  </h4></a
                >
                <div class="mt-0.5">Suggested For You</div>
              </div>
              <button
                type="button"
                class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
              >
                Follow
              </button>
            </div>
            <div class="flex items-center gap-3">
              <a href="profile.html">
                <img
                  src="https://demo.foxthemes.net/instello/assets/images/avatars/avatar-4.jpg"
                  alt=""
                  class="bg-gray-200 rounded-full w-10 h-10"
                />
              </a>
              <div class="flex-1">
                <a href="profile.html"
                  ><h4 class="font-semibold text-sm text-black dark:text-white">
                    Martin Gray
                  </h4></a
                >
                <div class="mt-0.5">Suggested For You</div>
              </div>
              <button
                type="button"
                class="text-sm rounded-full py-1.5 px-4 font-semibold bg-secondery"
              >
                Follow
              </button>
            </div>
          </div>
        </div>
        <div
          class="card bg-white rounded-xl shadow-sm p-5 px-6 text-sm font-medium dark:bg-slate-800 mb-4"
        >
          <div class="flex justify-between text-black dark:text-white">
            <h3 class="font-bold text-base">Trends for you</h3>
            <button type="button">
              <i
                name="sync-outline"
                class="text-xl md hydrated"
                role="img"
                aria-label="sync outline"
              ></i>
            </button>
          </div>

          <div
            class="space-y-3.5 capitalize text-xs font-normal mt-5 mb-2 text-gray-600 dark:text-white/80"
          >
            <a href="#">
              <div class="flex items-center gap-3 p">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 -mt-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  ></path>
                </svg>
                <div class="flex-1">
                  <h4 class="font-semibold text-black dark:text-white text-sm">
                    artificial intelligence
                  </h4>
                  <div class="mt-0.5">1,245,62 post</div>
                </div>
              </div>
            </a>
            <a href="#" class="block">
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 -mt-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  ></path>
                </svg>
                <div class="flex-1">
                  <h4 class="font-semibold text-black dark:text-white text-sm">
                    Web developers
                  </h4>
                  <div class="mt-0.5">1,624 post</div>
                </div>
              </div>
            </a>
            <a href="#" class="block">
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 -mt-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  ></path>
                </svg>
                <div class="flex-1">
                  <h4 class="font-semibold text-black dark:text-white text-sm">
                    Ui Designers
                  </h4>
                  <div class="mt-0.5">820 post</div>
                </div>
              </div>
            </a>
            <a href="#" class="block">
              <div class="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5 -mt-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                  ></path>
                </svg>
                <div class="flex-1">
                  <h4 class="font-semibold text-black dark:text-white text-sm">
                    affiliate marketing
                  </h4>
                  <div class="mt-0.5">480 post</div>
                </div>
              </div>
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import {
  create,
  index,
  update,
  getPaginationsComments,
  deletePost,
} from "~/composables/store/usePost";
import axios from "axios";

// import { uploadVideo } from '~/composables/store/useVideo'
import { usePostStore } from "~/stores/posts";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import imageCompression from "browser-image-compression";
import { useAuthStore } from "~/stores/authStore";
import { useSettings } from "~/stores/settings";
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";

const colorMode = useColorMode();

const authStore = useAuthStore();
const settingStore = useSettings();
const postStore = usePostStore();

definePageMeta({
  layout: "auth",
  title: "Forgot password",
  middleware: ["auth"],
});

const isOpen = ref(false);
const editPost = ref(false);
const maxLength = ref(200);

const videoContainer = ref();

const charCount = computed(() => countChars(content.value));
const user = computed(() => authStore.getAuthUser);
const settings = computed(() => settingStore.getSettings);
const posts = computed(() => postStore.getPosts);

const postHasMedia = computed(() => {
  return videoUrl.value || compressedFiles.value.length > 0 ? true : false;
});

const content = ref("");
const inputFileImage = ref(null);
const inputVideoPicker = ref();
const isLoading = ref(false);
const selectedPostID = ref(null);

const page = ref(1);
const errors = ref([]);
const compressedFiles = ref([]);
const multiple = ref(false);

const snackbar = useSnackbar();
const selectedVideo = ref(null);
const videoUrl = ref("");
const submitBtn = ref(false);
const thumbnailVideo = ref();
const progress = ref(0);

const options = ref({
  modules: {},
  placeholder: "What's on your mind?",
  theme: "bubble",
});

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => {
      isOpen.value = false;
    },
  },
})

const getDataFromApi = async () => {
  await index();
}

watchEffect(() => {
  getDataFromApi();
})

const keyExists = (key) => {
  return errors.value.some((error) => error.key === key);
}

const getErrorMessage = (key) => {
  const error = errors.value.find((error) => error.key === key);
  return error ? error.value : "";
}

const removeImage = (index) => {
  compressedFiles.value.splice(index, 1);

  if (compressedFiles.value.length === 0) {
    inputFileImage.value.value = null;
  }
}

const removeVideo = () => {
  selectedVideo.value = null;
  videoUrl.value = null;
  inputVideoPicker.value.value = null;
}

const countChars = (htmlString) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const textContent = tempDiv.textContent || tempDiv.innerText || "";

  return textContent.length;
}

const onTextChange = (delta, oldDelta, source) => {
  if (charCount.value > maxLength.value) {
    return;
  }
}

const triggerFileInput = () => {
  inputFileImage.value.click();
}

const triggerVideoPicker = () => {
  inputVideoPicker.value.click();
}

const onImageFileChange = async (event) => {
  const selectedFiles = Array.from(event.target.files);

  for (const file of selectedFiles) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: "image/webp",
      onProgress: (progress) => {
        const index = compressedFiles.value.findIndex((f) => f.originalFile === file);
        if (index !== -1) {
          compressedFiles.value[index].progress = progress;
        }
      },
    };

    const newFileObj = { originalFile: file, progress: 0, preview: "" };
    compressedFiles.value.push(newFileObj);

    try {
      const index = compressedFiles.value.findIndex((f) => f.originalFile === file);
      const preview = URL.createObjectURL(file);
      compressedFiles.value[index].preview = preview;
      const compressedFile = await imageCompression(file, options);
      compressedFiles.value[index].file = compressedFile;
    } catch (error) {
      console.error("Error compressing file:", error);
    }
  }
}

const getVideoCover = () => {
  return new Promise((resolve, reject) => {
    videoContainer.value.addEventListener("loadedmetadata", () => {
      setTimeout(() => {
        videoContainer.value.currentTime = 1;
      }, 200);
      // extract video thumbnail once seeking is complete
      videoContainer.value.addEventListener("seeked", () => {
        console.log("video is now paused at %ss.", 1);
        // define a canvas to have the same dimension as the video
        const canvas = document.createElement("canvas");
        canvas.width = videoContainer.value.videoWidth;
        canvas.height = videoContainer.value.videoHeight;
        // draw the video frame to canvas
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoContainer.value, 0, 0, canvas.width, canvas.height);
        // return the canvas image as a blob
        ctx.canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.75 /* quality */
        );
      });
    });
  });
}

const uploadVideo = async (payload) => {
  const cookie = useCookie("user_access_token");
  const token = cookie.value;

  try {
    const response = await axios.post(
      "https://gc-dev.informatikab.com/api/v1/upload-file",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        onUploadProgress: (progressEvent) => {
          progress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Upload failed:", error);
    submitBtn.value = false;
    return null;
  }
}

const onVideoFileChange = async (event) => {
  const selectedFiles = Array.from(event.target.files);

  videoUrl.value = URL.createObjectURL(selectedFiles[0]);

  thumbnailVideo.value = await getVideoCover();

  const formData = new FormData();
  formData.append("file", selectedFiles[0]);
  submitBtn.value = true;
  const result = await uploadVideo(formData);
  if (result?.success) {
    selectedVideo.value = result?.id;
    submitBtn.value = false;
  }
}

const validationData = () => {
  if (content.value.replace(/<[^>]*>/g, "").trim() == "") {
    errors.value.push({ key: "content", value: "Content can not be empty" });
  }
}

const extractHashTags = (content) => {
  const textContent = content.replace(/<\/?[^>]+(>|$)/g, "");
  const hashtags = (textContent.match(/#\w+/g) || []).map((tag) => tag.substring(1));
  return hashtags || [];
}

const submitForm = async () => {
  let hashtags = [];
  isLoading.value = true;
  validationData();

  hashtags = extractHashTags(content.value);

  if (errors.value.length > 0) {
    isLoading.value = false;
    return;
  }

  let formData = new FormData();
  formData.append("description", content.value);

  if (hashtags.length > 0) {
    hashtags.forEach((tag, index) => {
      formData.append(`hashtags[${index}]`, tag);
    });
  }

  if (thumbnailVideo.value) {
    formData.append(`thumbnail`, thumbnailVideo.value);
  }

  if (compressedFiles.value[0]?.file) {
    formData.append("image", compressedFiles.value[0].file);
  }

  if (selectedVideo.value) {
    formData.append("video", selectedVideo.value);
  }

  if (!editPost.value) {
    const result = await create(formData);
    if (result?.success) {
      posts.value.data.push(result?.post);
      isOpen.value = false;
      clearData();
      snackbar.add({
        type: "success",
        text: "Post added successfully",
      });
    }
  } else {
    formData.append("_method", "PUT");
    const result = await update(selectedPostID.value, formData);
    clearData();
    editPost.value = false;
  }

  isLoading.value = false;
}

const fetchMorePosts = async ($state) => {
  if (posts.value?.links?.next == null) {
    $state.complete();
    return;
  }
  try {
    const result = await getPaginationsComments(posts.value.links.next);
    posts.value.data.push(...result.data);
    posts.value.links = result.links;
    if (result.data.length < 10) $state.complete();
  } catch (error) {
    $state.error();
  }
}

const clearData = () => {
  content.value = "";
  thumbnailVideo.value = null;
  compressedFiles.value = [];
  inputVideoPicker.value.value = null;
  inputFileImage.value.value = null;
}

const closeEdit = () => {
  clearData();
  editPost.value = false;
}

const deletePostFun = async (post) => {
  const result = await deletePost(post?.id);

  if (result?.success) {
    posts.value.data = posts.value.data.filter((item) => item.id !== post?.id);

    snackbar.add({
      type: "success",
      text: "Post deleted successfully",
    });
  }
}

const editPostFun = async (post) => {
  selectedPostID.value = post?.id;
  content.value = post?.description;
  editPost.value = true;
}

 
</script>

<style scoped lang="css">
:deep(.ql-editor) {
  min-height: 200px;
  border: 1px solid #e5e7eb;
  /* 1f2937 */
  border-radius: 8px;
  padding-bottom: 26px;
}

:deep(.ql-editor.ql-blank::before) {
  color: #4e4e4e !important;
}

:deep(.dark-theme > .ql-editor.ql-blank::before) {
  color: #a8a8a8 !important;
}

:deep(.dark-theme > .ql-editor) {
  border: 1px solid #1f2937;
}

:deep(.ql-container) {
  font-size: 12px;
}

:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

:deep(.vue-tags-input.ti-focus) {
  max-width: 100% !important;
}

:deep(.vue-tags-input.ti-focus > .ti-input) {
  margin-top: 10px !important;
  border: 1px solid #f1f1f1 !important;
  border-radius: 6px !important;
}

:deep(input.ti-valid.ti-new-tag-input) {
  font-size: 10px !important;
}

:deep(.ti-valid.ti-tag) {
  background-color: #0f172a !important;
}

:deep(.ti-tag-center span) {
  font-size: 10px !important;
  line-height: inherit !important;
}

:deep(.ti-icon-close:before) {
  font-size: 10px !important;
}

.blog-content > .th-btn.btn-sm {
  background: var(--theme-color);
}
</style>
