<template>
  <TresPerspectiveCamera />
  <TresAmbientLight :intensity="1.5" />
  <TresDirectionalLight cast-shadow :position="[-4, 8, 6]" :intensity="1.5" />
  <Suspense
    @resolve="
      () => {
        loaded = true;
      }
    "
  >
    <Carcassonne @select="changeOutline" />
    <template #fallback>
      <Html center fullscreen>
        <div
          class="flex h-full w-full flex-col items-center justify-center bg-primary"
        >
          <p>Chargement de la carte...</p>
        </div>
      </Html>
    </template>
  </Suspense>
  <EffectComposer>
    <Outline
      :outlined-objects="outlinedObjects"
      v-bind="outlineParameters"
    ></Outline>
  </EffectComposer>
</template>

<script setup lang="ts">
import { Html } from "@tresjs/cientos";
import * as THREE from "three";
const { camera, scene } = useTresContext();
const { page } = useContent();
const initialOffset = new THREE.Vector3(1, 3, 4);
const outlinedObjects = ref<THREE.Object3D[]>([]);
const loaded = ref<Boolean>(false);

const outlineParameters = reactive({
  // pulseSpeed: 0.1,
  edgeStrength: 3.0,
  visibleEdgeColor: "#ff0045",
});

usePageLocalisation(initialOffset, camera, scene, loaded);

const changeOutline = (objects: Array<THREE.Object3D>) => {
  outlinedObjects.value = [...objects];
};

watch(
  [page, scene, loaded],
  (value) => {
    console.log(value[2]);
    if (value[0]?.title && value[1] && value[2]) {
      // Traverse Scene
      value[1].traverse((child: THREE.Object3D) => {
        if (value[0].object_name == child.name) {
          console.log("outlined", child.name);
          changeOutline([child]);
        }
      });
    }
  },
  {
    deep: true,
  },
);
</script>
