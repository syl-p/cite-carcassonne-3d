<template>
  <article class="pt-10 px-6 lg:px-0">
    <header
      class="relative mb-10 w-full transition-all lg:grid lg:grid-cols-8 lg:gap-8"
      ref="headerRef"
    >
      <div class="flex-1 lg:col-span-6">
        <UiPreviousNext />
        <h1 class="mb-3 font-spectral text-5xl lg:text-8xl">
          {{ page.title }}
        </h1>
        <p>{{ page.description }}</p>
      </div>
      <div class="hidden lg:col-span-2 lg:block">
        <h3 class="mb-3 text-2xl font-bold uppercase underline">Navigation</h3>
        <ul v-if="toc && toc.links">
          <li v-for="link in toc.links" :key="link.text">
            <a :href="`#${link.id}`" class="font-bold hover:underline">
              {{ link.text }}
            </a>
          </li>
        </ul>
      </div>
    </header>

    <section
      class="prose prose-lg prose-h1:font-spectral prose-h1:text-7xl prose-h2:font-spectral prose-h2:text-4xl"
    >
      <ContentDoc />
    </section>
  </article>
</template>

<script setup lang="ts">
const { prev, next, page, toc } = useContent();
</script>
