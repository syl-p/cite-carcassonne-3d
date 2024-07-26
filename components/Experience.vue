<template>
  <TresPerspectiveCamera />
  <MapControls />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight cast-shadow :position="[0, 100, 10]" :intensity="1" />
  <Suspense>
    <Carcassonne />
  </Suspense>
</template>

<script setup lang="ts"></script>
