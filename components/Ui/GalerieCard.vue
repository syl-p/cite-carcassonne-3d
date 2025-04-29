<template>
  <img @click.prevent="emit('selected', index)" :src="`/uploads/${item.path}`" class="h-full w-full rounded-xl object-cover" />
</template>

<script setup lang="ts">
const emit = defineEmits(["selected"]);
const { item, index } = defineProps(["item", "index"]);
</script>
