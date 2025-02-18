<template>
  <h1
    class="mb-6 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
  >
    Présentez vous
  </h1>

  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4 md:space-y-6"
    @submit.prevent="handle"
  >
    <UiAlert v-if="message" type="danger">
      {{ message }}
    </UiAlert>

    <UFormGroup label="Username" name="username" class="mb-6">
      <UInput v-model="state.username" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Nouveau mot de passe" name="password" class="mb-6">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UFormGroup
      label="Mot de passe de confirmation"
      name="password_confirmation"
    >
      <UInput v-model="state.password_confirmation" type="password" />
    </UFormGroup>

    <UButton type="submit"> S'inscrire </UButton>

    <!--    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
      Vous avez déjà un compte ?
      <NuxtLink
        to="/components/login"
        class="text-primary-600 dark:text-primary-500 font-medium hover:underline"
        >Se connecter</NuxtLink
      >
    </p>-->
  </UForm>
</template>

<script lang="ts" setup>
import signupValidator from "#shared/validators/signup.validator";
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
  layout: "auth",
});

const emit = defineEmits(["logged"]);
const store = useUserStore();
const { setUser } = store;

const schema = signupValidator;
type Schema = z.output<typeof schema>;
const state = reactive({
  username: undefined,
  email: undefined,
  password: undefined,
  password_confirmation: undefined,
});

const message = ref("");
const toast = useToast();

async function handle(event: FormSubmitEvent<Schema>) {
  try {
    const response = await $fetch("/api/auth/signup", {
      method: "POST",
      body: {
        ...event.data,
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
