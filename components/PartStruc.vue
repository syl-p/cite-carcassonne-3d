<template>
  <Transition name="fade">
    <article class="mt-8 lg:mt-24">
      <header class="relative mb-3 w-full px-8 transition-all lg:px-12">
        <NuxtLink to="/public" class="text-xl lg:text-2xl"
          >Découvrir la cité</NuxtLink
        >
        <h1 class="mb-3 border-b-black text-4xl font-bold lg:text-6xl">
          {{ page.title }}
        </h1>
        <p>{{ page.description }}</p>
      </header>

      <nav class="px-8 lg:px-12">
        <UiPartNavigation :path="page._path" />
      </nav>

      <slot />
    </article>
  </Transition>
</template>
<script setup lang="ts">
const { page, toc } = useContent();
</script>
