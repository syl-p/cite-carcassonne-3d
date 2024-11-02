import * as THREE from "three";
import { computed, type ShallowRef } from "vue";

export default (initialOffset: THREE.Vector3, enabled: ShallowRef<Boolean>) => {
  const currentPosition = ref(new THREE.Vector3());
  const currentLookAt = ref(new THREE.Vector3());
  const { camera, scene } = useTresContext();
  const { page } = useContent();
  const isMoving = ref(false);

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

      currentPosition.value.lerp(idealOffset, delta);
      currentLookAt.value.lerp(currentPart.value, delta);

      camera.value.position.copy(currentPosition.value);
      camera.value.lookAt(currentLookAt.value);

      const positionReached =
        currentPosition.value.distanceTo(idealOffset) < 0.01;
      const lookAtReached =
        currentLookAt.value.distanceTo(currentPart.value) < 0.01;

      if (positionReached && lookAtReached) {
        if (isMoving.value) {
          console.log("Mouvement terminé");
        }
        isMoving.value = false;
      } else {
        if (!isMoving.value) {
          console.log("Déplacement en cours");
        }
        isMoving.value = true;
      }
    }
  });

  return { isMoving };
};
