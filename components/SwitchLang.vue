<script setup>
import { useNuxtApp } from '#app'
const { locale, setLocale } = useI18n()
const { $i18n } = useNuxtApp()

const locales = $i18n.locales

</script>

<template>
    <ul>
        <li v-for="locale in locales" :key="locale.code" @click="setLocale(locale.code)">
            <span>{{ locale.flag }}</span> {{ locale.name }} ({{ locale.code }})
        </li>
    </ul>
</template>