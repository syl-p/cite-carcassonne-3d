<template>
  <Html
    v-for="(pageObject, index) in pagesAndObjects"
    center
    :position="pageObject.position"
  >
  <div
    class="group relative">
    <button
      @click="goTo(pageObject.link)"
      class="flex h-8 w-8 flex-col items-center justify-center rounded-full border border-yellow-500 bg-white hover:bg-yellow-500"
    >
      <span class="block">{{ index }}</span>
    </button>
    <div
      class="hidden gap-3 group-hover:flex justify-center items-center p-3 bg-white absolute top-1/2 left-full ml-3 -translate-y-1/2 min-w-[200px]">
        <div class="flex-1">
          <h2 class="font-spectral">{{ pageObject.title }}</h2>
          <p>{{pageObject.description}}</p>
        </div>
    </div>
  </div>
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

        return { title: p.title, description: p.excerpt, link: p._path ?? "", position: targetedPosition };
      })
    : [];
});

async function goTo(url: string) {
  await navigateTo(url)
}
</script>