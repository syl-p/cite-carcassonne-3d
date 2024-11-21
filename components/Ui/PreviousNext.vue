<template>
  <div class="flex w-full justify-start space-x-3 text-sm">
    <NuxtLink
      v-if="prev"
      :to="prev._path"
      class="flex items-center justify-center space-x-3 rounded-full border border-black p-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5 8.25 12l7.5-7.5"
        />
      </svg>
      <span class="sr-only"> Éléments Précédent </span>
    </NuxtLink>
    <NuxtLink
      v-if="next"
      :to="next._path"
      class="flex items-center justify-center space-x-3 rounded-full border border-black p-4"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m8.25 4.5 7.5 7.5-7.5 7.5"
        />
      </svg>
      <span class="sr-only"> Éléments Suivant </span>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
const { prev, next } = useContent();
</script>
