<template>
  <main>
    <nav class="w-full flex fixed top-1/2 left-0 pl-5">
      <ul>
        <li>
          <NuxtLink to="/" active-class="underline"> Accueil </NuxtLink>
        </li>
        <li v-for="page of data">
          <NuxtLink :to="page._path" active-class="underline">
            {{ page.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
    <TresCanvas v-bind="gl" window-size clear-color="#FFF0D6" shadows class="-z-10">
      <Experience :points="data as Array<any>" />
    </TresCanvas>
    <section class="mt-[100vh] sticky top-0 left-0 bg-white p-8 flex flex-col justify-center">
      <NuxtPage />
    </section>
  </main>
</template>

<script setup lang="ts">
import {BasicShadowMap, NoToneMapping, SRGBColorSpace} from "three";

const { data } = await useAsyncData("parts", () =>
  queryContent("parts").find()
);

const gl = {
  clearColor: '#FFF0D6',
  shadows: true,
  alpha: false,
  shadowMap: {
    autoUpdate: false
  },
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};
</script>
