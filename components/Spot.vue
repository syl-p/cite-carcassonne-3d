<template>
  <Html
    v-for="(pageObject, index) in pagesAndObjects"
    center
    :position="pageObject.position"
    class="border"
  >
    <div
      class="flex h-8 w-8 flex-col items-center justify-center rounded-full border border-yellow-500 bg-white"
    >
      <span class="block">{{ index }}</span>
    </div>
    <div>{{pageObject.page.title}}</div>
  </Html>
</template>

<script setup lang="ts">
import { Html } from "@tresjs/cientos";
import { Vector3 } from "three";

const { data } = await useAsyncData("parts", () =>
  queryContent("parts").find(),
);

const { scene } = useTresContext();

const pagesAndObjects = computed(() => {
  return data.value
    ? data.value.map((p) => {
        let targetedPosition = new Vector3();
        // Traverse scene to assign position
        scene.value.traverse((obj) => {
          if (obj.name === p.object_name) {
            obj.getWorldPosition(targetedPosition);
          }
        });

        return { page: p, position: targetedPosition };
      })
    : [];
});
</script>