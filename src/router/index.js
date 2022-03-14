import { createRouter, createWebHashHistory } from "vue-router"
import pageRouter from './page'
import viewsRouter from './views'
import { clearLoginInfo } from '@/utils' 


const router = createRouter({
  history: createWebHashHistory(),
  routes: [...pageRouter, ...viewsRouter]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('_demo_token')
  if(token) {
    if(to.path == '/login') {
      clearLoginInfo()
    }
    next()
  }else {
    if(to.path !== '/login') {
      next({ path: '/login' })
    }else {
      next()
    }
  }
})

export default router