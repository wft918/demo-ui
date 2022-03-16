<template>
  <div class="login">
    <div class="form-container">
      <!-- <el-card class="box-card"> -->
        <div class="title">爱丽丝谋杀</div>
        <el-form :label-position="'right'" :model="inputForm" ref="inputFormRef">
          <el-row>
            <el-col :span="24">
              <el-form-item prop="username" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
                <el-input v-model="inputForm.username" placeholder="请输入用户名">
                  <template #prepend>
                    <el-icon><User /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
                <el-input type="password" v-model="inputForm.password" placeholder="请输入密码">
                  <template #prepend>
                    <el-icon><Lock /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="code" :rules="[{ validator: validateCode, trigger: 'blur' }]">
                <el-input v-model="inputForm.code" placeholder="请输入验证码">
                  <template #prepend>
                    <el-icon><More /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div style="width: 100%;height: 100%;" @click="changeCode">
                <Sidentify :identifyCode="identifyCode" :contentWidth="100" />
              </div>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button :loading="loading" style="width: 100%" type="success" @click="doSubmit">登录</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      <!-- </el-card> -->
    </div>
  </div>
</template>
<script setup>
import "@/utils/flexible";
import { User, Lock, More } from "@element-plus/icons-vue";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import Sidentify from '@/components/sidentify/sidentify.vue'
import { login } from '@/api/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const inputFormRef = ref(null)

let inputForm = reactive({
  username: "",
  password: "",
  code: "",
});
let loading = ref(false)

let identifyCode = ref('m6a8')
let identifyCodes = ref('123456789abcdefghjkmnpqrstuvwxyz')

onMounted(() => {
  inputForm.username = ''
  inputForm.password = ''
  inputForm.code = ''
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
  document.addEventListener('keydown', addEventOnkeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', addEventOnkeyDown)
})

//  监听回车
const addEventOnkeyDown = (event) => {
  event = event || window.event
  if(event.keyCode === 13) doSubmit()
}

// 点击验证码触发
const changeCode = () => {
  identifyCode.value = ''
  makeCode(identifyCodes.value, 4)
}
// 随机生成验证码字符串
const makeCode = (data, len) => {
  for (let i = 0; i < len; i++) {
    identifyCode.value += data[randomNum(0, data.length - 1)]
  }
}
// 生成一个随机整数  randomNum(0, 10) 0 到 10 的随机整数， 包含 0 和 10
const randomNum = (min, max) => {
  max = max + 1
  return Math.floor(Math.random() * (max - min) + min)
}

// 验证码校验
const validateCode  = (rule, value, callback) => {
  if (identifyCode.value !== value) {
    inputForm.code = ''  //校验不通过将
    changeCode()
    callback(new Error('请输入正确的验证码'))
  } else {
    callback()
  }
}


//  登录
const doSubmit = () => {
  inputFormRef.value.validate(valid => {
    if(valid) {
      loading.value = true
      login(inputForm).then(data => {
        console.log(data,'登录信息-->>')
        if(data && data.success) {
          localStorage.setItem('_demo_token', data.data.token)
          localStorage.setItem('_user_name', data.data.username)
          setTimeout(() => {
            router.replace('/index')
            loading.value = false
          },200)
        }
      }).catch((err) => {
        loading.value = false
      })
    }
  })
}

</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/img/login/login.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
}

.form-container {
  width: 2.0833rem;
  height: 1.4896rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* display: flex;
  align-items: center; */
  /* background-color: #f5f7fa; */
}

.title {
  width: 100%;
  text-align: center;
  font-size: .1042rem;
  color: #5b77c2;
  font-weight: 600;
  margin-bottom: .1042rem;
}

:deep(.el-input-group__prepend) {
  background: transparent!important;
}
:deep(.el-input__inner) {
  background: transparent!important;
  color: yellow;
}
.el-icon {
  color: blue;
}
</style>