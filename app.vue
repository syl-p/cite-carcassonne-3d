<template>
  <main class="relative h-fit font-serif text-white">
    <TresCanvas
      v-bind="gl"
      window-size
      clear-color="gray"
      shadows
      class="fixed top-0 left-0 -z-50 w-full h-screen"
    >
      <Experience />
    </TresCanvas>

    <NuxtLayout>
      <header class="p-8 fixed flex justify-between top-0 left-0 w-full z-50">
        <div>
          <NuxtLink to="/" class="flex space-x-3">
            <div class="w-10 h-10 bg-white"></div>
            <div class="uppercase font-spectral">
              Cité<br />
              de <span class="font-bold">Carcassonne</span>
            </div>
          </NuxtLink>
        </div>
        <div>
          <ul class="flex space-x-3">
            <li>Accueil</li>
            <li>A propos</li>
            <li>Contacter</li>
          </ul>
        </div>
      </header>

      <UiNavigation :pages="data" v-if="page.title == ''" />

      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<script setup lang="ts">
import {
  BasicShadowMap,
  LinearSRGBColorSpace,
  NoToneMapping,
  ReinhardToneMapping,
  SRGBColorSpace,
} from "three";
const { data } = await useAsyncData("parts", () =>
  queryContent("parts").find()
);
const { page } = useContent();

const gl = {
  clearColor: "#FFF0D6",
  shadows: true,
  shadowMap: {
    autoUpdate: false,
  },
  shadowMapType: BasicShadowMap,
  outputColorSpace: LinearSRGBColorSpace,
  toneMapping: NoToneMapping,
};
</script>
