import * as THREE from "three";
import { computed, type ShallowRef } from "vue";
type CameraState = "IDLE" | "MOVING" | "ARRIVED";

export default (initialOffset: THREE.Vector3, enabled: ShallowRef<Boolean>) => {
  const currentPosition = ref(new THREE.Vector3());
  const currentLookAt = ref(new THREE.Vector3());
  const { camera, scene } = useTresContext();
  const { page } = useContent();
  const cameraState = ref<CameraState>("IDLE");

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
    if (camera.value) {
      let idealOffset = calculateOffset(
        currentPart.value,
        currentPartOffset.value,
      );

      if (cameraState.value === "IDLE") {
        cameraState.value = "MOVING";
      }

      // UPDATE Cam position / targeting
      currentPosition.value.lerp(idealOffset, delta);
      currentLookAt.value.lerp(currentPart.value, delta);
      camera.value.position.copy(currentPosition.value);
      camera.value.lookAt(currentLookAt.value);

      const positionReached =
        currentPosition.value.distanceTo(idealOffset) < 0.1;
      const lookAtReached =
        currentLookAt.value.distanceTo(currentPart.value) < 0.1;

      if (positionReached && lookAtReached && cameraState.value === "MOVING") {
        cameraState.value = "ARRIVED";
      }

      if (
        cameraState.value === "ARRIVED" &&
        (!positionReached || !lookAtReached)
      ) {
        cameraState.value = "IDLE";
      }
    }
  });

  watch([page], () => {
    cameraState.value = "IDLE";
  });

  return { cameraState };
};
