<template>
  <primitive
    :object="scene"
    cast-shadow
    receive-shadow
    :scale="0.01"
  ></primitive>

  <Html
    v-if="page.title == ''"
    center
    v-for="point of props.points"
    :position="point.position"
    class="relative"
  >
    <div
      class="w-6 h-6 bg-white rounded-full hover:cursor-pointer"
      @click="onClick(point)"
    ></div>
  </Html>
</template>

<script setup lang="ts">
import * as THREE from "three";
const props = defineProps(["points"]);
const { scene } = await useGLTF(
  "/models/cite-carcassonne-export/cite-carcassonne.gltf"
);
const buildingMaterial = new THREE.MeshPhongMaterial();
const terrainMaterial = new THREE.MeshPhongMaterial({
  color: "white",
  depthWrite: false,
});

const { page } = useContent();
scene.traverse((child: any) => {
  if (child.isMesh && child.material) {
    child.material =
      child.name == "Terrain" ? terrainMaterial : buildingMaterial;
  }
  child.castShadow = true;
  child.receiveShadow = true;
});

async function handleClick() {
  console.log("test click");
}

async function onClick(pointData) {
  await navigateTo({ path: pointData._path });
}
</script>
