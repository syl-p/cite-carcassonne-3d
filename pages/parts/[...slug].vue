<template>
  <article class="mt-8 lg:mt-24" v-if="page">
    <header class="relative mb-3 w-full px-8 transition-all lg:px-12">
      <NuxtLink to="/" class="text-xl lg:text-2xl">Découvrir la cité</NuxtLink>
      <h1 class="mb-3 border-b-black text-4xl font-bold lg:text-6xl">
        {{ page.title }}
      </h1>
      <p>{{ page.description }}</p>
    </header>

    <UiTabs :tabs="tabs">
      <!-- Contenu de l'onglet 1 -->
      <template #description>
        <section class="mb-6 px-12">
          <Suspense>
            <UiGaleriePreview />
            <template #fallback> Chargement de la gallerie </template>
          </Suspense>

          <a
            @click.prevent="toggleDialog()"
            href="#"
            class="group relative mt-6 flex cursor-pointer items-center justify-end space-x-2"
          >
            <span
              class="relative z-10 text-sm font-bold uppercase leading-6 tracking-wide before:absolute before:-left-6 before:-top-1/2 before:-z-10 before:h-12 before:w-12 before:rounded-full before:bg-yellow-400 before:content-[''] group-hover:underline"
            >
              <template v-if="userInfo">
                Participer a la galerie photo
              </template>
              <template v-else>
                Connectez vous pour pouvoir participer à la galerie photo
              </template>
            </span>

            <!-- Flèche -->
            <div class="relative">
              <span
                class="inline-block transition-transform group-hover:translate-x-1"
              >
                ➔
              </span>
            </div>
          </a>
        </section>
        <section class="prose prose-lg px-8 prose-p:text-black lg:px-12">
          <ContentDoc />
        </section>
      </template>

      <!-- Contenu de l'onglet 3 -->
      <template #comments>
        <div>
          <h2>Contenu de Tab 3</h2>
          <p>C'est le contenu de l'onglet 3.</p>
        </div>
      </template>
    </UiTabs>

    <dialog
      v-if="userInfo"
      ref="dialog"
      class="w-full rounded-xl backdrop:bg-gray-500 backdrop:opacity-75 md:w-1/2"
    >
      <div class="rounded-lg p-6" id="dialog-container">
        <UiUploadForm />
      </div>
    </dialog>
  </article>
</template>

<script setup lang="ts">
const store = useUserStore();
const { userInfo } = storeToRefs(store);
const { page, toc } = useContent();
const dialog = ref<HTMLDialogElement | null>(null);

async function toggleDialog(): void {
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

onMounted(() => {
  if (dialog.value) {
    dialog.value.addEventListener("click", (event) => {
      if (event.target == dialog.value) {
        dialog.value.close();
      }
    });
  }
});

const tabs = [
  { name: "description", label: "Description" },
  { name: "comments", label: "Commentaires" },
];
</script>
