import * as THREE from "three";
import { computed, type ShallowRef } from "vue";
type CameraState = "IDLE" | "MOVING" | "ARRIVED" | "RESET POSITION";

export default (initialOffset: THREE.Vector3, enabled: ShallowRef<Boolean>) => {
  const currentPosition = ref(new THREE.Vector3());
  const currentLookAt = ref(new THREE.Vector3());
  const { camera, scene, controls } = useTresContext();
  const { page } = useContent();
  const cameraState = ref<CameraState>("IDLE");

  let previousPosition = ref(new THREE.Vector3());
  let previousLookAt = ref(new THREE.Vector3());

  function calculateOffset(
    targetPosition: THREE.Vector3,
    offset: THREE.Vector3,
  ) {
    const idealOffset = offset.clone();
    idealOffset.add(targetPosition);
    return idealOffset;
  }

  const currentPart = computed(() => {
    let targetedPosition = new THREE.Vector3();
    if (!scene.value || !page.value) return targetedPosition;

    scene.value.traverse((obj) => {
      if (obj.name === page.value.object_name) {
        obj.getWorldPosition(targetedPosition);
      }
    });

    return targetedPosition;
  });

  const currentPartOffset = computed(() => {
    return page.value && page.value.offset
      ? new THREE.Vector3(
          page.value.offset[0],
          page.value.offset[1],
          page.value.offset[2],
        )
      : initialOffset;
  });

  const { onLoop } = useRenderLoop();

  onLoop(({ delta }) => {
    if (camera && camera.value && enabled.value) {
      if (
        cameraState.value !== "ARRIVED" &&
        cameraState.value !== "RESET POSITION"
      ) {
        if (cameraState.value === "IDLE") {
          cameraState.value = "MOVING";
        }

        let idealOffset = calculateOffset(
          currentPart.value,
          currentPartOffset.value,
        );

        // UPDATE Cam position / targeting
        currentPosition.value.lerp(idealOffset, delta);
        currentLookAt.value.lerp(currentPart.value, delta);
        camera.value.position.copy(currentPosition.value);
        camera.value.lookAt(currentLookAt.value);

        if (controls.value)
          //@ts-ignore
          controls.value.target.lerp(currentLookAt.value, delta);

        const positionReached =
          currentPosition.value.distanceTo(idealOffset) < 0.1;
        const lookAtReached =
          currentLookAt.value.distanceTo(currentPart.value) < 0.1;

        if (positionReached && lookAtReached) {
          cameraState.value = "ARRIVED";
          previousPosition.value = currentPosition.value.clone();
          previousLookAt.value = previousLookAt.value.clone();
        }
      } else if (cameraState.value === "RESET POSITION") {
        const realCurrentPosition = camera.value.position.clone();
        const realPreviousPosition = previousPosition.value.clone();
        const resetLerpFactor = 0.1;
        realCurrentPosition.lerp(realPreviousPosition, resetLerpFactor);
        currentLookAt.value.lerp(currentPart.value, resetLerpFactor);

        camera.value.position.copy(realCurrentPosition);
        camera.value.lookAt(currentLookAt.value);

        if (controls.value)
          //@ts-ignore
          controls.value.target.lerp(currentLookAt.value, resetLerpFactor);

        const positionReached =
          realCurrentPosition.distanceTo(realPreviousPosition) < 0.1;

        // console.log(
        //   "Distance actuelle:",
        //   realCurrentPosition.distanceTo(realPreviousPosition),
        //   "Seuil:",
        //   0.01,
        //   "Position actuelle:",
        //   realCurrentPosition,
        //   "Position précédente:",
        //   realPreviousPosition,
        //   "Atteint ?",
        //   positionReached,
        // );

        if (positionReached) {
          cameraState.value = "IDLE";
        }
      }
    }
  });

  watch(
    [page],
    (newPage, oldPage) => {
      if (!oldPage[0]) return;

      if (newPage[0]._path !== oldPage[0]._path) {
        cameraState.value = "RESET POSITION";
      }
    },
    { immediate: true },
  );

  return { cameraState };
};
