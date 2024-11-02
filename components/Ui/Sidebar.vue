<template>
  <aside
    class="fixed left-8 top-0 z-50 w-40 shrink-0 py-8 lg:left-0 lg:top-0 lg:block lg:h-screen lg:border-r lg:border-gray-300 lg:bg-primary"
  >
    <div class="h-full lg:flex lg:flex-col lg:items-center lg:justify-between">
      <slot name="menuButton"></slot>

      <div class="hidden w-full text-center lg:block">
        <slot name="homeButton"></slot>
      </div>
    </div>
  </aside>
</template>
