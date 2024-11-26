<template>
  <div
    class="text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400"
  >
    <ul class="-mb-px flex flex-wrap">
      <li class="me-2">
        <NuxtLink
          :to="`${path}`"
          class="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
          >Découvrir</NuxtLink
        >
      </li>
      <li class="me-2">
        <NuxtLink
          :to="`${path}/media`"
          class="inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500"
          aria-current="page"
          >Galerie</NuxtLink
        >
      </li>
      <li class="me-2">
        <NuxtLink
          :to="`${path}/comments`"
          class="inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300"
          >Commentaires</NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { path } = defineProps(["path"]);
</script>
