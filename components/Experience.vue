<template>
  <TresPerspectiveCamera />
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight cast-shadow :position="[-2, 10, 4]" :intensity="1.5" />
  <Suspense>
    <Carcassonne @select="changeOutline"/>
  </Suspense>
  <EffectComposer>
    <Outline :outlined-objects="outlinedObjects" v-bind="outlineParameters"></Outline>
  </EffectComposer>
</template>

<script setup lang="ts">
import * as THREE from "three";
const { camera } = useTresContext();
const initialOffset = new THREE.Vector3(1, 3, 4);
const {page} = useContent()
usePageLocalisation(initialOffset, camera);
const outlinedObjects = ref<THREE.Object3D[]>([])

const outlineParameters = reactive({
  pulseSpeed: 0.1,
  edgeStrength: 2.5,
  visibleEdgeColor: '#ff0000',
})

const changeOutline = (objects: Array<THREE.Object3D>) => {
  outlinedObjects.value = [...objects]
  console.log(objects, outlinedObjects)
}
</script>
