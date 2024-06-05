<script setup>
const props = defineProps({
    steps: {
        type: Number,
        required: true,
    },
    modelValue: Number,
})

</script>

<template>
    <div class="flex space-x-4 items-center">
        <template v-for="(step,index) in steps">
            <div class="w-8 h-8 rounded-full  text-white text-xs flex justify-center items-center" :class="modelValue >= index ? 'bg-[#34D399]' : 'bg-[#94A3B8]'">
                {{ step }}
            </div>
            <div class="h-[1px] flex-1" :class="modelValue > index ? 'bg-[#34D399]' : 'bg-[#94A3B8]'" v-if="index + 1 < steps"></div>
        </template>
    </div>
</template>