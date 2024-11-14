<template>
  <main class="relative -z-0 bg-white text-lg">
    <header class="fixed left-0 top-0 z-50 flex w-full justify-between p-8">
      <div>
        <NuxtLink
          to="/"
          class="flex items-center justify-center space-x-3 align-middle"
        >
          <span class="block h-8 w-8 bg-yellow-400"></span>
          <span class="block font-bold">Carca 3D</span>
        </NuxtLink>
      </div>
      <nav>
        <ul class="flex items-center space-x-3">
          <li><NuxtLink to="/">Accueil</NuxtLink></li>
          <li><NuxtLink to="/le-projet">Le projet</NuxtLink></li>
          <li><NuxtLink to="/contribuer">Contribuer</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <div
      class="z-10 w-full transition-transform duration-700 ease-in-out lg:fixed lg:left-0 lg:top-0 lg:h-full"
      :class="page.title ? 'h-[70vh] lg:w-1/2' : 'h-screen lg:w-screen'"
    >
      <TresCanvas
        v-bind="gl"
        shadows
        class="h-full w-full transition-transform duration-700 ease-in-out"
      >
        <Experience @is-moving="(state) => updateState(state)" />
      </TresCanvas>
    </div>

    <NuxtPage
      class="z-20 flex flex-col justify-center bg-white lg:ml-[50vw] lg:w-[50vw]"
      v-show="page.title"
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
  console.log("test", cameraState.value);
};

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
