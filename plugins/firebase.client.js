// plugins/firebase.client.js
import { defineNuxtPlugin } from '#app'
import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword  } from 'firebase/auth'
import { getMessaging, getToken, onMessage } from '@firebase/messaging'



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
  const messaging = getMessaging(app)

  nuxtApp.provide('auth', auth)
  nuxtApp.provide('db', db)
  nuxtApp.provide('RecaptchaVerifier', RecaptchaVerifier)
  nuxtApp.provide('signInWithPhoneNumber', signInWithPhoneNumber)
  nuxtApp.provide('signInWithEmailAndPassword', signInWithEmailAndPassword)
  nuxtApp.provide('getToken', getToken)
  nuxtApp.provide('messaging', messaging)
  nuxtApp.provide('onMessage', onMessage)
})
