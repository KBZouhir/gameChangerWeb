<template>
    <div>
        <input ref="phoneInput" type="tel" @blur="validatePhone" />

    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';

const phoneInput = ref(null);

onMounted(() => {
    const iti = intlTelInput(phoneInput.value, {
        // Your desired options here
        initialCountry: 'auto',
        geoIpLookup: (success, failure) => {
            fetch('https://ipinfo.io/json')
                .then((response) => response.json())
                .then((data) => success(data.country))
                .catch(failure);
        },
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js', // Use the latest utils script
    });

    phoneInput.value.addEventListener('countrychange', () => {
        // Trigger validation on country change
        validatePhone();
    });

    onBeforeUnmount(() => {
        if (iti) {
            iti.destroy();
        }
    });
});

const validatePhone = () => {
    if (phoneInput.value) {
        const isValid = iti.isValidNumber();
        const phoneNumber = iti.getNumber();

        if (!isValid) {
            // Handle invalid phone number
            console.error('Invalid phone number');
        } else {
            // Handle valid phone number
            console.log('Valid phone number:', phoneNumber);
        }
    }
};
</script>


<style scoped>
.iti{
    width: 100% !important;
}

.iti__tel-input{
    width: 100%;
    border: 1px solid #d1d5db;
    padding: 0.625rem;
    border-radius: 8px;
}

.iti__selected-country{
    background-color: #d1d5db !important;
}

</style>