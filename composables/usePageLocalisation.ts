import * as THREE from "three";
import { computed, type ShallowRef } from "vue";

export default (
  initialOffset: THREE.Vector3,
  camera: globalThis.ComputedRef<THREE.Camera | undefined>,
  scene: ShallowRef<THREE.Scene | undefined>,
  enabled: ShallowRef<Boolean>,
) => {
  const currentPosition = new THREE.Vector3();
  const currentLookAt = new THREE.Vector3();
  const { page } = useContent();

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
    if (camera.value && enabled.value) {
      let idealOffset = calculateOffset(
        currentPart.value,
        currentPartOffset.value,
      );

      currentPosition.lerp(idealOffset, delta);
      currentLookAt.lerp(currentPart.value, delta);

      camera.value.position.copy(currentPosition);
      camera.value.lookAt(currentLookAt);
    }
  });
};
