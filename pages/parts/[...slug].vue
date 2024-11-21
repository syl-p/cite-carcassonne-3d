<template>
  <Transition name="fade">
    <article class="mt-8 lg:mt-24">
      <header class="relative mb-3 w-full px-12 transition-all">
        <NuxtLink to="/" class="text-xl lg:text-2xl"
          >Découvrir la cité</NuxtLink
        >
        <h1 class="mb-3 border-b-black text-4xl font-bold lg:text-6xl">
          {{ page.title }}
        </h1>
        <p>{{ page.description }}</p>
      </header>

      <section class="mb-3">
        <UiGalerie />
      </section>

      <section class="prose prose-lg px-12 prose-p:text-black">
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
