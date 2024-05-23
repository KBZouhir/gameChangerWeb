<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        required: true,
        default: 'Label'
    },
    placeholder: {
        type: String,
        required: true,
        default: 'Placeholder'
    },
    startIcon: {
        type: Function,
        default: null
    },

})

const classList = ['block', 'w-full', 'p-4', 'text-sm', 'text-gray-900', 'border', 'border-gray-200', 'rounded-lg', 'focus:ring-blue-500', 'focus:border-blue-500' ]

if(props.startIcon){
    classList.push('ps-10')
}

</script>

<template>
    <div class="flex flex-col">
        <label class="text-sm" :for="name">{{ label }}</label>
        <div class="relative">
            <div v-if="startIcon" class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <component :is="startIcon" />
            </div>
            <input :type="type" :id="name" :class="classList" :placeholder required />
            <div class="absolute end-2.5 bottom-2.5"></div>
        </div>
    </div>
</template>