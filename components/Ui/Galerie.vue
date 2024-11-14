<template>
  <div class="mb-8 h-80 w-full border"></div>
  <div
    class="group relative flex cursor-pointer items-center justify-end space-x-2 px-12"
  >
    <span
      class="relative z-10 text-sm font-bold uppercase leading-6 tracking-wide before:absolute before:-left-6 before:-top-1/2 before:-z-10 before:h-12 before:w-12 before:rounded-full before:bg-yellow-400 before:content-[''] group-hover:underline"
    >
      Participer a la galerie photo de cet élément
    </span>

    <!-- Flèche -->
    <div class="relative">
      <span class="inline-block transition-transform group-hover:translate-x-1">
        ➔
      </span>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
