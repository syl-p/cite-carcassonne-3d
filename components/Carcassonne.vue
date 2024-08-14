<template>
  <TresGroup>
    <primitive
        :object="scene"
        cast-shadow
        receive-shadow
        :scale="0.01"
        @click="(intersection, pointerEvent) => console.log('click', intersection, pointerEvent)"
    ></primitive>
  </TresGroup>
</template>

<script setup lang="ts">
import { MeshPhongMaterial } from "three";
const { scene } = await useGLTF("/models/carcassonne-castle.glb");
const customShaderMaterial = new MeshPhongMaterial();

scene.traverse((child: any) => {
  if (child.isMesh && child.material) {
    child.material = customShaderMaterial;
    child.castShadow = true;
    child.receiveShadow = true;
  }
});

// TODO: Use raycaster to highlight elements

</script>
