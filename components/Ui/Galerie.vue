<template>
  <div class="grid grid-cols-3 gap-3">
    <UiGalerieCard :path="medium.path" v-for="medium in data" />
  </div>
</template>
<script lang="ts" setup>
const { data } = await useFetch("/api/media/all");
</script>
