<template>
  <div>
    <!-- Onglets -->
    <div
      class="mx-8 mb-6 border-b border-gray-100 text-center text-sm font-medium text-gray-500 lg:mx-12"
    >
      <ul class="-mb-px flex flex-wrap">
        <li
          v-for="tab in tabs"
          :key="tab.name"
          class="inline-block cursor-pointer rounded-t-lg border-b-2 p-4"
          :class="[activeTab === tab.name ? activeClass : noActiveClass]"
          @click="setActiveTab(tab.name)"
        >
          {{ tab.label }}
        </li>
      </ul>
    </div>

    <!-- Contenu des onglets -->
    <div class="tab-content">
      <slot :name="activeTab" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const { tabs } = defineProps(["tabs"]);

// L'onglet actuellement actif
const activeTab = ref(tabs[0].name);
const noActiveClass =
  "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300";
const activeClass = "border-blue-600 rounded-t-lg active";

// Changer l'onglet actif
const setActiveTab = (tabName) => {
  activeTab.value = tabName;
};
</script>
