import axios from "axios";
import qs from 'qs'

axios.defaults.baseURL = import.meta.env.MODE !== 'production' ? import.meta.env.VITE_APP_BASE_API : import.meta.env.VITE_APP_SERVER_URL

axios.defaults.timeout = 10000

axios.defaults.withCredentials = true

axios.defaults.transformRequest = data => qs.stringify(data)

// 请求拦截
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('_demo_token')
  if (token) config.headers['Authorization'] = token
  return config
})

// 响应拦截
axios.interceptors.response.use(response => {
  return response.data
}, err => {
  if (error.response) {
    if (error.response.status === 401) {
      // 权限
    } else if (error.response.status === 402 || error.response.status === 403) {
      // 服务器拒绝  token过期
    } else if (error.response.status === 404) {
      // 路径错误  跳转到404页面  path -> *
    }
  } else {
    if (!window.navigator.onLine) {
      // 断网处理
      // 跳转到断网页面
    }
    return Promise.reject(error)
  }
})

export default axios