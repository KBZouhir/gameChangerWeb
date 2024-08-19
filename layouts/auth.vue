<template>

  <div class="relative flex flex-col min-h-screen bg-[#f1f5f9] dark:bg-[#0f172a]">
    <!-- <img class="absolute top-0 left-0 z-10" :src="greenBlurEffect" alt="" srcset=""> -->
    <NuxtLoadingIndicator />
    <NuxtSnackbar />
    <PartialsAuthNavbar />

    <div class="relative flex-1 ">

      <div class="relative">
        <NuxtPage />
      </div>
    </div>

    <!-- <img class="absolute top-0 right-0 z-10" :src="yellowBlurEffect" alt="" srcset=""> -->

  </div>
</template>

<script setup>
import greenBlurEffect from '~/assets/img/green-blur-effect.png'
import yellowBlurEffect from '~/assets/img/yellow-blur-effect.png'


// const { $messaging, $getToken } = useNuxtApp()




// const requestPermission = async () => {
//   try {
//     const permission = await Notification.requestPermission()

//     if (permission === 'granted') {

//       $getToken($messaging, { vapidKey: 'BOiPnnrdnrB1sfs3GFxX7rqIPZXN4i9VZOY78D1IMVwUdNPILavLfl8HdFCaetxcKg5qz9XQ6QFAh6w7vGxbiVo' }).then((currentToken) => {
//         if (currentToken) {
//           console.log(currentToken)
//         } else {
//           console.log('No registration token available. Request permission to generate one.')
//         }
//       }).catch((err) => {
//         console.log('An error occurred while retrieving token. ', err)
//       })

//     } else {
//       console.error('Permission denied')
//     }
//   } catch (error) {
//     console.error('Error requesting permission:', error)
//   }
// }

// onMounted(() => {
//   requestPermission()
// })

</script>