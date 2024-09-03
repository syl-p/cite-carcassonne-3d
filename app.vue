<template>
  <main class="relative h-fit font-serif">
    <header class="p-8 fixed flex justify-between top-0 left-0 w-full z-50">
      <div><NuxtLink to="/">Logo</NuxtLink></div>
      <button class="uppercase text-2xl" @click="navOpened = !navOpened">
        Menu
      </button>
    </header>
    <UiNavigation
      :pages="data"
      v-show="navOpened"
      @close="() => (navOpened = false)"
    />
    <TresCanvas
      v-bind="gl"
      window-size
      clear-color="#FFF0D6"
      shadows
      class="fixed top-0 left-0 -z-50 w-full h-screen"
    >
      <Experience :points="data as Array<any>" />
    </TresCanvas>

    <NuxtPage />

    <UiFooter />
  </main>
</template>

<script setup lang="ts">
import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from "three";
const { data } = await useAsyncData("parts", () =>
  queryContent("parts").find()
);
const { page } = useContent();
const navOpened = ref(false);

const gl = {
  clearColor: "#FFF0D6",
  shadows: true,
  shadowMap: {
    autoUpdate: true,
  },
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};
</script>
