<template>
  <div
    class="bg-gradient-to-r w-3/6 from-black via-black/80 z-40 flex flex-col h-screen fixed top-0 left-0 justify-center px-8"
  >
    <nav class="flex">
      <ul class="space-y-4">
        <li v-for="(page, index) of pages">
          <NuxtLink
            :to="page._path"
            @click="$emit('close')"
            class="text-xl uppercase transition-all opacity-[0.5] hover:opacity-[1] hover:text-3xl"
          >
            {{index}}. {{ page.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { pages } = defineProps(["pages"]);
</script>
