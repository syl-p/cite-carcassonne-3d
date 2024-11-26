<template>
  <form @submit.prevent="handleUpload" type="multipart/form-data">
    <input type="file" ref="fileInput" />
    <button type="submit">Envoyer</button>
  </form>
</template>

<script setup lang="ts">
const fileInput = ref<HTMLInputElement | null>(null);
const handleUpload = async () => {
  if (fileInput.value) {
    const file = fileInput.value?.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await $fetch("/api/media/upload", {
        method: "POST",
        body: formData,
      });

      console.log(res);
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
