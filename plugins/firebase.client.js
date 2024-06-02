// plugins/firebase.client.js
import { defineNuxtPlugin } from '#app';
import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import firebaseConfig from '~/firebaseConfig';

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
  nuxtApp.provide('auth', auth);
  nuxtApp.provide('RecaptchaVerifier', RecaptchaVerifier);
  nuxtApp.provide('signInWithPhoneNumber', signInWithPhoneNumber);
});
