<template>
  <TresPerspectiveCamera :args="[70, 1, 0.1, 1000]" :position="initialOffset" />
  <OrbitControls
    :make-default="true"
    :enableDamping="false"
    :enablePan="false"
    :enableZoom="false"
  />
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
          class="flex h-full w-full flex-col items-center justify-center bg-white"
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
const emit = defineEmits(["isMoving"]);
import { Html } from "@tresjs/cientos";
import * as THREE from "three";
const { scene } = useTresContext();
const { page } = useContent();
const initialOffset = new THREE.Vector3(1, 2, 3);
const outlinedObjects = ref<THREE.Object3D[]>([]);
const loaded = ref<Boolean>(false);

const outlineParameters = reactive({
  // pulseSpeed: 0.1,
  edgeStrength: 3.0,
  visibleEdgeColor: "#ff0045",
});

const { cameraState } = usePageLocalisation(initialOffset, loaded);

const changeOutline = (objects: Array<THREE.Object3D>) => {
  outlinedObjects.value = [...objects];
};

watch(
  [page, scene, loaded],
  (value) => {
    if (value[0]?.title && value[1] && value[2]) {
      // Traverse Scene
      value[1].traverse((child: THREE.Object3D) => {
        if (value[0].object_name == child.name) {
          // console.log("outlined", child.name);
          changeOutline([child]);
        }
      });
    }
  },
  {
    deep: true,
  },
);

watch(
  [cameraState, page],
  (value, old) => {
    emit("isMoving", value[0]);
    console.log(value[0]);
    // NO RESIZE ON PREV/NEXT PAGE
    // if (
    //   (old && old[1].title && !value[1].title) ||
    //   (value[1].title && !old[1].title)
    // ) {
    //   // emit("isMoving", value[0]);
    //   emit("isMoving", value[0]);
    // }
  },
  { immediate: true },
);
</script>
