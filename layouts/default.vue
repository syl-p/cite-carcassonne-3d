<template>
  <main class="relative -z-0 bg-white text-lg">
    <UiNavigation />
    <UContainer class="mt-18">
      <div
        class="relative z-10 h-[80vh] w-full overflow-hidden bg-white transition-transform duration-700 ease-in-out"
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
