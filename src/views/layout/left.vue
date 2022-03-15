<template>
  <el-menu
    default-active="-"
    class="el-menu-vertical-demo"
    unique-opened
  >
    <SubMenu v-for="menu in menus" :key="menu.id" :menu="menu" />
  </el-menu>
</template>
<script setup>
import SubMenu from './subMenu.vue'
import leftMenu from '@/utils/leftMenu'
import { computed } from 'vue'

const menus = computed(() => leftMenu)
</script>
<style scoped>
</style>