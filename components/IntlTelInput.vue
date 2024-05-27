<template>
    <div class="flex flex-col">
        <label for="phone" class="text-blueGray-900 dark:text-slate-300 text-sm font-semibold mb-2">
            Phone number
        </label>
        <input ref="phoneInput" type="tel" id="phone" @input="onInput" autofocus class="text-sm" :value="modelValue"
            @blur="validatePhone" />
        <!-- <span v-if="errors.has('phone')">{{ errors.first('phone') }}</span> -->
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

const props = defineProps({
    modelValue: String,
});

const emits = defineEmits(['update:modelValue', 'hidePhone']);

const phoneInput = ref(null);
const iti = ref({});


onMounted(() => {
    iti.value = intlTelInput(phoneInput.value, {
        initialCountry: 'dz',
        utilsScript: "~/node_modules/intl-tel-input/build/js/utils.js",
    });

    phoneInput.value.addEventListener('countrychange', () => {
        validatePhone();
    });

    phoneInput.value.focus()

    onBeforeUnmount(() => {
        if (iti.value) {
            iti.value.destroy();
        }
    });
});

const onInput = (event) => {
    const input = event.target;
    const sanitizedValue = event.target.value.replace(/[^0-9+]/g, '');
    input.value = sanitizedValue;
    emits('update:modelValue', sanitizedValue);
};


const validatePhone = () => {
    console.log(iti.value.isValidNumber());
//   if (phoneInput.value && iti.value) {
//     const isValid = iti.value.isValidNumber();
//     if (!isValid) {
//       validationMessage.value = 'Invalid phone number';
//     } else {
//       validationMessage.value = '';
//       const phoneNumber = iti.value.getNumber();
//       emits('update:modelValue', phoneNumber);
//     }
//   }
}

watch(() => props.modelValue, (newValue) => {
    if (newValue.trim() == "") {
        emits('hidePhone')
    }
    if (phoneInput.value) {
        phoneInput.value.value = newValue;
    }
});
</script>


<style scoped>
.iti {
    width: 100% !important;
}

.iti__tel-input {
    width: 100%;
    border: 1px solid #d1d5db;
    padding: 0.500rem;
    border-radius: 8px;
}

.iti__tel-input:focus-visible {
    outline: 2px solid #22c55e !important;
    border-radius: 3px !important;
}
</style>