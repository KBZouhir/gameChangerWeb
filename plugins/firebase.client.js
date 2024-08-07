// plugins/firebase.client.js
import { defineNuxtPlugin } from '#app'
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'


export default defineNuxtPlugin((nuxtApp) => {
  const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } = useRuntimeConfig().public;
  const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
  }

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)

  nuxtApp.provide('auth', auth)
  nuxtApp.provide('db', db)
  nuxtApp.provide('RecaptchaVerifier', RecaptchaVerifier)
  nuxtApp.provide('signInWithPhoneNumber', signInWithPhoneNumber)
})
