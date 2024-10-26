<template>
  <Html
    v-for="(pageObject, index) in pagesAndObjects"
    center
    :position="pageObject.position"
  >
    <div class="group relative">
      <button
        @click="goTo(pageObject.link)"
        :class="{ 'opacity-40': page.title && page.title != pageObject.title }"
        class="flex h-8 w-8 flex-col items-center justify-center rounded-full border border-yellow-500 bg-white hover:bg-yellow-500"
      >
        <span class="block">{{ index }}</span>
      </button>
      <div
        class="absolute left-full top-1/2 ml-3 hidden min-w-[200px] -translate-y-1/2 items-center justify-center gap-3 bg-white p-3 group-hover:flex"
      >
        <div class="flex-1">
          <h2 class="font-spectral">{{ pageObject.title }}</h2>
          <p>{{ pageObject.description }}</p>
        </div>
      </div>
    </div>
  </Html>
</template>

<script setup lang="ts">
import { Html } from "@tresjs/cientos";
import { Vector3 } from "three";
const { page } = useContent();

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
        return {
          title: p.title,
          description: p.excerpt,
          link: p._path ?? "",
          position: targetedPosition,
        };
      })
    : [];
});

async function goTo(url: string) {
  await navigateTo(url);
}
</script>
