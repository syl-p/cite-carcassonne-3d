<template>
  <TresPerspectiveCamera />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight cast-shadow :position="[-2, 7, 4]" :intensity="1.5" />
  <Suspense>
    <Carcassonne :points="props.points" />
  </Suspense>

  <EffectComposer>
    <Vignette :darkness="1.3" :offset="0" />
  </EffectComposer>
</template>

<script setup lang="ts">
import * as THREE from "three";
const { camera } = useTresContext();
const initialOffset = new THREE.Vector3(1, 3, 4);
usePageLocalisation(initialOffset, camera);

const props = defineProps({
  points: Array<any>,
});
</script>
