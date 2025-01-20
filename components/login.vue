<template>
  <h1
    class="mb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
  >
    Bon retour parmi nous.
  </h1>
  <form class="space-y-4 md:space-y-6" @submit.prevent="login()">
    <UiAlert v-if="message" type="danger">
      {{ message }}
    </UiAlert>
    <div>
      <label
        for="email"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >Email</label
      >
      <input
        type="email"
        name="email"
        id="email"
        class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="name@company.com"
        v-model="email"
        required
      />
    </div>
    <div>
      <label
        for="password"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >Mot de passe</label
      >
      <input
        type="password"
        name="password"
        id="password"
        placeholder="••••••••"
        v-model="password"
        class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        required
      />
    </div>
    <button
      type="submit"
      class="hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
    >
      Se connecter
    </button>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Vous n'avez pas encore de compte ?
      <NuxtLink
        to="/components/sign-up"
        class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
        >S'inscrire</NuxtLink
      >
    </p>
  </form>
</template>

<script lang="ts" setup>
const emit = defineEmits(["logged"]);
definePageMeta({
  layout: "auth",
});

const store = useUserStore();
const { setUser } = store;
const email = ref("");
const password = ref("");
const message = ref("");

async function login() {
  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      body: { email: email.value, password: password.value },
    });

    const tokenCookie = useCookie("authToken");
    tokenCookie.value = response.token; // Assure-toi que `response.token` existe
    setUser(response.user);
    toast.add({
      title: "Vous êtes connecté !",
      description:
        "Vous pouvez commenter et partager votre plus beau souvenir de la cité !",
    });
    emit("logged");
  } catch {
    message.value = "Erreur lors de l'authentification.";
  }
}
</script>
