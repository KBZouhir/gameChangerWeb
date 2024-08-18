<template>
  <div class="no-video">
    <p>{{ username }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  username: String
});
</script>

<style scoped>
.no-video {
  background-color: #2b3f56;
  border-radius: 16px;
  aspect-ratio: 16 / 9;
  color: #fff;
  position: relative;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 2px 0;
}
</style>