<template>
  <header class="fixed left-0 top-0 z-50 w-full py-8">
    <UContainer
      class="flex justify-between"
      :ui="{ constrained: 'max-w-screen-2xl' }"
    >
      <div>
        <NuxtLink
          to="/"
          class="flex items-center justify-center space-x-3 align-middle"
        >
          <span class="block h-8 w-8 bg-yellow-400"></span>
          <span class="block font-bold">Carca 3D</span>
        </NuxtLink>
      </div>
      <!-- <nav class="hidden lg:block">
        <ul class="flex items-center space-x-3">
          <li><NuxtLink to="/">Accueil</NuxtLink></li>
          <li><NuxtLink to="/le-projet">Le projet</NuxtLink></li>
          <li><NuxtLink to="/contribuer">Contribuer</NuxtLink></li>
        </ul>
      </nav> -->
      <div>
        <template v-if="!userInfo">
          <button @click="setModalVisible(true)">Se connecter</button>
        </template>
        <UiUserDropdown v-else />
      </div>
    </UContainer>
  </header>
  <UModal v-model="modalVisible" :ui="{ padding: 'p-6' }" @close="setModalVisible(false)">
    <div class="p-6">
      <UTabs v-model="selected" :items="items" class="w-full">
        <template #login="{ item }">
          <Login @logged="setModalVisible(false)" />
        </template>
        <template #signup="{ item }">
          <SignUp @logged="setModalVisible(false)" />
        </template>
      </UTabs>
    </div>
  </UModal>
</template>

<script setup lang="ts">
const store = useUserStore();
const { userInfo } = storeToRefs(store);

const appStore = useAppStore();
const { modalVisible } = storeToRefs(appStore);
const {setModalVisible} = appStore;

const items = [
  {
    slot: "login",
    label: "Se connecter",
  },
  {
    slot: "signup",
    label: "S'inscrire",
  },
];
const selected = ref(1);
</script>
