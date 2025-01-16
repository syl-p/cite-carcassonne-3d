<template>
  <section class="mt-10" v-if="page">
    <header class="relative mb-6 w-full transition-all">
      <NuxtLink to="/" class="text-xl lg:text-2xl">Découvrir la cité</NuxtLink>
      <h1 class="mb-3 border-b-black text-4xl font-bold lg:text-6xl">
        {{ page && page.title ? page.title : "Bienvenu" }}
      </h1>
      <p>
        {{
          page && page.title
            ? page.description
            : "Choisissez une partie de la cité que vous souhaitez découvrir"
        }}
      </p>
    </header>
    <UTabs :items="items" class="w-full">
      <template #description="{ item }">
        <section class="my-12">
          <Suspense>
            <LazyUiGaleriePreview :part="page.object_name" />
            <template #fallback> Chargement de la gallerie </template>
          </Suspense>
        </section>
        <section class="prose prose-lg prose-h2:mt-0 prose-p:text-black">
          <ContentDoc />
        </section>
      </template>
      <template #comments="{ item }">
        <section class="my-12">
          <Suspense>
            <LazyComments :part="page.object_name" />
            <template #fallback> Chargement des commentaires </template>
          </Suspense>
        </section>
      </template>
    </UTabs>
  </section>
</template>

<script setup lang="ts">
const { page } = useContent();
const items = [
  {
    slot: "description",
    label: "description",
    description:
      "Make changes to your account here. Click save when you're done.",
  },
  {
    slot: "comments",
    label: "comments",
    description:
      "Change your password here. After saving, you'll be logged out.",
  },
];
</script>
