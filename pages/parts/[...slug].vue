<template>
  <Transition name="fade">
    <article class="mt-8 lg:mt-24" v-if="page">
      <header class="relative mb-3 w-full px-8 transition-all lg:px-12">
        <NuxtLink to="/" class="text-xl lg:text-2xl"
          >Découvrir la cité</NuxtLink
        >
        <h1 class="mb-3 border-b-black text-4xl font-bold lg:text-6xl">
          {{ page.title }}
        </h1>
        <p>{{ page.description }}</p>
      </header>

      <UiTabs :tabs="tabs">
        <!-- Contenu de l'onglet 1 -->
        <template #description>
          <section class="mb-6">
            <UiGaleriePreview />
          </section>
          <section class="prose prose-lg prose-p:text-black lg:px-12">
            <ContentDoc />
          </section>
        </template>

        <!-- Contenu de l'onglet 2 -->
        <template #media>
          <section class="px-8">
            <UiUploadForm />
            <LazyUiGalerie />
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
    </article>
  </Transition>
</template>

<script setup lang="ts">
const { page, toc } = useContent();
const route = useRoute();
console.log(route, page.value._path);

const tabs = [
  { name: "description", label: "Description" },
  { name: "media", label: "Galerie" },
  { name: "comments", label: "Commentaires" },
];
</script>
