<template>
  <div class="hidden lg:flex w-full fixed top-1/2 left-0 space-x-5 px-8">
    <ul class="">
      <li>
        <NuxtLink to="/" active-class="underline"> Tout </NuxtLink>
      </li>
      <li>Enceintes</li>
      <li>Intérieur</li>
    </ul>
    <nav class="flex">
      <ul>
        <li v-for="page of pages">
          <NuxtLink :to="page._path" active-class="underline">
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
