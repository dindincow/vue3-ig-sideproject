<template>
  <div class="h-screen">
    <HeaderVue class="h-header"></HeaderVue>
    <MainVue class="h-main"></MainVue>
    <FloatingVue></FloatingVue>
  </div>
</template>

<script setup>
import HeaderVue from './components/header/index.vue'
import MainVue from './components/main.vue'
import FloatingVue from './components/floating.vue'
</script>

<style lang="scss" scoped></style>
