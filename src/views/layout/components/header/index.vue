<template>
  <div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1">
    <div class="flex items-center">
      <img
        class="h-4 cursor-pointer mr-2"
        src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png"
        @click="onToHome"
      />
      <HeaderSearch class="mr-1"></HeaderSearch>
      <HeaderTheme class="mr-1"></HeaderTheme>
      <headerMy></headerMy>
    </div>
  </div>
</template>

<script setup>
import HeaderSearch from './header-search/index.vue'
import HeaderTheme from './header-theme.vue'
import headerMy from './header-my.vue'
</script>

<style lang="scss" scoped></style>
