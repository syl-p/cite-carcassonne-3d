<template>
  <div
    class="fixed left-0 top-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-primary p-4"
  >
    <div class="mb-3 mb-6 border-b border-gray-300 pb-6">
      <h3 class="text-3xl">Structure de la cité</h3>
    </div>
    <nav>
      <ul class="space-y-4">
        <li v-for="(page, index) of pages">
          <NuxtLink
            :to="page._path"
            @click="$emit('close')"
            class="group flex items-center space-x-3 align-middle"
          >
            <span
              class="flex h-10 w-10 flex-col items-center justify-center rounded-full border border-yellow-500 bg-white transition duration-500 ease-in-out group-hover:bg-yellow-500"
              >{{ index }}</span
            >
            <span class="block group-hover:underline">{{ page.title }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { pages } = defineProps(["pages"]);
</script>
