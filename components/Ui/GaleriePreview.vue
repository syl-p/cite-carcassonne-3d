<template>
  <div class="relative w-full overflow-x-hidden">
    <div
      ref="slider"
      class="flex w-full cursor-grab snap-x snap-mandatory space-x-4 overflow-x-auto scroll-smooth"
    >
      <div
        v-if="data && data.length > 0"
        v-for="(item, index) in data"
        :key="index"
        class="h-[200] w-[150px] shrink-0 snap-center rounded-lg relative"
      >
        <a href="#" :title="item.user?.username" class="absolute top-3 right-3 flex flex-col justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-8 text-white">
            <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
          </svg>
        </a>
        <UiGalerieCard :item="item" :index="index" @selected="showImageInModal(index)"/>
      </div>
      <div v-else class="mb-6 w-full rounded-xl border p-6">
        <p>Aucune photo n'a encore été publiée.</p>
      </div>
    </div>
  </div>

  <UModal v-model="isOpen">
    <div class="p-4" v-if="selectedIndex != null && data">
      <img :src="`/uploads/${data![selectedIndex].path}`" class="w-full" />
    </div>
  </UModal>

  <a
    @click.prevent="onClick()"
    href="#"
    class="group relative mt-10 flex cursor-pointer items-center justify-end space-x-2"
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
const { userInfo } = storeToRefs(store);
const appStore = useAppStore();
const { setModalVisible } = appStore;

const { page } = useContent();
const { part } = defineProps(["part"]);
const { data } = await useFetch(`/api/media/${part}/all`);

const isOpen = ref(false);
const selectedIndex = ref<number>(null);

const slider = templateRef("slider");
let isDragging = false;
let startX = 0;
let scrollTo = 0;

const dialog = ref<HTMLDialogElement | null>(null);

function showImageInModal(index: number) {
  isOpen.value = true;
  selectedIndex.value = index;
}

const onFinishUpload = (media) => {
  // console.log(media);
  if (dialog.value) dialog.value?.close();
  // TODO: SUCCESS ALERT
  // TODO: ADD PIC TO GALERIE
  data.value = [...data.value, ...media];
};

const onClick = () => {
  if (userInfo.value) {
    if (dialog.value) dialog.value?.showModal();
  } else {
    setModalVisible(true);
  }
}

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
