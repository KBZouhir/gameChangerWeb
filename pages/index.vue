<script setup>
import { useNuxtApp } from '#app';
const { $auth, $RecaptchaVerifier, $signInWithPhoneNumber } = useNuxtApp();

const phoneNumber = ref('');
const otp = ref('');
const otpSent = ref(false);

onMounted(() => {
    window.recaptchaVerifier = new $RecaptchaVerifier($auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            console.log(response);
        }
    });
});

const sendOtp = async () => {
    const appVerifier = window.recaptchaVerifier;
    try {
        await $signInWithPhoneNumber($auth, phoneNumber.value, appVerifier);
        otpSent.value = true;
    } catch (error) {
        console.error('Error during signInWithPhoneNumber', error);
    }
};

const verifyOtp = async () => {
    const code = otp.value;
    try {
        const result = await window.confirmationResult.confirm(code);
        console.log('User signed in successfully:', result.user);
    } catch (error) {
        console.error('Error during confirmationResult', error);
    }
};
</script>

<template>
    <div>
        <form @submit.prevent="sendOtp">
            <input v-model="phoneNumber" placeholder="Enter phone number" />
            <div id="recaptcha-container"></div>
            <button type="submit">Send OTP</button>
        </form>

        <form v-if="otpSent" @submit.prevent="verifyOtp">
            <input v-model="otp" placeholder="Enter OTP" />
            <button type="submit">Verify OTP</button>
        </form>
    </div>
</template>