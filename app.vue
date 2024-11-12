<template>
  <main class="relative -z-0 bg-white font-serif text-lg">
    <header class="fixed left-0 top-0 z-50 flex w-full justify-between p-8">
      <div>
        <NuxtLink
          to="/"
          class="flex items-center justify-center space-x-3 align-middle"
        >
          <span class="block h-8 w-8 bg-red-400"></span>
          <span class="block font-spectral font-bold uppercase">Cité 3D</span>
        </NuxtLink>
      </div>
      <nav>
        <ul class="flex items-center space-x-3">
          <li><NuxtLink to="/">Accueil</NuxtLink></li>
          <li><NuxtLink to="/le-project">Le projet</NuxtLink></li>
          <li><NuxtLink to="/contribuer">Contribuer</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div
      class="left-0 top-0 -z-10 h-[70vh] w-full transition-[transform] duration-100 lg:fixed lg:h-full"
      :class="classesName"
    >
      <TresCanvas v-bind="gl" shadows class="h-full w-full">
        <Experience @is-moving="(state) => updateState(state)" />
      </TresCanvas>
    </div>
    <NuxtPage
      class="z-20 h-fit min-h-screen bg-white px-6 py-6 shadow-lg lg:w-1/2 lg:pt-20"
      v-show="cameraState === 'ARRIVED' && page.title"
    />
  </main>
</template>

<script setup lang="ts">
import { NoToneMapping, PCFSoftShadowMap, SRGBColorSpace } from "three";
const { page } = useContent();
type CameraState = "IDLE" | "MOVING" | "ARRIVED";

const cameraState = ref<CameraState>("IDLE");

const updateState = (state: CameraState) => {
  cameraState.value = state;
  // console.log("test", cameraState.value);
};

const classesName = computed(() => ({
  "translate-x-1/4": page.value.title,
}));

const gl = {
  alpha: true,
  shadows: true,
  shadowMap: {
    autoUpdate: true,
  },
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};
</script>
