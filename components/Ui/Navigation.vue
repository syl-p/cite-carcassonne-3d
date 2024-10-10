<template>
  <div class="z-50 h-screen w-full p-4">
    <nav>
      <ul class="space-y-4">
        <li v-for="(page, index) of pages">
          <NuxtLink
            :to="page._path"
            @click="$emit('close')"
            class="text-xl uppercase opacity-[0.5] transition-all hover:text-3xl hover:opacity-[1]"
          >
            {{ index }}. {{ page.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const { pages } = defineProps(["pages"]);
</script>
