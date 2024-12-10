<template>
  <main class="relative -z-0 bg-white text-lg">
    <UiNavigation />
    <div
      class="relative z-10 w-full overflow-hidden bg-white transition-transform duration-700 ease-in-out lg:fixed lg:left-0 lg:top-0 lg:h-full"
      :class="page.title ? 'h-[70vh] lg:w-[50vw]' : 'h-screen lg:w-screen'"
    >
      <TresCanvas
        v-bind="gl"
        shadows
        class="h-full w-full transition-transform duration-700 ease-in-out"
      >
        <Experience @is-moving="(state) => updateState(state)" />
      </TresCanvas>

      <div class="absolute bottom-8 left-8 w-full" v-if="page.title">
        <UiPreviousNext />
      </div>
    </div>
    <div
      class="z-20 flex flex-1 flex-col justify-center bg-white lg:ml-[50vw] lg:w-[50vw]"
      v-show="page.title"
    >
      <slot />
    </div>
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
