<template>
  <div class="index">
    <div class="top"></div>
    <div class="carousel" id="carousel">
      <el-carousel :interval="4000" type="card" :height="height">
        <el-carousel-item @click="carouselClick" v-for="src in imgs" :key="src">
          <img style="width: 100%;height: 100%;" :src="src" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from 'vue-router'
import img1 from '@/assets/img/index/index1.jpg'
import img2 from '@/assets/img/index/index2.jpg'
import img3 from '@/assets/img/index/index3.jpg'
import img4 from '@/assets/img/index/index4.jpg'
import img5 from '@/assets/img/index/index5.jpg'
import img6 from '@/assets/img/index/index6.jpg'
import img7 from '@/assets/img/index/index7.jpg'
import img8 from '@/assets/img/index/index8.jpg'

const router = useRouter()

let height = ref('938px')

let imgs = reactive([img1, img2, img3, img4, img5, img6, img7, img8])

onMounted(() => {
  height.value = document.getElementById('carousel').getBoundingClientRect().height - 50 + 'px'
})

// 点击跳转
const carouselClick = () => {
  router.replace('/')
}
</script>
<style scoped>
  .index {
    width: 100%;
    height: 100%;
    background-color: #e1c5c2;
  }
  .top {
    width: 100%;
    height: 5%;
  }
  .carousel {
    width: 100%;
    height: 95%;
  }
  :deep(.el-carousel__indicators--outside button) {
    background: red!important;
  }
</style>