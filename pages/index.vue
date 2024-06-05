<template>
    <input
      type="text"
      ref="autocompleteInput"
      @input="handleInput"
      placeholder="Enter an address"
      style="width: 100%; padding: 8px;"
    />
    <GMapMap
      :center="mapCenter"
      :zoom="12"
      style="width: 100%; height: 500px"
    >
      <GMapMarker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
        :draggable="true"
        @dragend="onMarkerDragEnd(index, $event)"
      />
    </GMapMap>
  </template>
  
  <script setup>  
  // Initial map center
  const mapCenter = ref({ lat: 37.7749, lng: -122.4194 })
  
  // Markers array
  const markers = ref([
    { position: { lat: 37.7749, lng: -122.4194 } }
  ])
  
  
  // Handle marker drag end
  const onMarkerDragEnd = (index, event) => {
    console.log(event);
    const newLat = event.latLng.lat()
    const newLng = event.latLng.lng()
    markers.value[index].position = { lat: newLat, lng: newLng }
  }
  
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  