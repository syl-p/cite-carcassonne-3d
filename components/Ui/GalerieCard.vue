<template>
  <div>
    <img :src="path" class="h-auto max-w-full rounded-lg" />
  </div>
</template>

<script setup lang="ts">
const { path } = defineProps(["path"]);
</script>
