<template>
  <main class="relative -z-0 bg-white text-lg">
    <UiNavigation />
    <UContainer>
      <div
        class="border-secondary relative z-10 h-[60vh] w-full overflow-hidden border-4 bg-white transition-transform duration-700 ease-in-out"
      >
        <TresCanvas
          v-bind="gl"
          shadows
          class="h-full w-full transition-transform duration-700 ease-in-out"
        >
          <Experience @is-moving="(state) => updateState(state)" />
        </TresCanvas>

        <div class="absolute bottom-8 left-8 w-full" v-if="page && page.title">
          <UiPreviousNext />
        </div>
      </div>
      <div class="z-20 bg-white" v-show="page && page.title">
        <slot />
      </div>

      <div class="z-20 mt-6 space-x-3 bg-white lg:flex" v-if="!page.title">
        <h2 class="mb-3 w-1/3 text-3xl">
          Quelle partie de la cité souhaitez vous visiter ?
        </h2>
        <ul class="list-disc">
          <li v-for="part in data">
            <NuxtLink :to="part._path">{{ part.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </UContainer>
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

const { data } = await useAsyncData("parts", () =>
  queryContent("parts").find(),
);

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
