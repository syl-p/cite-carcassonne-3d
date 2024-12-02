<template>
  <img :src="path" class="h-full w-full rounded-xl object-cover" />
</template>

<script setup lang="ts">
const { path } = defineProps(["path"]);
</script>
