<template>

  <TresGroup v-if="features">
    <template  v-for="element of features">
      <Shape
          :depth='element.properties["building:levels"] ?? 1'
          :coordinates="element.geometry.coordinates" color="gray"
          v-if="element.geometry && element.geometry.coordinates[0][1] && Array.isArray(element.geometry.coordinates[0][1])"/>
    </template>
  </TresGroup>
</template>

<script setup lang="ts">
  import Shape from "~/components/Map/Shape.vue";
  const {features} = defineProps(["features"]);
</script>