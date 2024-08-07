<template>
    <label class="relative cursor-pointer">
        <input type="checkbox" class="peer sr-only" name="size-choice" v-model="model" :value="value" />
        <div
            class="py-2 px-4 overflow-hidden rounded-lg bg-white dark:bg-slate-800 dark:border-slate-900 border-[1px] border-[#A1AEC1]  active:scale-95 peer-checked:border-slate-950 peer-checked:bg-slate-900 peer-checked:text-white">
            {{ label }}
        </div>
    </label>
</template>

<script setup>

const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    value: { type: [Boolean, Object, Number] },
    label: { type: String },
})

const emit = defineEmits(["update:modelValue"])

const model = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit("update:modelValue", value)
    },
})
</script>