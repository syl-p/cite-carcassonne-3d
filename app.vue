<template>
  <main class="relative -z-0 bg-white text-lg dark:bg-slate-700">
    <UiNavigation />
    <div
      class="relative z-10 w-full overflow-hidden bg-white transition-transform duration-700 ease-in-out lg:fixed lg:left-0 lg:top-0 lg:h-full dark:bg-slate-700"
      :class="
        page && page.title ? 'h-[70vh] lg:w-[50vw]' : 'h-screen lg:w-screen'
      "
    >
      <TresCanvas
        v-bind="gl"
        class="h-full w-full transition-transform duration-700 ease-in-out"
      >
        <Experience @is-moving="(state) => updateState(state)" />
      </TresCanvas>

      <div class="absolute bottom-8 left-8 w-full" v-if="page && page.title">
        <UiPreviousNext />
      </div>
    </div>
    <div
      class="z-20 flex flex-1 flex-col justify-center bg-white lg:ml-[50vw] lg:w-[50vw] dark:bg-slate-700"
      v-show="page && page.title != ''"
    >
      <NuxtPage/>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NoToneMapping, PCFSoftShadowMap, SRGBColorSpace } from "three";
const { page } = useContent();
type CameraState = "IDLE" | "MOVING" | "ARRIVED";

const cameraState = ref<CameraState>("IDLE");

const updateState = (state: CameraState) => {
  cameraState.value = state;
  // console.log("test", cameraState.value);
};

const gl = {
  alpha: true,
  shadows: true,
  shadowMap: {
    autoUpdate: true,
  },
  shadowMapType: PCFSoftShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

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
