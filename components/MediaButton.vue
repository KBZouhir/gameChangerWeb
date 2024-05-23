<script setup>

const props = defineProps({
    type: {
        type: String,
        required: true,
        default: 'text'
    },
})


const socialMedia = [
    {name: 'google', color: 'red', logo: '/_nuxt//assets/svg/logos/google.svg'},
    {name: 'twitter', color: 'blue', logo: '/_nuxt//assets/svg/logos/twitter.svg'}

]

const classList = ['flex','items-center','justify-center','space-x-2','cursor-pointer','border-2','rounded-md','py-2.5']

const selectedSocialMedia = socialMedia.filter(media => media.name === props.type)[0];

classList.push([`hover:bg-${selectedSocialMedia.color}-50`,`border-${selectedSocialMedia.color}-500`, `text-${selectedSocialMedia.color}-500`])

</script>

<template>
    <button :class="classList">
        <img :src="selectedSocialMedia.logo" :alt="selectedSocialMedia.name" srcset="">
        <span class="font-bold capitalize">{{selectedSocialMedia.name}}</span>
    </button>
</template>