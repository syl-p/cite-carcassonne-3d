<template>
  <article class="rounded-lg bg-white py-6 text-base dark:bg-gray-900">
    <footer class="mb-2 flex items-center justify-between">
      <div class="flex items-center">
        <p
          class="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white"
        >
          <img
            class="mr-2 h-6 w-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
            alt="Michael Gough"
          />{{ user?.username || "[DELETED]" }}
        </p>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <time pubdate :datetime="createdAt" :title="createdAt"
            >Posté le {{ createdAt }}</time
          >
        </p>
      </div>
      <button
        id="dropdownComment1Button"
        data-dropdown-toggle="dropdownComment1"
        class="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          class="h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 3"
        >
          <path
            d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
          />
        </svg>
        <span class="sr-only">Comment settings</span>
      </button>
      <!-- Dropdown menu -->
      <div
        id="dropdownComment1"
        class="z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700"
      >
        <ul
          class="py-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconHorizontalButton"
        >
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Edit</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Remove</a
            >
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Report</a
            >
          </li>
        </ul>
      </div>
    </footer>
    <p class="text-gray-500 dark:text-gray-400">
      <slot />
    </p>

    <div class="mt-4 flex items-center space-x-4" v-if="false">
      <button
        type="button"
        class="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
      >
        <svg
          class="mr-1.5 h-3.5 w-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
        </svg>
        Reply
      </button>
    </div>
  </article>
</template>

<script lang="ts" setup>
const { user, createdAt } = defineProps(["user", "createdAt"]);
</script>
