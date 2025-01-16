<template>
  <header class="z-50 w-full py-8">
    <UContainer class="flex justify-between">
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
        <UiUserDropdown v-else />
      </div>
    </UContainer>
  </header>
</template>

<script setup lang="ts"></script>
