<template>
  <Transition name="fade">
    <article class="lg:mt-20">
      <header class="relative mb-8 w-full p-8 transition-all">
        <NuxtLink to="/" class="text-xl lg:text-3xl"
          >Découvrir la cité</NuxtLink
        >
        <h1 class="mb-3 border-b-black text-4xl font-bold lg:text-6xl">
          {{ page.title }}
        </h1>
        <p>{{ page.description }}</p>
      </header>

      <section>
        <UiGalerie />
      </section>

      <section class="prose prose-lg p-8 prose-p:text-black">
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
