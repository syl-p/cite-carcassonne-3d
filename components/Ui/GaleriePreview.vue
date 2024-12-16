<template>
  <div class="relative w-full overflow-x-hidden">
    <div
      ref="slider"
      class="flex w-full cursor-grab snap-x snap-mandatory space-x-4 overflow-x-auto scroll-smooth"
    >
      <div
        v-if="data"
        v-for="(item, index) in data"
        :key="index"
        class="h-[300] w-[150px] shrink-0 snap-center rounded-lg lg:h-[350px] lg:w-[200px]"
      >
        <UiGalerieCard :path="`/uploads/${item.path}`" />
      </div>
      <div v-else>Gallerie vide pour cette partie.</div>
    </div>
  </div>

  <a
    @click.prevent="toggleDialog()"
    href="#"
    class="group relative mt-6 flex cursor-pointer items-center justify-end space-x-2"
  >
    <span
      class="relative z-10 text-sm font-bold uppercase leading-6 tracking-wide before:absolute before:-left-6 before:-top-1/2 before:-z-10 before:h-12 before:w-12 before:rounded-full before:bg-yellow-400 before:content-[''] group-hover:underline"
    >
      <template v-if="userInfo"> Participer a la galerie photo </template>
      <template v-else>
        Connectez vous pour pouvoir participer à la galerie photo
      </template>
    </span>

    <!-- Flèche -->
    <div class="relative">
      <span class="inline-block transition-transform group-hover:translate-x-1">
        ➔
      </span>
    </div>
  </a>

  <dialog
    v-if="userInfo"
    ref="dialog"
    class="w-full rounded-xl backdrop:bg-gray-500 backdrop:opacity-75 md:w-1/2"
  >
    <div class="rounded-lg p-6" id="dialog-container">
      <header class="mb-8">
        <h2 class="text-3xl">Vous souhaitez partager un souvenir ?</h2>
        <p class="font-light">
          Publier votre plus belle photo de cette partie de la cité. Elle
          apparaitra dans la gallerie et les autres utilisateurs pourront la
          voir.
        </p>
      </header>
      <UiUploadForm :part="page.object_name" @finish="onFinishUpload" />
    </div>
  </dialog>
</template>
<script setup lang="ts">
const store = useUserStore();
const { page } = useContent();
const { userInfo } = storeToRefs(store);
const { part } = defineProps(["part"]);
const { data } = await useFetch(`/api/media/${part}/all`);

const slider = templateRef("slider");
let isDragging = false;
let startX = 0;
let scrollTo = 0;

const dialog = ref<HTMLDialogElement | null>(null);

async function toggleDialog() {
  if (!userInfo.value) {
    await navigateTo("/login");
  }

  if (!dialog.value) return;
  if (dialog.value.open) {
    dialog.value.close();
  } else {
    dialog.value.showModal();
  }
}

const onFinishUpload = (media) => {
  console.log(media);
  if (dialog.value) dialog.value?.close();
  // TODO: SUCCESS ALERT
  // TODO: ADD PIC TO GALERIE
  data.value = [...data.value, ...media];
};

onMounted(() => {
  if (dialog.value) {
    dialog.value.addEventListener("click", (event) => {
      if (event.target == dialog.value) {
        dialog.value?.close();
      }
    });
  }

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
