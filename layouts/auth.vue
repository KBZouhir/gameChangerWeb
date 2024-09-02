<template>

  <div class="relative flex flex-col min-h-screen bg-[#f1f5f9] dark:bg-[#0f172a]">
    <!-- <img class="absolute top-0 left-0 z-10" :src="greenBlurEffect" alt="" srcset=""> -->
    <NuxtLoadingIndicator />
    <NuxtSnackbar />
    <PartialsAuthNavbar />
    <div class="relative flex-1 z-20">
      <div class="relative">
        <NuxtPage />
      </div>
    </div>
    <!-- <UNotifications class="z-20"/> -->
    <!-- <img class="absolute top-0 right-0 z-10" :src="yellowBlurEffect" alt="" srcset=""> -->

  </div>
</template>

<script setup>
import greenBlurEffect from '~/assets/img/green-blur-effect.png'
import yellowBlurEffect from '~/assets/img/yellow-blur-effect.png'

import { registerToken } from '~/composables/store/useApiAuth'


const toast = useToast()


const { $messaging, $getToken, $onMessage } = useNuxtApp()


const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {

      $getToken($messaging, { vapidKey: 'BJXJpMYEoxBnfQRx74LugwKT6Bs29NW39m6Wh8exW1bb8nrMElyc4c8VfuCj-ZnhZSOuiEiiKsuq9djzsLVSqgU' }).then((currentToken) => {
        if (currentToken) {
          RegisterFCMToken(currentToken)
        } else {
          console.log('No registration token available. Request permission to generate one.')
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err)
      })

    } else {
      console.error('Permission denied')
    }
  } catch (error) {
    console.error('Error requesting permission:', error)
  }
}

const RegisterFCMToken = async (token) => {
  await registerToken({ device_token: token })
}

onMounted(() => {
  requestPermission()

  $onMessage($messaging, (payload) => {
    console.log("Message on Clinet ", payload);
    toast.add({
      id: payload.notification.messageId,
      description: payload.notification.body,
      avatar: { src: payload.data.image_url },
      icon: 'i-octicon-desktop-download-24',
      color: "primary",
      timeout:"3000"
    })
  })
})

</script>