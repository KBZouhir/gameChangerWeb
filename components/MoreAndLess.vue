<template>
    <div class="card-text">
        <div v-if="displayDescription.length > number">
            <div class="relative line-clamp-4" v-if="!readMore">
                {{ displayDescription }} 
                <div class="absolute w-full h-12 bg-red bottom-0 bg-gradient-to-t from-white to-transparent"></div>
            </div>
            <div v-if="readMore" v-html="htmlDescription"></div>

            <div class="text-xs text-primary-500 underline cursor-pointer flex justify-start mt-2">
                <a class="my-50 mb-1" @click="toggleReadMore" v-if="!readMore">
                    See more
                </a>
                <a class="my-50 mb-1" v-if="readMore" @click="toggleReadMore">
                    See less
                </a>
            </div>
        </div>
        <div v-else v-html="description"></div>
    </div>
</template>

<script setup>
import { ref, computed, toRefs } from 'vue'

const props = defineProps({
    description: String,
    number: Number
})

const readMore = ref(false)

const removeHtmlTags = (htmlString) => {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "")
}

const displayDescription = computed(() => removeHtmlTags(props.description))
const htmlDescription = computed(() => props.description.replaceAll('<br>', ''))

const toggleReadMore = () => {
    readMore.value = !readMore.value
}

</script>