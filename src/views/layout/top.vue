<template>
  <div style="width: 100%; height: 100%; display: flex">
    <div class="logo">
      <span class="logo-txt">LOGO</span>
    </div>
    <div class="top-content">
      <div class="dateTime">
        <div class="dateWeek">
          <div class="color">{{ currentDate }}</div>
          <div class="color">{{ currentWeek }}</div>
        </div>
        <div class="time">
          <span class="color">{{ currentTime }}</span>
        </div>
      </div>
      <div class="func">
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="isFullScreen ? '退出全屏' : '全屏'"
          placement="left-start"
        >
          <div class="fullscreen" @click="fullscreenClick">
            <el-icon :size="30" :color="'yellow'">
              <FullScreen />
            </el-icon>
          </div>
        </el-tooltip>
        <div class="color-picker">
          <el-color-picker v-model="color" @change="colorPickerChange" />
        </div>
        <div class="username">
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link">
              {{ username }}
              <el-icon class="el-icon--right">
                <ArrowDown />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="logoutHandle">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from "vue";
import { FullScreen, ArrowDown } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import screenfull from 'screenfull'
import { useIndexStore } from '@/store'
import { useRouter } from 'vue-router'
const indexStore = useIndexStore()
const router = useRouter()

let isFullScreen = ref(false)
let color = ref('#409EFF')

const currentDate = computed(() => getDate(0));
const currentWeek = computed(() => getWeek(getDate(0)));
const username = computed(() => localStorage.getItem('_user_name'))
let currentTime = ref("");
let timer = null;

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString("chinese", {
      hour12: false,
    });
  }, 1000);
  window.addEventListener('resize', currentScreen)
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  window.removeEventListener('resize', currentScreen)
});

//  改变颜色触发
const colorPickerChange = () => {
  indexStore.updatetopBg(color.value)
}

// 切换全屏
const fullscreenClick = () => {
  if(screenfull.isEnabled) screenfull.toggle()
}

//  退出登录
const logoutHandle = () => {
  ElMessageBox.confirm(`确定进行[退出]操作?`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    router.replace({
      path: '/login'
    })
  }).catch((err) => {})
}

// 浏览器改变触发
const currentScreen = () => {
  if(isFullScreen.value !== screenfull.isFullscreen) isFullScreen.value = screenfull.isFullscreen
}
// 获取yyyy-MM-dd 为周几?
function getWeek(date) {
  var weekArray = new Array(
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六"
  );
  var week = weekArray[new Date(date).getDay()];
  return week;
}
function getDate(num) {
  var date1 = new Date();
  //今天时间
  var time1 =
    date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
  var date2 = new Date(date1);
  date2.setDate(date1.getDate() + num);
  //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
  var time2 =
    addZero(date2.getFullYear()) +
    "-" +
    addZero(date2.getMonth() + 1) +
    "-" +
    addZero(date2.getDate());
  return time2;
}

function addZero(num) {
  //补0方法
  if (parseInt(num) < 10) {
    num = "0" + num;
  }
  return num;
}
</script>
<style scoped lang="scss">
.logo {
  width: 11%;
  height: 100%;
  text-align: center;
  line-height: 0.3177rem;
}
.logo-txt {
  font-size: 0.1823rem;
  font-family: "ysbth";
  /* 字体倾斜 */
  font-style: oblique;
  background-image: -webkit-linear-gradient(
    left,
    green,
    yellow,
    pink,
    blue,
    red 25%,
    green 35%,
    blue 50%,
    yellow 60%,
    red 75%,
    pink 85%,
    blue 100%
  );
  /* //颜色填充 透明 */
  -webkit-text-fill-color: transparent;
  /* 背景颜色绘制区域 */
  -webkit-background-clip: text;
  /* 流动 15秒 循环 直线 */
  animation: stream 15s infinite linear;
  background-size: 200% 100%;
}
/* 匀速流动 */
@keyframes stream {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
.top-content {
  width: 89%;
  height: 100%;
}

.dateTime {
  float: right;
  width: 1.1458rem;
  height: 100%;
  display: flex;
  align-items: center;
  // padding-right: .1042rem;
  box-sizing: border-box;
}

.dateWeek {
  text-align: center;
  margin-right: 0.0781rem;
}
.dateWeek > div:nth-of-type(1) {
  margin-bottom: .0313rem;
}

.color {
  font-size: 0.083333rem;
  font-family: "ysbth";
  color: #8c888b;
  /* 字体倾斜 */
  font-style: oblique;
  background: -webkit-linear-gradient(
    45deg,
    #70f7fe,
    #fbd7c6,
    #fdefac,
    #392bf3,
    #bed5f5
  );
  -moz-linear-gradient: (45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
  -ms-linear-gradient: (45deg, #70f7fe, #fbd7c6, #fdefac, #bfb5dd, #bed5f5);
  /*设置字体颜色透明*/
  color: transparent;
  /*背景裁剪为文本形式*/
  -webkit-background-clip: text;
  /*动态10s展示*/
  animation: ran 20s linear infinite;
}
@keyframes ran {
  from {
    backgroud-position: 0 0;
  }
  to {
    background-position: 10.416667rem 0;
  }
}

.func {
  float: right;
  width: .9375rem;
  height: 100%;
  display: flex;
  align-items: center;
}

.fullscreen {
  cursor: pointer;
  margin-right: .1042rem;
}

.color-picker {
  margin-right: .1042rem;
}

.username {
  cursor: pointer;
}

.el-dropdown {
  color: yellow;
}
</style>