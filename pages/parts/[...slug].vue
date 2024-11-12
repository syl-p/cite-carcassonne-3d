<template>
  <Transition name="fade">
    <article>
      <header class="relative w-full transition-all">
        <h1 class="my-3 border-b-black font-spectral text-6xl">
          {{ page.title }}
        </h1>
        <UiPreviousNext />
      </header>

      <section
        class="prose prose-lg prose-h1:font-spectral prose-h1:text-7xl prose-h2:font-spectral prose-h2:text-4xl prose-p:text-black"
      >
        <ContentDoc />
      </section>
    </article>
  </Transition>
</template>

<script setup lang="ts">
const { page, toc } = useContent();
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
