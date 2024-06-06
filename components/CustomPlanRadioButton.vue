<template>
    <label class="relative cursor-pointer">
            <input type="radio" class="peer sr-only" name="size-choice" v-model="model" :value="value" :checked="selected"/>
            <div
            class="px-6 py-6 overflow-hidden rounded-lg bg-slate-100 active:scale-95 border-2 border-transparent peer-checked:border-[#41D190] peer-checked:bg-[#DAF7D9] peer-checked:text-primary transition-all duration-200">
            <div class="flex justify-between items-start">
                <div class="flex flex-col">
                    <h2 class="text-2xl font-bold">
                        {{ value.name }}
                    </h2>
                    <span>$999/Year</span>
                </div>
                <UBadge label="Best Plan" v-if="selected" size="lg" />
            </div>
        </div>
        </label>
</template>

<script setup>
const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    value: { type: [Boolean, Object, Number] },
    label: { type: String },
});

const selected = ref(false)

const emit = defineEmits(["update:modelValue"]);

if(props.value.isBest){
    selected.value = true
    emit("update:modelValue", props.value);
}

const model = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit("update:modelValue", value);
    },
});
</script>