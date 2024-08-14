<template>
  <TresPerspectiveCamera/>
  <TresAmbientLight :intensity="1" />
  <TresDirectionalLight cast-shadow :position="[0, 5, 3]" :intensity="1" />
  <Suspense>
    <Carcassonne />
  </Suspense>
  <Suspense>
    <Blasons :points="props.points"/>
  </Suspense>
  <BakeShadows />
</template>

<script setup lang="ts">
import * as THREE from "three"
import {computed} from "vue";
const { page } = useContent();
const { camera } = useTresContext();

const initialOffset = new THREE.Vector3(1, 5, 8);

const props = defineProps({
  points: Array<any>,
});

const currentPosition = new THREE.Vector3();
const currentLookAt = new THREE.Vector3();

function calculateOffset(targetPosition: THREE.Vector3, offset: THREE.Vector3) {
  const idealOffset = offset.clone();
  idealOffset.add(targetPosition);
  return idealOffset;
}

const currentPart = computed(() => {
  return page.value ? new THREE.Vector3(
      page.value.position[0],
      page.value.position[1],
      page.value.position[2]) : new THREE.Vector3()
})

const currentPartOffset = computed(() => {
  return page.value ? new THREE.Vector3(
      page.value.offset[0],
      page.value.offset[1],
      page.value.offset[2]) : initialOffset
})

const { onLoop } = useRenderLoop();
onLoop(({ delta }) => {
  let idealOffset = calculateOffset(currentPart.value, currentPartOffset.value);

  currentPosition.lerp(idealOffset, delta);
  currentLookAt.lerp(currentPart.value, delta);

  if (!camera.value) return;

  camera.value.position.copy(currentPosition);
  camera.value.lookAt(currentLookAt);
});
</script>
