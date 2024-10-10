<template>
  <article class="pt-12">
    <header
      class="relative mb-10 w-full transition-all lg:grid lg:grid-cols-8 lg:gap-8"
      ref="headerRef"
    >
      <div class="flex-1 lg:col-span-6">
        <h1 class="mb-3 font-spectral text-5xl lg:text-8xl">
          {{ page.title }}
        </h1>
        <p>{{ page.description }}</p>
      </div>
      <div>
        <h3 class="mb-3 text-xl font-bold uppercase underline">Navigation</h3>
        <ul class="space-y-1">
          <li>Introduction</li>
          <li>Introduction</li>
          <li>Introduction</li>
          <li>Introduction</li>
        </ul>
      </div>
    </header>
    <section
      class="prose prose-h1:font-spectral prose-h1:text-7xl prose-h2:font-spectral prose-h2:text-4xl"
    >
      <ContentDoc />

      <footer class="flex w-full justify-between">
        <NuxtLink v-if="prev" :to="prev._path">Précédent</NuxtLink>
        <NuxtLink v-if="next" :to="next._path">Suivant</NuxtLink>
      </footer>
    </section>
  </article>
</template>

<script setup lang="ts">
const { prev, next, page } = useContent();
</script>
