export default [
  {
    path: '/cannot',
    name: 'cannot',
    meta: { title: '404' },
    component: () => import('@/page/cannot/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: '登录' },
    component: () => import('@/page/login/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: { title: '注册' },
    component: () => import('@/page/register/index.vue')
  }
]