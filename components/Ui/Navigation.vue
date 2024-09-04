<template>
  <div
    class="z-[100] flex flex-col w-full h-screen fixed top-0 left-0 justify-center px-8"
  >
    <nav class="flex">
      <ul class="space-y-4">
        <li v-for="page of pages">
          <NuxtLink
            :to="page._path"
            @click="$emit('close')"
            class="text-xl uppercase"
          >
            {{ page.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { pages } = defineProps(["pages"]);
</script>
