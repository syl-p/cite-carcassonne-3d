<template>
    <TresGroup v-if="instances">
    </TresGroup>
  </template>
  
  <script setup lang="ts">
  const { features } = defineProps(["features"]);
  const instances: Ref<{id: number, start: number[], end: number[]}[]> = ref(features.map((f, i) => ({
    id: i,
    start: f.geometry && f.geometry.coordinates[0][0]
      ? GpsRelativePosition(f.geometry.coordinates[0][0], CENTER)
      : null,
    end: f.geometry && f.geometry.coordinates[0][1]
      ? GpsRelativePosition(f.geometry.coordinates[0][1], CENTER)
      : null,
  })));

  console.log(instances.value)
  </script>