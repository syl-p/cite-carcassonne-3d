<template>
  <div class="mb-3 flex w-full justify-between">
    <NuxtLink v-if="prev" :to="prev._path">Précédent</NuxtLink>
    <NuxtLink v-if="next" :to="next._path">Suivant</NuxtLink>
  </div>
</template>
<script setup lang="ts">
const { prev, next } = useContent();
</script>
