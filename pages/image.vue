<template>
  <div class="min-h-svh">
    <input ref="fileInput" type="file" hidden accept="image/*" multiple @change="handleFileChange" />

    <div class="flex space-x-4 items-center pt-4">
        <UButton @click="triggerFileInput" icon="i-heroicons-photo" size="xs" color="primary" square variant="ghost" 
            class="hover:bg-primary dark:text-white transition-all duration-300 ease-in-out hover:text-white px-2" label="Image" />
        <UButton icon="i-heroicons-video-camera" size="xs"
            class="hover:bg-primary dark:text-white hover:text-white px-2" color="primary" square
            variant="ghost" label="Video" />
    </div>

    <div v-if="compressedFiles.length > 0" class="my-4">
        <div
            class="flex flex-nowrap overflow-x-auto space-x-4 items-center scrollbar-thin scrollbar-h-2 scrollbar-thumb-rounded-full scrollbar-thumb-slate-300/80 scrollbar-track-slate-100">
            <div v-for="(file, index) in compressedFiles" :key="index"
                class="relative group w-32 h-32 flex-none ring-1 ring-gray-200 dark:ring-gray-800 shadow rounded-md overflow-hidden transition-all duration-150 ease-in-out">
                <div class="w-full h-full overflow-hidden border-e">
                    <img :src="file.preview" alt="Selected Image"
                        class="object-cover w-full h-full" />
                </div>
                <div v-if="file.progress < 100" class="absolute w-full h-full bg-white/80 top-0 left-0 flex justify-center items-center">
                    <UButton loading variant="link" disabled>Compressing...</UButton>
                </div>
                <div class="bg-primary/75 w-full h-full absolute top-0 group-hover:flex items-center justify-center hidden">
                    <UButton @click="removeImage(index)" icon="i-heroicons-trash" class="bg-transparent text-red-400 hover:bg-red-700/5 hover:text-red-500 text-xs dark:text-white" size="2xs" color="primary" square variant="soft" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import imageCompression from 'browser-image-compression'

const compressedFiles = ref([])
const fileInput = ref(null)

definePageMeta({
    layout: 'guest',
    title: 'Forgot password',
    middleware: []
})

const triggerFileInput = () => {
  fileInput.value.click()
}


const handleFileChange = async (event) => {
  const selectedFiles = Array.from(event.target.files)

  for (const file of selectedFiles) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/webp',
      onProgress: (progress) => {
        const index = compressedFiles.value.findIndex(f => f.originalFile === file)
        if (index !== -1) {
          compressedFiles.value[index].progress = progress
        }
      }
    };

    const newFileObj = { originalFile: file, progress: 0, preview: '' }
    compressedFiles.value.push(newFileObj)

    try {
      const index = compressedFiles.value.findIndex(f => f.originalFile === file)
      const preview = URL.createObjectURL(file)
      compressedFiles.value[index].preview = preview
      const compressedFile = await imageCompression(file, options)
      compressedFiles.value[index].file = compressedFile
    } catch (error) {
      console.error('Error compressing file:', error);
    }
  }
};
const resetFileInput = () => {
  fileInput.value.value = null;
};

const removeImage = (index) => {
  compressedFiles.value.splice(index, 1);
  
  if (compressedFiles.value.length === 0) {
    resetFileInput();
  }
};

const uploadImages = async () => {
  if (!compressedFiles.value.length) {
    alert('No files selected for upload.');
    return;
  }

  const formData = new FormData();
  compressedFiles.value.forEach((item, index) => {
    formData.append(`file${index}`, item.file);
  });

  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    console.log('Images uploaded successfully:', data);
  } catch (error) {
    console.error('Error uploading files:', error);
  }
};
</script>

<style scoped>
.preview {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.preview img {
  max-width: 200px;
  margin-right: 10px;
}

.progress-container {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
  height: 10px;
  margin-right: 10px;
}

.progress-bar {
  height: 100%;
  background-color: #4caf50;
}
</style>
