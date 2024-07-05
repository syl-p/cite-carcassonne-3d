<template>
  <TresMesh v-for="point of props.points"
    :scale="0.15"
    :position="point.position"
    cast-shadow receive-shadow
    @click="onClick(point)">
    <TresPlaneGeometry />
    <TresMeshStandardMaterial
        :map="textures.map"
        transparent
        :side="DoubleSide"/>
  </TresMesh>
</template>

<script setup lang="ts">
import { DoubleSide } from "three";
const props = defineProps(["points"]);
const textures = await useTexture({
  map: '/interest-point.png'
})

async function onClick(pointData) {
  await navigateTo({path: pointData._path})
}

</script>
