<template>
    <div class="card-text">
        <div v-if="displayDescription.length > number">
            <div class="relative line-clamp-4" v-if="!readMore">
                <div v-html="displayDescription"></div>
                <div class="absolute w-full h-12 bg-red bottom-0 bg-gradient-to-t dark:from-[#111827] from-white to-transparent"></div>
            </div>
            <div v-if="readMore" v-html="htmlDescription"></div>

            <div class="text-xs dark:text-white text-primary-500 underline cursor-pointer flex justify-start mt-2">
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
    number: Number,
    htmlContent: {
        type: String,
        required: false,
        default: true
    }
})

const readMore = ref(false)

const removeHtmlTags = (htmlString) => {
  return htmlString.replace(/<\/?[^>]+(>|$)/g, "")
}

const displayDescription = computed(() =>{
    if(props.htmlContent){
        return removeHtmlTags(props.description)
    }else{
        return props.description
    }
})
const htmlDescription = computed(() => props.description.replaceAll('<br>', ''))

const toggleReadMore = () => {
    readMore.value = !readMore.value
}

</script>