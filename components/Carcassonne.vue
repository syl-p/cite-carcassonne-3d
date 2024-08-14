<template>
  <primitive
    :object="scene"
    cast-shadow
    receive-shadow
    :scale="0.01"
  ></primitive>
  <Html
    center
    v-for="point of props.points"
    :position="point.position"
    class="relative"
  >
    <div
      class="w-6 h-6 bg-white rounded-full hover:cursor-pointer"
      @click="onClick(point)"
    ></div>
    <div
      class="absolute top-1/2 left-0 text-center"
      v-if="page.title && page.title == point.title"
    >
      <p>{{ point.filter }}</p>
      <h1 class="text-5xl">{{ point.title }}</h1>
      <p class="text-2xl">En savoir plus</p>
    </div>
  </Html>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { Html } from "@tresjs/cientos";
const props = defineProps(["points"]);
const { scene } = await useGLTF(
  "/models/cite-carcassonne-export/cite-carcassonne.gltf"
);

const customShaderMaterial = new THREE.MeshPhongMaterial();
const { page } = useContent();
scene.traverse((child: any) => {
  if (child.isMesh && child.material) {
    child.material = customShaderMaterial;
    child.castShadow = true;
    child.receiveShadow = true;
  }
});

async function handleClick() {
  console.log("test click");
}

async function onClick(pointData) {
  await navigateTo({ path: pointData._path });
}
</script>
