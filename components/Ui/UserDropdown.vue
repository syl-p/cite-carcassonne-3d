<template>
  <UDropdown
    :items="dropDownLinks"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

    <template #account="{ item }">
      <p class="truncate font-medium text-gray-900 dark:text-white">
        {{ userInfo.username }} ({{ userInfo.email }})
      </p>
    </template>

    <template #item="{ item }">
      <span class="truncate">{{ item.label }}</span>

      <UIcon
        :name="item.icon"
        class="ms-auto h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
      />
    </template>
  </UDropdown>
</template>
<script setup lang="ts">
import type { DropdownItem } from "#ui/types";

const store = useUserStore();
const { userInfo } = storeToRefs(store);

const dropDownLinks: DropdownItem[][] = [
  [
    {
      label: "email",
      slot: "account",
      disabled: true,
    },
  ],
  [
    {
      label: "Sign out",
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
  ],
];

function logout() {}
</script>
