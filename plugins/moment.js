import moment from 'moment'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('moment', moment)
})