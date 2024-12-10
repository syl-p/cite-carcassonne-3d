<template>
  <div>
    <!-- Onglets -->
    <div
      class="mx-8 mb-6 border-b border-gray-100 text-center text-sm font-medium text-gray-500 lg:mx-12"
    >
      <ul class="-mb-px flex flex-wrap">
        <li
          v-for="(slot, index) in slots"
          :key="slot.props?.name"
          class="inline-block cursor-pointer rounded-t-lg border-b-2 p-4"
          :class="[activeTab === index ? activeClass : noActiveClass]"
          @click="activeTab = index"
        >
          {{ slot.props?.name }}
        </li>
      </ul>
    </div>

    <!-- Contenu des onglets -->
    <div
      class="flex transition-transform [&>*]:w-full [&>*]:shrink-0"
      :style="{ transform }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const { tabs } = defineProps(["tabs"]);
const slots = useSlots().default?.();
console.log(slots);
const transform = computed(
  () => `translate3d(-${activeTab.value * 100}%, 0px, 0px)`,
);
// L'onglet actuellement actif
const activeTab = ref(0);
const noActiveClass =
  "border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300";
const activeClass = "border-blue-600 rounded-t-lg active";
</script>
