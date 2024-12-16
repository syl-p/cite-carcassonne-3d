<template>
  <article class="mt-8 lg:mt-24" v-if="page">
    <header class="relative mb-3 w-full px-8 transition-all lg:px-12">
      <NuxtLink to="/" class="text-xl lg:text-2xl">Découvrir la cité</NuxtLink>
      <h1 class="mb-3 border-b-black text-4xl font-bold lg:text-6xl">
        {{ page.title }}
      </h1>
      <p>{{ page.description }}</p>
    </header>

    <UiTabs>
      <UiTab name="Description">
        <article>
          <section class="mb-12 px-12">
            <Suspense>
              <LazyUiGaleriePreview :part="page.object_name" />
              <template #fallback> Chargement de la gallerie </template>
            </Suspense>
          </section>
          <section
            class="prose prose-lg px-8 prose-h2:mt-0 prose-p:text-black lg:px-12"
          >
            <ContentDoc />
          </section>
        </article>
      </UiTab>

      <UiTab name="Commentaires">
        <div class="px-8 lg:px-12">
          <Suspense>
            <LazyComments :part="page.object_name" />
            <template #fallback> Chargement des commentaires </template>
          </Suspense>
        </div>
      </UiTab>
    </UiTabs>
  </article>
</template>

<script setup lang="ts">
const { page } = useContent();
</script>
