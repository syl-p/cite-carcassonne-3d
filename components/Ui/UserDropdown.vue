<template>
  <UDropdown
    :items="dropDownLinks"
    :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }"
  >
    <UAvatar>
      {{ userInfo!.username[0] }}
    </UAvatar>

    <template #account="{ item }">
      <p class="truncate font-medium text-gray-900 dark:text-white">
        {{ userInfo!.username }} ({{ userInfo!.email }})
      </p>
    </template>

    <template #logout="{ item }">
      <button @click="logout" class="flex w-full items-center justify-between">
        <span class="block">Se déconnecter</span>
        <UIcon
          :name="item.icon"
          class="ms-auto h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
        />
      </button>
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
const { clearUser } = store;
const { userInfo } = storeToRefs(store);
const tokenCookie = useCookie("authToken");

const dropDownLinks: DropdownItem[][] = [
  [
    {
      label: "email",
      slot: "account",
      disabled: true,
    },
    {
      label: "Mes informations",
      href: "/user/settings",
      icon: "i-heroicons-cog-8-tooth",
    },
  ],
  [
    {
      label: "Sign out",
      slot: "logout",
      icon: "i-heroicons-arrow-left-on-rectangle",
    },
  ],
];

function logout() {
  tokenCookie.value = undefined;
  clearUser();
  navigateTo("/");
}
</script>
