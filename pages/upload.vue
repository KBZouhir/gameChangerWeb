<template>
    <div class="upload-container">
      <input type="file" id="file-input" @change="onFileChange" accept="image/*" hidden />
      <label for="file-input" class="upload-button">Choose File</label>
      <span class="file-name">{{ selectedFileName }}</span>
      <button @click="uploadImage" class="submit-button">Upload</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useFetch } from '#app'
  
  const selectedFile = ref(null)
  const selectedFileName = ref('No file chosen')
  
  const onFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      selectedFile.value = file
      selectedFileName.value = file.name
    }
  }
  
  const uploadImage = async () => {
    if (!selectedFile.value) {
      alert('Please select a file first.')
      return
    }
  
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    formData.append('type', 'profile') // or 'cover' depending on your use case
  
    try {
      const { data, error } = await useFetch('/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'Bearer your_api_token',
        }
      })
  
      if (error) {
        console.error('Upload failed:', error)
      } else {
        console.log('Upload successful:', data)
      }
    } catch (err) {
      console.error('An error occurred:', err)
    }
  }
  </script>
  
  <style scoped>
  .upload-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }
  
  .upload-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  .upload-button:hover {
    background-color: #45a049;
  }
  
  .file-name {
    margin-bottom: 20px;
  }
  
  .submit-button {
    background-color: #008CBA;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .submit-button:hover {
    background-color: #007B9E;
  }
  </style>
  