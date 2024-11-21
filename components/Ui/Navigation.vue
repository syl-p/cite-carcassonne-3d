<template>
  <header class="fixed left-0 top-0 z-50 flex w-full justify-between p-8">
    <div>
      <NuxtLink
        to="/"
        class="flex items-center justify-center space-x-3 align-middle"
      >
        <span class="block h-8 w-8 bg-yellow-400"></span>
        <span class="block font-bold">Carca 3D</span>
      </NuxtLink>
    </div>
    <nav class="hidden lg:block">
      <ul class="flex items-center space-x-3">
        <li><NuxtLink to="/">Accueil</NuxtLink></li>
        <li><NuxtLink to="/le-projet">Le projet</NuxtLink></li>
        <li><NuxtLink to="/contribuer">Contribuer</NuxtLink></li>
      </ul>
    </nav>
    <div>
      <NuxtLink to="/login" v-if="!userInfo">Se connecter</NuxtLink>
      <p v-else>Connecté en tant que {{ userInfo.username }}</p>
    </div>
  </header>
</template>

<script setup lang="ts">
const store = useUserStore();
const { userInfo } = storeToRefs(store);
</script>
