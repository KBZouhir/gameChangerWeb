<template>
    <label class="relative cursor-pointer">
            <input type="checkbox" class="peer sr-only" name="size-choice" v-model="model" :value="value" />
            <div
                class="py-2 px-4 overflow-hidden rounded-lg bg-white border-[1px] border-[#A1AEC1]  active:scale-95 peer-checked:border-[#94A3B8] peer-checked:bg-[#0F1454] peer-checked:text-white">
                {{ label }}
            </div>
        </label>
</template>

<script setup>
const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    value: { type: [Boolean, Object, Number] },
    label: { type: String },
});
const emit = defineEmits(["update:modelValue"]);
const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>