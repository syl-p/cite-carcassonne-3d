<template>
  <TresPerspectiveCamera />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight cast-shadow :position="[0, 5, 3]" :intensity="1" />
  <Suspense>
    <Carcassonne :points="props.points" />
  </Suspense>
  <BakeShadows />
</template>

<script setup lang="ts">
import * as THREE from "three";
const { camera } = useTresContext();
const initialOffset = new THREE.Vector3(1, 5, 8);
const page = usePageLocalisation(initialOffset, camera);

const props = defineProps({
  points: Array<any>,
});
</script>
