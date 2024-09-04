<template>
    <div class="card-text">
        <div v-if="displayDescription.length > number">
            <div class="relative line-clamp-4" v-if="!readMore">
                <div v-html="displayDescription"></div>
                <div class="absolute w-full h-12 bg-red bottom-0 bg-gradient-to-t dark:from-slate-800 from-white to-transparent"></div>
            </div>
            <div v-if="readMore" v-html="htmlDescription"></div>

            <div class="text-xs text-green-500 font-bold cursor-pointer flex justify-start mt-2">
                <a class="my-50 mb-1" @click="toggleReadMore" v-if="!readMore">
                    Show more
                </a>
                <a class="my-50 mb-1" v-if="readMore" @click="toggleReadMore">
                    Show less
                </a>
            </div>
        </div>

        <div v-else v-html="displayDescription"></div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    description: String,
    number: Number,
    htmlContent: {
        type: Boolean,
        required: false,
        default: true
    }
});

const readMore = ref(false);

const removeHtmlTags = (htmlString) => {
    return htmlString.replace(/<\/?[^>]+(>|$)/g, "");
};

const extractHashtags = (text) => {
    return text.replace(/(#[a-zA-Z0-9_]+)/g, '<span class="text-green-400 font-semibold">$1</span>');
};

const displayDescription = computed(() => {
    let descriptionText = props.htmlContent ? removeHtmlTags(props.description) : props.description;
    return extractHashtags(descriptionText);
});

const htmlDescription = computed(() => {
    return extractHashtags(props.description.replaceAll('<br>', ''));
});

const toggleReadMore = () => {
    readMore.value = !readMore.value;
};
</script>

