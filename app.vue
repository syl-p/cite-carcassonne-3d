<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const store = useUserStore();
const { clearUser, setUser } = store;
const token = useCookie("authToken");

function clearUserInfo() {
  clearUser();
  token.value = null;
}

if (token.value) {
  try {
    const isValid = await $fetch("/api/auth/verify", {
      method: "POST",
      body: { token: token.value },
    });

    if (isValid) {
      const userInfo = await $fetch("/api/auth/me", {
        headers: {
          Authorization: `authorization ${token.value}`,
        },
      });

      setUser(userInfo);
    } else {
      clearUserInfo();
    }
  } catch (error) {
    console.error("Erreur lors de la vérification du token :", error);
    clearUserInfo();
  }
} else {
  clearUserInfo();
}
</script>
