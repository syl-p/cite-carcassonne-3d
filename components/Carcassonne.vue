<template>
  <primitive :object="scene" :scale="0.01"></primitive>
</template>

<script setup lang="ts">
import * as THREE from "three";
const { scene } = await useGLTF(
  "/models/cite-carcassonne-export/cite-carcassonne.gltf",
);
const emit = defineEmits(["select"]);
const { camera } = useTresContext();
const buildingMaterial = new THREE.MeshPhongMaterial();
const terrainMaterial = new THREE.MeshPhongMaterial({
  color: "gray",
  depthWrite: false,
  transparent: true,
  opacity: 0.4,
});

scene.traverse((child: any) => {
  if (child.isMesh && child.material) {
    child.material =
      child.name == "Terrain" ? terrainMaterial : buildingMaterial;
  }
});

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

window.addEventListener("click", (event) => {
  if (!camera.value) return;

  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(pointer, camera.value);

  const intersects = raycaster.intersectObjects(scene.children);
  emit(
    "select",
    intersects.map((o) => o.object),
  );
});
</script>
