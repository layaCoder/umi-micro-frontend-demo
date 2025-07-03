<template>
  <div>
    <header
      class="h-16 w-full bg-black/45 text-white flex flex-row items-center"
    >
      Vue3
    </header>
    <nav class="flex flex-row gap-3">
      <router-link to="/page1" class="group">
        <span class="group-[.router-link-active]:text-pink-500">PAGE1</span>
      </router-link>
      <router-link to="/page2" class="group">
        <span class="group-[.router-link-active]:text-pink-500">PAGE2</span>
      </router-link>
    </nav>
    <RouterView />
  </div>
</template>

<script setup></script>

<style lang="less" scoped></style>
