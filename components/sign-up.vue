<template>
  <h1
    class="mb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
  >
    Présentez vous
  </h1>
  <form class="space-y-4 md:space-y-6" @submit.prevent="login()">
    <UiAlert v-if="message" type="danger">
      {{ message }}
    </UiAlert>
    <div>
      <label
        for="email"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >Username</label
      >
      <input
        type="text"
        name="username"
        id="username"
        class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="monpseudo"
        v-model="username"
        required
      />
    </div>
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
    <div>
      <label
        for="password"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >Mot de passe de confirmation</label
      >
      <input
        type="password"
        name="password_confirmation"
        id="password"
        placeholder="••••••••"
        v-model="passwordConfirmation"
        class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        required
      />
    </div>
    <button
      :disabled="!username || !email || !password || !passwordConfirmation"
      type="submit"
      class="hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
    >
      S'inscrire
    </button>
    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Vous avez déjà un compte ?
      <NuxtLink
        to="/components/login"
        class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
        >Se connecter</NuxtLink
      >
    </p>
  </form>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});

const emit = defineEmits(["logged"]);
const store = useUserStore();
const { setUser } = store;
const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const message = ref("");
const toast = useToast();

async function login() {
  try {
    const response = await $fetch("/api/auth/signup", {
      method: "POST",
      body: {
        username: username.value,
        email: email.value,
        password: password.value,
        password_confirmation: passwordConfirmation.value,
      },
    });

    const tokenCookie = useCookie("authToken");
    tokenCookie.value = response.token; // Assure-toi que `response.token` existe
    setUser(response.user);

    emit("logged");
    toast.add({
      title: "Vous êtes connecté !",
      description:
        "Vous pouvez commenter et partager votre plus beau souvenir de la cité !",
    });
  } catch {
    message.value = "Erreur lors de le création du compte.";
  }
}
</script>
