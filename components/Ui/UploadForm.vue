<template>
  <form @submit.prevent="handleUpload" type="multipart/form-data">
    <UiDropFiles @change="change" />
    <ul class="mb-3 divide-y divide-gray-200">
      <li
        v-for="(file, index) in filesPreview"
        :key="index"
        class="relative flex min-w-0 items-center space-x-6 p-4 hover:bg-gray-50"
      >
        <div class="flex min-w-0 flex-1 items-center space-x-6">
          <div class="hidden flex-shrink-0 md:block">
            <img :src="file.path" class="max-w-16" />
          </div>
          <div class="min-w-0 flex-1">
            <p class="m-0 overflow-hidden text-ellipsis text-sm font-medium">
              {{ file.name }}
            </p>
            <p class="text-xs font-light text-gray-500"></p>
          </div>
        </div>
        <div>
          <button @click="deleteFile(index)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </li>
    </ul>

    <div class="text-right">
      <button
        :disabled="!filesPreview.length"
        type="submit"
        class="hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 disabled:bg-gray-100"
      >
        Envoyer
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const token = useCookie("authToken");
type FilePreview = {
  file: File;
  name: string;
  path: string;
};

const filesPreview = ref<FilePreview[]>([]);

function change(files: FileList) {
  const list = Array.from(files);
  list.forEach((file) => {
    readFile(file);
  });
}

function readFile(file: File): void {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    const preview: FilePreview = {
      file: file,
      name: file.name,
      path: reader.result as string,
    };

    filesPreview.value.push(preview);
  };
}

function deleteFile(index: number): void {
  filesPreview.value.splice(index, 1);
}

const handleUpload = async () => {
  if (!filesPreview.value.length) return;
  if (!token.value) return;

  const formData = new FormData();
  for (const item of filesPreview.value) {
    formData.append(
      "file",
      item.file,
      item.name.replace(" ", "-".toLocaleLowerCase()),
    );
  }

  try {
    const res = await $fetch("/api/media/upload", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `authorization ${token.value}`,
      },
    });

    console.log(res);
  } catch (e) {
    console.error(e);
  }
};
</script>
