<template>
  <main class="relative w-full items-stretch bg-primary text-lg">
    <aside
      class="fixed left-8 top-0 z-50 w-56 shrink-0 py-8 lg:left-0 lg:top-0 lg:block lg:h-screen lg:border-r lg:border-gray-300 lg:bg-primary"
    >
      <div
        class="h-full lg:flex lg:flex-col lg:items-center lg:justify-between"
      >
        <button
          @click="showMenu = !showMenu"
          :class="showMenu ? 'bg-slate-700' : 'bg-yellow-500'"
          class="flex h-24 w-24 flex-col items-center justify-center rounded-full p-8 text-white transition duration-500 ease-in-out"
        >
          <svg
            v-if="!showMenu"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-12"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div class="hidden w-full text-center lg:block">
          <div class="mx-auto h-20 w-20 bg-slate-700 p-10"></div>
          <p class="my-5 font-spectral uppercase">La cité en 3D</p>
          <div class="mx-auto my-5 h-1 w-12 bg-yellow-500"></div>
          <NuxtLink to="/">Accueil </NuxtLink>
        </div>
      </div>
    </aside>
    <section class="relative min-h-screen p-6 lg:ml-56">
      <UiNavigation :pages="data" v-if="showMenu" @close="showMenu = false" />
      <header
        class="w-full transition-[height] duration-300 ease-in-out"
        :class="page.title ? 'h-[60vh]' : 'h-[calc(100vh-theme(space.12))]'"
      >
        <TresCanvas v-bind="gl" shadows>
          <Experience />
        </TresCanvas>
      </header>
      <NuxtPage />
    </section>
  </main>
</template>

<script setup lang="ts">
import { BasicShadowMap, LinearSRGBColorSpace, NoToneMapping } from "three";
const showMenu = ref<boolean>(false);
const { data } = await useAsyncData("parts", () =>
  queryContent("parts").find(),
);

const { page } = useContent();

const gl = {
  alpha: true,
  shadows: false,
  shadowMap: {
    autoUpdate: false,
  },
  disableRender: true,
  shadowMapType: BasicShadowMap,
  outputColorSpace: LinearSRGBColorSpace,
};
</script>
