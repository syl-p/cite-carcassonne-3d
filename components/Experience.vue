<template>
  <TresPerspectiveCamera />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight cast-shadow :position="[2, 5, 4]" :intensity="1.5" />
  <Suspense>
    <Carcassonne :points="props.points" />
  </Suspense>
  <BakeShadows />
</template>

<script setup lang="ts">
import * as THREE from "three";
import { useScroll } from "@vueuse/core";
const { camera } = useTresContext();
const initialOffset = new THREE.Vector3(1, 3, 4);
const page = usePageLocalisation(initialOffset, camera);

const props = defineProps({
  points: Array<any>,
});
</script>
