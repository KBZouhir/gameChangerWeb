<template>
  <div>
    <FilePond
      name="test"
      ref="pond"
      label-idle="Drop files here..."
      v-bind:allow-multiple="true"
      accepted-file-types="image/jpeg, image/png"
      server="/api"
      chunkUploads="true"
      chunkSize= 2500
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
      v-on:addfilestart="fileadded"
      credits= "false"
    />
  </div>
</template>

<script setup>
import vueFilePond from "vue-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

const pond = ref(null);
const FilePond = vueFilePond(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType
);

const myFiles = [];

const handleFilePondInit = () => {
  console.log("FilePond has initialized");
  // FilePond instance methods are available on `this.$refs.pond`
}

const fileadded = () => {
  console.log("FilePond has been added");
  console.log(pond.value);
  // FilePond instance methods are available on `this.$refs.pond`
}

</script>

<style scoped>
/* Add your styles here */
</style>