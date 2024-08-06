<template>
  <TresGroup v-if="data">
    <Natural :features="naturalFeatures" v-if="naturalFeatures" />
    <Urban :features="buildingsFeatures" v-if="buildingsFeatures" />
    <MapWater :features="waterFeatures" v-if="waterFeatures"/>
  </TresGroup>
  <MapTerrain />
</template>

<script setup lang="ts">
import Natural from "~/components/Map/Natural.vue";
import Urban from "./Map/Urban.vue";
const { data } = await useFetch("/api/osm_data");

const naturalFeatures = computed(() => {
  return data.value && data.value.natural ? data.value.natural.features : [];
});


const waterFeatures = computed(() => {
  return data.value && data.value.water ? data.value.water.features : [];
});

const buildingsFeatures = computed(() => {
  return data.value && data.value.buildings
    ? data.value.buildings.features
    : [];
});
</script>
