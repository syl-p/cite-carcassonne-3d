<template>
  <section class="font-serif transition-all">
    <div
      class="bg-[#fdfcf5] fixed w-full h-full transition-all -z-10"
      :style="{ opacity: scrollOverHeaderPourcent / 100 }"
    ></div>
    <header class="h-[200vh] relative w-full transition-all" ref="headerRef">
      <div
        v-show="scrollOverHeaderPourcent < 50"
        class="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-screen w-full flex flex-col justify-center items-center"
      >
        <div class="flex-1 flex flex-col justify-center items-center">
          <p>Les ramparts</p>
          <h1 class="text-4xl lg:text-7xl">{{ page.title }}</h1>
          <p>{{ scrollOverHeaderPourcent }}</p>
        </div>
        <div class="pb-28">
          <p class="text-xl mb-5">En savoir plus</p>
          <div class="mx-auto text-center w-full">
            <svg
              class="mx-auto"
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fill-rule="evenodd"
              clip-rule="evenodd"
            >
              <path
                d="M11 21.883l-6.235-7.527-.765.644 7.521 9 7.479-9-.764-.645-6.236 7.529v-21.884h-1v21.883z"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
    <article class="prose container mx-auto my-24 prose-h1:text-7xl z-10">
      <ContentDoc />

      <footer>
        <NuxtLink v-if="prev" :to="prev._path">Précédent</NuxtLink>
        <NuxtLink v-if="next" :to="next._path">Suivant</NuxtLink>
      </footer>
    </article>
  </section>
</template>

<script setup lang="ts">
const { prev, next, page } = useContent();
import { useWindowScroll } from "@vueuse/core";
const { x, y } = useWindowScroll();
const headerRef: Ref<HTMLElement | null> = ref(null);
const scrollOverHeaderPourcent = ref(0);

watch([x, y], (newValue) => {
  if (headerRef.value) {
    const value = (newValue[1] / headerRef.value.scrollHeight) * 100;
    const pourcent = Math.min(Math.max(value, 0), 100);
    scrollOverHeaderPourcent.value = Math.round(pourcent);
  }
});
</script>
