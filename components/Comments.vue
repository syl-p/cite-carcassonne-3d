<template>
  <form
    class="mb-6 w-full"
    ref="form"
    @submit.prevent="handleUpload"
    v-if="userInfo"
  >
    {{ message }}
    <label
      for="message"
      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >Ton commentaire</label
    >
    <textarea
      v-model="content"
      id="message"
      rows="4"
      class="mb-4 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      placeholder="Leave a comment..."
    ></textarea>

    <button
      :disabled="!content"
      type="submit"
      class="inline- flex items-center rounded-lg bg-yellow-500 px-4 py-2.5 text-center text-xs font-medium text-white hover:bg-yellow-800 focus:ring-4 focus:ring-yellow-200 disabled:bg-gray-100 dark:focus:ring-yellow-900"
    >
      Poster
    </button>
  </form>

  <div v-else>
    <p>
      Pour pouvoir commenter, veuillez vous
      <!--      <NuxtLink
        to="/components/login"
        class="font-bold text-primary hover:underline"
        >connecter</NuxtLink
      >.-->
    </p>
  </div>

  <template v-for="comment in data" v-if="data.length">
    <UiComment :user="comment.user" :createdAt="comment.createdAt">{{
      comment.content
    }}</UiComment>
  </template>
  <p v-else>
    Il n'y a pas de commentaire pour cette partie, soit le premier à donner ton
    avis.
  </p>
</template>

<script lang="ts" setup>
const form = ref<HTMLFormElement>();
const store = useUserStore();
const { userInfo } = storeToRefs(store);
const { part } = defineProps(["part"]);
const token = useCookie("authToken");
const loading = ref(false);
const message = ref<string>("");
const { data } = await useFetch(`/api/comments/${part}/all`);
const content = defineModel();
const toast = useToast();

const handleUpload = async () => {
  if (!form.value || !data.value) return;
  try {
    const res = await $fetch(`/api/comments/${part}/new`, {
      method: "POST",
      body: {
        part,
        content: content.value,
      },
      headers: {
        Authorization: `authorization ${token.value}`,
      },
    });

    data.value = [res, ...data?.value];
    form.value.reset();
    content.value = "";
    toast.add({
      title: "Votre commentaire à été posté !",
    });
  } catch (e) {
    message.value = e?.message;
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>
