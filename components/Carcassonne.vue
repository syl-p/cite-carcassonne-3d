<template>
  <primitive
    :object="scene"
    :scale="0.01"
  ></primitive>
</template>

<script setup lang="ts">
import * as THREE from "three";
const { scene } = await useGLTF(
  "/models/cite-carcassonne-export/cite-carcassonne.gltf"
);
const buildingMaterial = new THREE.MeshPhongMaterial();
const terrainMaterial = new THREE.MeshPhongMaterial({
  color: "gray",
  depthWrite: false,
});

scene.traverse((child: any) => {
  if (child.isMesh && child.material) {
    child.material =
      child.name == "Terrain" ? terrainMaterial : buildingMaterial;
  }
});

async function handleClick() {
  console.log("test click");
}

async function onClick(pointData: { _path: any }) {
  await navigateTo({ path: pointData._path });
}
</script>
