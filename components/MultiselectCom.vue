<template>
    <div>
        <Multiselect ref="dropdown" :searchable="true" mode="tags" :close-on-select="false" :filter-results="false"
            v-model="value" placeholder="Select internal animators" label="name" :options="data">
            <template v-slot:tag="{ option, handleTagRemove, disabled }">
                <div class="multiselect-tag is-user" :class="{
                    'is-disabled': disabled
                }">
                    <img :src="option.image">
                    {{ option.name }}
                    <span v-if="!disabled" class="multiselect-tag-remove"
                        @mousedown.prevent="handleTagRemove(option, $event)">
                        <span class="multiselect-tag-remove-icon"></span>
                    </span>
                </div>
            </template>
        </Multiselect>
    </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'

const props = defineProps({
    items: Object,
    checkInfiniteScroll: Boolean
});
const dropdown = ref(null)

const emit = defineEmits(['update:modelValue']);


const value = computed({
    get: () => props.modelValue,
    set: (newValue) => emit('update:modelValue', newValue),
});


const data = ref(props.items?.data?.map(user => ({
    value: user.id,
    name: user.full_name,
    image: user.image_url,
})))



// const determineIfEndOfScroll = (list) => {
//     const { scrollTop, scrollHeight, clientHeight } = list

//     // Check if the user has scrolled to the bottom of the list
//     if (scrollTop + clientHeight >= scrollHeight) {
//         console.log("requset data")
        
//         emit('infinite-scroll')
//     }
// }

// onMounted(async () => {
//     await nextTick();

//     if (props.checkInfiniteScroll) {
//         const list = dropdown.value.$el.querySelector('.multiselect-dropdown')

//         if (list) {
//             list.addEventListener('scroll', () => determineIfEndOfScroll(list))
//         }
//     }
// })

// onBeforeUnmount(() => {
//     if (props.checkInfiniteScroll) {
//         const list = dropdown.value.$el.querySelector('.multiselect-dropdown')
//         if (list) {
//             list.removeEventListener('scroll', () => determineIfEndOfScroll(list))
//         }
//     }
// })


</script>

<style>
@import '@vueform/multiselect/themes/default.css';

.dark .multiselect,
.dark .multiselect-dropdown,
.dark .multiselect-tags-search {
    background-color: #111827 !important;
}

.multiselect,
.multiselect-dropdown,
.multiselect-tags-search {
    background-color: #FFF !important;
}

.dark .multiselect,
.dark .multiselect-dropdown {
    border: var(--ms-border-width, 1px) solid #374151
}

.multiselect,
.multiselect-dropdown {
    border: var(--ms-border-width, 1px) solid #d1d5db
}

.multiselect-option.is-pointed {
    background-color: #34d399;
}

.multiselect-tag {
    color: #1e293b;
    font-size: 0.75rem !important;
}

.multiselect-tag.is-user {
    padding: 5px 8px;
    border-radius: 22px;
    background: #34d399;
    margin: 3px 3px 8px;
}

.multiselect-tag.is-user img {
    width: 18px;
    border-radius: 50%;
    height: 18px;
    margin-right: 8px;
    border: 2px solid #ffffffbf;
}

.multiselect-tag.is-user i:before {
    color: #1e293b;
    border-radius: 50%;
    ;
}

.user-image {
    margin: 0 6px 0 0;
    border-radius: 50%;
    height: 22px;
}
</style>
