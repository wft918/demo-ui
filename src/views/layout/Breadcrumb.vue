<template>
  <div style="width: 100%;height: 100%;">
    <el-tabs type="card" v-model="currentPath" class="demo-tabs" @tab-click="handleClick" @tab-remove="tabRemove">
      <el-tab-pane label="主页" :name="'/home'"></el-tab-pane>
      <el-tab-pane v-for="mainTab in mainTabs" :key="mainTab.id" :label="mainTab.meta.title" :name="mainTab.path" closable></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { computed, ref, watch } from "vue";
import { useIndexStore } from '@/store'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'

const indexStore = useIndexStore()
const router = useRouter()
const route = useRoute()

// const { mainTabs } = storeToRefs(indexStore)

let currentPath = ref('/home')

let mainTabs = computed({
  get() {
    return indexStore.mainTabs
  },
  set(val) {
    indexStore.updatemainTabs(val)
  }
})

watch(
  () => route.path,
  (to, from) => {
    if(to !== '/home' && to !== '/login' && to !== '/cannot' && to !== '/register' && to !== '/index') {
      mainTabs.value = to
    }
    if(to !== '/login' && to !== '/cannot' && to !== '/register' && to !== '/index') currentPath.value = to
  },
  {
    deep: true,
    immediate: false
  }
)

//  点击跳转
const handleClick = () => {
  router.replace({
    path: currentPath.value
  })
}

//  点击删除
const tabRemove = (path) => {
  let mainPaths = mainTabs.value.map(item => item.path)
  let idx = mainPaths.indexOf(path)
  mainTabs.value = idx
  if(path === route.path) {  // 移除的是当前打开的页面  页面跳转问题
    if(!mainTabs.value.length) {
      router.replace('/home')
    }else if(idx === mainTabs.value.length) {
      router.replace(mainTabs.value[idx - 1].path)
    }else {
      router.replace(mainTabs.value[idx].path)
    }
  }
}
</script>
<style scoped>
  
</style>