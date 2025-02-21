<template>
  <h1 class="mb-3 text-3xl">Modifier vos informations</h1>
  <UForm
    :schema="schema"
    :state="state"
    :validate="customValidate"
    @submit.prevent="handle"
    class="space-y-4"
  >
    <UiAlert v-if="message" type="danger">
      {{ message }}
    </UiAlert>

    <fieldset class="my-3 rounded-xl border border-dashed p-6">
      <legend>Vos Informations</legend>
      <UFormGroup label="Username" name="username" class="mb-6">
        <UInput v-model="state.username" />
      </UFormGroup>

      <UFormGroup label="Email" name="email">
        <UInput v-model="state.email" />
      </UFormGroup>
    </fieldset>

    <fieldset class="my-3 rounded-xl border border-dashed p-6">
      <legend>
        Facultatif: changement de mot de passe. Laissez vide si vous ne
        souhaitez pas le modifier
      </legend>
      <UFormGroup label="Nouveau mot de passe" name="password" class="mb-6">
        <UInput v-model="state.password" type="password" />
      </UFormGroup>

      <UFormGroup
        label="Mot de passe de confirmation"
        name="password_confirmation"
      >
        <UInput v-model="state.password_confirmation" type="password" />
      </UFormGroup>
    </fieldset>

    <UFormGroup label="Mot de passe actuel" name="current_password">
      <UInput v-model="state.current_password" type="password" />
    </UFormGroup>

    <UButton type="submit"> Modifier </UButton>
  </UForm>
  <UDivider label="OU" class="my-10" />
  <UButton color="red" @click="deleteAccount()">Supprimer votre compte</UButton>
</template>

<script setup lang="ts">
const store = useUserStore();
const { userInfo } = storeToRefs(store);
const { clearUser } = store;
const token = useCookie("authToken");
import editValidate from "#shared/validators/auth_edit.validator";
import { z } from "zod";
import type { FormError, FormSubmitEvent } from "#ui/types";

definePageMeta({
  middleware: "auth",
  layout: "auth",
});

const message = ref("");
const toast = useToast();
const schema = editValidate;
type Schema = z.output<typeof schema>;

const state = reactive({
  username: userInfo.value!.username,
  email: userInfo.value!.email,
  current_password: undefined,
  password: undefined,
  password_confirmation: undefined,
});

// TODO: Refine in Zod Validation not working ?
const customValidate = (state: any): FormError[] => {
  const errors = [];
  if (
    state.password &&
    state.password_confirmation &&
    state.password !== state.password_confirmation
  ) {
    errors.push({
      path: "password_confirmation",
      message: "Password and password confirmation must be equal",
    });
  }
  return errors;
};

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
    console.log(error);
    message.value = "Des erreurs sont présentes dans vos informations.";
  }
}

async function deleteAccount() {
  try {
    await $fetch("/api/auth/delete_account", {
      method: "DELETE",
      headers: {
        Authorization: `authorization ${token.value}`,
      },
    });

    toast.add({
      title: "Votre compte à bien été supprimé !",
    });

    clearUser();
  } catch (error) {
    console.log(error);
    message.value = "Des erreurs sont survenues";
  }
}
</script>
