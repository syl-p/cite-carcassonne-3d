<template>
  <main class="relative -z-0 bg-white text-lg">
    <UiNavigation />
    <section>
      <div
        class="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0"
      >
        <slot />
      </div>
    </section>
  </main>
</template>
