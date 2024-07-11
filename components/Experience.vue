<template>
  <TresPerspectiveCamera/>
  <OrbitControls />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight cast-shadow :position="[0, 100, 10]" :intensity="1" />
  <Suspense>
    <Carcassonne>
      <Blasons :points="props.points"/>
    </Carcassonne>
  </Suspense>
</template>

<script setup lang="ts">
const { camera } = useTresContext();

</script>
