<template>
  <div class="relative w-full overflow-x-hidden">
    <div
      ref="slider"
      class="flex w-full cursor-grab snap-x snap-mandatory space-x-4 overflow-x-auto scroll-smooth"
    >
      <div
        v-for="(item, index) in data"
        :key="index"
        class="h-[300] w-[150px] shrink-0 snap-center rounded-lg lg:h-[350px] lg:w-[200px]"
      >
        <UiGalerieCard :path="item.path" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { data } = await useFetch("/api/media/all");

const slider = templateRef("slider");
let isDragging = false;
let startX = 0;
let scrollTo = 0;

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
