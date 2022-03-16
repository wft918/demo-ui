<template>
  <div class="Main">
    <div class="main-top" :style="{'background-color': indexStore.topBg}">
      <Top />
    </div>
    <div class="main-bot">
      <div class="main-lt">
        <!-- <el-card class="box-card"> -->
          <Left />
        <!-- </el-card> -->
      </div>
      <div class="main-container">
        <div class="Breadcrumb">
          <Breadcrumb />
        </div>
        <div class="main-pad">
          <!-- <el-card class="box-card"> -->
            <div class="main-content">
              <router-view></router-view>
            </div>
          <!-- </el-card> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import '@/utils/flexible'
import Top from './layout/top.vue'
import Left from './layout/left.vue'
import Breadcrumb from './layout/Breadcrumb.vue'
import { useIndexStore } from '@/store'

const indexStore = useIndexStore()
</script>
<style scoped>
  .Main {
    width: 100%;
    height: 100%;
  }

  .main-top {
    width: 100%;
    height: .3177rem;
  }
  
  .main-bot {
    width: 100%;
    height: calc(100% - .3177rem);
    display: flex;
  }

  .main-bot .main-lt {
    width: 10.5%;
    height: 100%;
  }

  .box-card {
    width: 100%;
    height: 100%;
  }

  .main-bot .main-container {
    width: 89.5%;
    height: 100%;
  }

  .Breadcrumb {
    width: 100%;
    height: .2135rem;
  }
  
  .main-pad {
    width: 100%;
    height: calc(100% - .2135rem);
    background-color: #f1f2f5;
    padding: .0521rem;
    box-sizing: border-box;
  }
  .main-content {
    width: 100%;
    height: 100%;
    background-color: #fff;
    -webkit-box-shadow:0 0 10px #0CC;
    -moz-box-shadow:0 0 10px #0CC;
    box-shadow:0 0 10px #0CC;
  }
</style>