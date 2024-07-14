<template>
  <Natural :features="naturalFeatures"/>
  <Buildings :features="buildingsFeatures"/>
</template>

<script setup lang="ts">
  import Buildings from "~/components/Map/Buildings.vue";
  import Natural from "~/components/Map/Natural.vue";
  const {data} = await useFetch('/api/osm_data')

  const naturalFeatures = computed(() => {
    return data.value && data.value.natural ? data.value.natural.features : []
  })

  const buildingsFeatures = computed(() => {
    return data.value && data.value.buildings ? data.value.buildings.features : []
  })
</script>
