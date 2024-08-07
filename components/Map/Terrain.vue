<template>
  <TresMesh ref="meshRef" :geometry="geometry">
    <TresMeshStandardMaterial color="gray" wireframe="" />
  </TresMesh>
</template>

<script setup lang="ts">
import * as THREE from "three";
import * as GeoTIFF from "geotiff";
const rawTiff = await GeoTIFF.fromUrl("./terrain-2.tif");
const tiffImage = await rawTiff.getImage();
const meshRef = ref();

const start = [2.353936, 43.19904];
const end = [2.374069, 43.213273];

let leftBottom = GpsRelativePosition(end, CENTER);
let rightTop = GpsRelativePosition(start, CENTER);
let x = Math.abs(leftBottom[0] - rightTop[0]);
let y = Math.abs(leftBottom[1] - rightTop[1]);

const data = await tiffImage.readRasters({
  width: Math.floor(x),
  height: Math.floor(y),
  resampleMethod: "bilinear",
  interleave: true,
});

let minHeight = Infinity;
const geometry = new THREE.PlaneGeometry(x, y, x - 1, y - 1);
for (let i = 0; i < data.length; i++) {
  const el = data[i];
  const height = (el as number) / 80;
  geometry.getAttribute("position").setZ(i, height);

  if (height < minHeight) minHeight = height;
}

onMounted(() => {
  geometry.getAttribute("position").needsUpdate = true;
  geometry.computeBoundingBox();
  geometry.rotateX(Math.PI / 2);
  geometry.rotateY(Math.PI / 2);
  geometry.rotateZ(Math.PI);
  geometry.translate(0, -minHeight, 0); // Center the terrain vertically
});
</script>
