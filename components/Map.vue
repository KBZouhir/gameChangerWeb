<template>
    <div class="px-1">
        <div class="relative">
            <input type="text" ref="autocompleteInput" autofocus placeholder="Enter an address"
                class="relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 form-input rounded-md placeholder-gray-400 dark:placeholder-gray-500 text-base px-3.5 py-2.5 shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 mb-3" />
        
        <GMapMap :center="mapCenter"  :zoom="12" :style="{width: '100%', height: isOpenMap?'360px':'200px',borderRadius:'8px',overflow: 'hidden'}">
            <GMapMarker v-for="(marker, index) in markers"
             :key="index"
             :position="marker.position"
             :draggable="true"
              @dragend="onMarkerDragEnd(index, $event)" />
        </GMapMap>

        </div>
    </div>
</template>

<script setup>
// Initial map center
const mapCenter = ref({ lat: 37.7749, lng: -122.4194 })

const props = defineProps({
    modelValue: { type: [Array, Boolean] },
    isOpenMap: { type: Boolean },
});

const emit = defineEmits(["update:modelValue"]);

const autocompleteInput = ref()
let autocomplete = null
const addressComponents = ref({
    country: '',
    state: '',
    zip_code: '',
    lat: null,
    lng: null,
})

// Markers array
const markers = ref([
    { position: { lat: 37.7749, lng: -122.4194 } }
])


const moveMarker = () => {
    markers.value[0].position.lat = addressComponents.value.lat
    markers.value[0].position.lng = addressComponents.value.lon
    mapCenter.value.lat = addressComponents.value.lat
    mapCenter.value.lng = addressComponents.value.lon
}

const onMarkerDragEnd = (index,event) => {
    console.log(index, event.latLng);

    const geocoder = new google.maps.Geocoder();
    const latLng = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
    };

    geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === "OK") {
            if (results[0]) {
                const place = results[0];
                const components = place.address_components;
                const getAddressComponent = (type) => {
                    return components.find(component => component.types.includes(type))?.long_name || '';
                }

                addressComponents.value = {
                    country: getAddressComponent('country'),
                    city: getAddressComponent('administrative_area_level_1'),
                    zip_code: getAddressComponent('postal_code') || getAddressComponent('administrative_area_level_5') || getAddressComponent('postal_code'),
                    lat: latLng.lat,
                    lon: latLng.lng,
                    address: place.formatted_address
                }

                emit('update:modelValue', addressComponents.value);
            } else {
                console.log("No results found");
            }
        } else {
            console.log("Geocoder failed due to: " + status);
        }
    });
    
}

const initializeAutocomplete = () => {
    if (window.google && window.google.maps && window.google.maps.places) {
        const google = window.google;
        autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value)

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace()

            const components = place.address_components
            const getAddressComponent = (type) => {
                return components.find(component => component.types.includes(type))?.long_name || ''
            }

            addressComponents.value = {
                country: getAddressComponent('country'),
                city: getAddressComponent('administrative_area_level_1'),
                zip_code: getAddressComponent('postal_code') || getAddressComponent('administrative_area_level_5') || getAddressComponent('postal_code'),
                lat: place.geometry.location ? place.geometry.location.lat() : null,
                lon: place.geometry.location ? place.geometry.location.lng() : null,
                address: place.formatted_address
            }

            moveMarker()

            emit('update:modelValue', addressComponents.value)
        })
    } else {
        setTimeout(initializeAutocomplete, 100);
    }
}

const moveCureentMarker = (postion) => {

    markers.value[0].position.lat = postion.coords.latitude
    markers.value[0].position.lng = postion.coords.longitude
    mapCenter.value.lat = postion.coords.latitude
    mapCenter.value.lng = postion.coords.longitude
}

const getCurrentPostion = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(moveCureentMarker, (showError) => {console.log(showError);});
    } else {
        document.getElementById('output').innerHTML = "Geolocation is not supported by this browser.";
    }
}

onMounted(() => {
    initializeAutocomplete()
    getCurrentPostion()
})

</script>

<style scoped>
.pac-container.hdpi{
    display: none !important;
}

.pac-container{
    display: none !important;
}
</style>