<template>
  <TresPerspectiveCamera :args="[70, 1, 0.1, 1000]" :position="initialOffset" />
  <OrbitControls
    :make-default="true"
    :enableDamping="false"
    :enablePan="false"
    :enableZoom="false"
    :max-polar-angle="Math.PI * 0.4"
  />
  <TresAmbientLight :intensity="1.5" />
  <TresDirectionalLight cast-shadow :position="[-4, 8, 6]" :intensity="1.5" />
  <Suspense
    @resolve="
      () => {
        loaded = true;
      }
    "
  >
    <Carcassonne />
    <template #fallback>
      <Html center fullscreen>
        <div
          class="flex h-full w-full flex-col items-center justify-center bg-white"
        >
          <p>Chargement de la carte...</p>
        </div>
      </Html>
    </template>
  </Suspense>
</template>

<script setup lang="ts">
const emit = defineEmits(["isMoving"]);
import { Html } from "@tresjs/cientos";
import * as THREE from "three";
const { page } = useContent();
const initialOffset = new THREE.Vector3(1, 2, 3);
const loaded = ref<Boolean>(false);
const { cameraState } = usePageLocalisation(initialOffset, loaded);

watch(
  [cameraState, page],
  (value) => {
    emit("isMoving", value[0]);
  },
  { immediate: true },
);
</script>
