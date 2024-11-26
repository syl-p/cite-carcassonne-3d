<template>
  <div class="relative w-full overflow-x-hidden">
    <div
      ref="slider"
      class="flex w-full cursor-grab snap-x snap-mandatory space-x-4 overflow-x-auto scroll-smooth"
    >
      <template v-for="item in items">
        <div
          class="h-[300] w-[150px] shrink-0 snap-center rounded-lg lg:h-[350px] lg:w-[200px]"
        >
          <img :src="item.src" class="h-full w-full rounded-xl object-cover" />
        </div>
      </template>
    </div>
  </div>
  <NuxtLink
    :to="`${page._path}/media`"
    class="group relative mt-6 flex cursor-pointer items-center justify-end space-x-2 px-12"
  >
    <span
      class="relative z-10 text-sm font-bold uppercase leading-6 tracking-wide before:absolute before:-left-6 before:-top-1/2 before:-z-10 before:h-12 before:w-12 before:rounded-full before:bg-yellow-400 before:content-[''] group-hover:underline"
    >
      Participer a la galerie photo de cet élément
    </span>

    <!-- Flèche -->
    <div class="relative">
      <span class="inline-block transition-transform group-hover:translate-x-1">
        ➔
      </span>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
const slider = templateRef("slider");
const { page } = useContent();
let isDragging = false;
let startX = 0;
let scrollTo = 0;
const items = [
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
  { user: "test", src: "https://picsum.photos/seed/picsum/300/500" },
];

onMounted(() => {
  // Désactiver le glisser-déposer par défaut des images
  slider.value.querySelectorAll("img").forEach((img) => {
    img.addEventListener("dragstart", (e) => e.preventDefault());
  });

  // Début du drag
  slider.value.addEventListener("mousedown", (e) => {
    isDragging = true;
    slider.value.classList.add("cursor-grabbing");
    startX = e.pageX - slider.value.offsetLeft;
    scrollTo = slider.value.scrollLeft;
  });

  // Fin du drag
  slider.value.addEventListener("mouseup", () => {
    isDragging = false;
    slider.value.classList.remove("cursor-grabbing");
  });

  // Annuler le drag si on sort du slider
  slider.value.addEventListener("mouseleave", () => {
    isDragging = false;
    slider.value.classList.remove("cursor-grabbing");
  });

  // Gestion du drag
  slider.value.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.value.offsetLeft;
    const walk = (x - startX) * 2; // Multipliez par 2 pour plus de vitesse
    slider.value.scrollLeft = scrollTo - walk;
  });
});
</script>
