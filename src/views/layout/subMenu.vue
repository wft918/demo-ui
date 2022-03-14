<template>


  <!--  有子集 -->
  <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.id">
    <template #title>
      <span>{{ menu.name }}</span>
    </template>
    <SubMenu v-for="item in menu.children" :key="item.id" :menu="item" />
  </el-sub-menu>


  <!-- 无子集 -->
  <el-menu-item v-else :index="menu.id" @click="toPage">
    <span>{{ menu.name }}</span>
  </el-menu-item>
</template>
<script setup>
import { toRefs } from "vue"
import SubMenu from './subMenu.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  menu: {
    type: Object,
    required: true
  }
})

const { menu } = toRefs(props)

//  菜单跳转
const toPage = () => {
  router.replace({
    path: props.menu.path
  })
}
</script>
<style scoped>
</style>