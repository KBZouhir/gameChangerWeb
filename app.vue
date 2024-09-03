<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { locale, setLocale } = useI18n()
const { $moment } = useNuxtApp()
$moment.locale('fr')

 
useHead( {
  title: '',
  meta: [
    { charset: 'utf-8' },
    { charset: 'theme-color' , content:'#ffffff'},
    { charset: 'msapplication-TileColor' , content:'#ffffff'},
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    {
      hid: 'description',
      name: 'description',
      content: 'Shop'
    }
  ],
  bodyAttrs:{
    class:"handheld-toolbar-enabled"
  },
  link:[
    // { rel: 'apple-touch-icon', sizes:"180x180", href:"/apple-touch-icon.png" },
    // { rel: 'icon', type: 'image/png', sizes:"32x32", href:"/favicon-32x32.png" },
    // { rel: 'icon', type: 'image/png', sizes:"16x16", href:"/favicon-16x16.png" },
    // { rel: 'mask-icon', color: '#fe6a6a', href: '/safari-pinned-tab.svg' },
    
    {
      rel: "stylesheet",
      href:'/css/main.css',
      head: true,
    }
  ]
});


</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}

.is-scrollbar-hidden{
  scrollbar-width: none;
}

</style>