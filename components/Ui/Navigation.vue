<template>
  <div
    class="z-[100] lg:flex lg:flex-col w-full h-screen fixed top-0 left-0 justify-center px-8 bg-white"
  >
    <button @click="$emit('close')" class="uppercase absolute left-8 top-8">
      Fermer
    </button>
    <nav class="flex">
      <ul class="space-y-4">
        <li v-for="page of pages">
          <NuxtLink
            :to="page._path"
            active-class="underline"
            @click="$emit('close')"
            class="text-4xl uppercase"
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
