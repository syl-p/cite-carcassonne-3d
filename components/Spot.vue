<template>
  <Html
    v-for="(pageObject, index) in pagesAndObjects"
    center
    :position="pageObject.position"
  >
  <div
    class="group relative">
    <div
      class="flex h-8 w-8 flex-col items-center justify-center rounded-full border border-yellow-500 bg-white"
    >
      <span class="block">{{ index }}</span>
    </div>
    <div
      class="hidden gap-3 group-hover:flex justify-center items-center p-3 bg-white absolute top-1/2 left-full ml-3 -translate-y-1/2 min-w-[200px]">
        <div class="flex-1">
          <h2 class="font-spectral">{{ pageObject.title }}</h2>
          <p>{{pageObject.description}}</p>
        </div>
        <button @click="goTo(pageObject.link)"
          class="text-white rounded-full h-8 w-8 flex flex-col items-center justify-center bg-yellow-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
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