<template>
  <TresPerspectiveCamera />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight cast-shadow :position="[-2, 10, 4]" :intensity="1.5" />
  <Suspense>
    <Carcassonne />
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
</script>
