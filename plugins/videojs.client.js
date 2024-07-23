import { defineNuxtPlugin } from '#app'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('videojs', videojs)
})