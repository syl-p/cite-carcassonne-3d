<template>
  <h1 class="mb-3 text-3xl">Modifier vos informations</h1>
  <UForm
    :schema="schema"
    :state="state"
    @submit.prevent="handle"
    class="space-y-4"
  >
    <UiAlert v-if="message" type="danger">
      {{ message }}
    </UiAlert>

    <UFormGroup label="Username" name="username">
      <UInput v-model="state.username" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UFormGroup label="Password Confirmation" name="password_confirmation">
      <UInput v-model="state.password_confirmation" type="password" />
    </UFormGroup>

    <UButton type="submit"> Modifier </UButton>
  </UForm>
  <UDivider label="OU" class="my-10" />
  <UButton color="red">Supprimer votre compte</UButton>
</template>
<script setup lang="ts">
const store = useUserStore();
const { userInfo } = storeToRefs(store);
const token = useCookie("authToken");
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: "auth",
  layout: "auth",
});

const message = ref("");
const toast = useToast();
const schema = z
  .object({
    username: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).optional(),
    password_confirmation: z.string().min(8).optional(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Password do not match",
    path: ["passwordConfirm"],
  });

type Schema = z.output<typeof schema>;

const state = reactive({
  username: userInfo.value!.username,
  email: userInfo.value!.email,
  password: undefined,
  password_confirmation: undefined,
});

async function handle(event: FormSubmitEvent<Schema>) {
  try {
    await $fetch("/api/auth/edit", {
      method: "PATCH",
      body: { ...event.data },
      headers: {
        Authorization: `authorization ${token.value}`,
      },
    });

    toast.add({
      title: "Vos informations on bien été modifiées.",
    });
  } catch (error) {
    message.value = "Des erreurs sont présentes dans vos informations.";
  }
}
</script>
