<template>
    <div>
        <Multiselect mode="multiple" v-model="value" multiple placeholder="Select your character" label="name" :options="data">
            <template v-slot:singlelabel="{ value }">
                <div class="multiselect-single-label">
                    <img class="character-label-icon" :src="value.icon"> {{ value.name }}
                </div>
            </template>

            <template v-slot:option="{ option }">
                <img class="character-option-icon" :src="option.icon"> {{ option.name }}
            </template>
        </Multiselect>
    </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'

const props = defineProps({
    items: Object,
});

console.log(props.items.data);


const selectedValues = ref()

const data = ref(props.items.data.map(user => ({
  value: user.id,
  name: user.full_name,
})))
const selectedOptions = ref([])
const loading = ref(false)


</script>

<style>
@import '@vueform/multiselect/themes/default.css';
</style>
