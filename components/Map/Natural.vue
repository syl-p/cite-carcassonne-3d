<template>
  <TresGroup>
    <template  v-for="element of shapes">
      <Shape
          :coordinates="element.geometry.coordinates" color="green"
          v-if="element.geometry && element.geometry.coordinates[0][1] && Array.isArray(element.geometry.coordinates[0][1])"/>
    </template>
  </TresGroup>

  <TresGroup>
    <TresInstancedMesh ref="instancesMesh" :args="[null!, null!, trees.length]">
      <TresSphereGeometry :args="[0.3, 32, 32]" />
      <TresMeshNormalMaterial />
    </TresInstancedMesh>
  </TresGroup>
</template>

<script setup lang="ts">
  import * as THREE from "three"
  import Shape from "~/components/Map/Shape.vue";
  const instancesMesh = ref()
  const {features} = defineProps(["features"]);

  const shapes = computed(() => {
    return features.filter(element => element.geometry && Array.isArray(element.geometry.coordinates[0][1]))
  })
  
  let trees = computed(() => {
    return features.filter(element => element.properties.natural == "tree")
  })
  

  watch(trees, (newValue) => {
    const instances = newValue.map((i, f) => ({
      id: i,
      position: f.geometry ? GpsRelativePosition(f.geometry.coordinates, CENTER) : null
    }))

    instances.forEach(({ position, id }) => {
      if(position) {
        instancesMesh.value.setMatrixAt(
        id,
        new THREE.Matrix4().makeTranslation(position.x, position.y, position.z)
      );
      }
    });

    console.log('=>', newValue)

    instancesMesh.value.instanceMatrix.needsUpdate = true;
  })
</script>