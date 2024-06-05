<script setup>
import { useNuxtApp } from '#app';
const { $auth, $RecaptchaVerifier } = useNuxtApp();

const recaptchaToken = ref(null);

onMounted(() => {
    window.recaptchaVerifier = new $RecaptchaVerifier($auth, 'recaptcha-container', {
        'size': 'invisible',
    });
});

const getRecaptchaToken = async () => {
    try {
        await window.recaptchaVerifier.render();
        const token = await window.recaptchaVerifier.verify();
        recaptchaToken.value = token;
        console.log(token);
    } catch (error) {
        console.error('Error getting reCAPTCHA token:', error);
    }
};

</script>

<template>
    <div>
        <form @submit.prevent="getRecaptchaToken">
            <div id="recaptcha-container"></div>
            <button type="submit">getRecaptcha Token</button>
        </form>
    </div>
</template>