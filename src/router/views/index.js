import menuList from '@/utils/leftMenu'
const modules = import.meta.glob('../../views/pages/*/*/*')  // 动态加载
console.log(modules,'router--modules---->>')
const viewsRouter = [
  {
    path: '/',
    name: "Main",
    component: () => import('@/views/Main.vue'),
    redirect: { name: 'home' },
    children: [
      {
        path: 'home',
        name: 'home',
        meta: { title: '首页' },
        component: () => import('@/views/pages/home.vue')
      }
    ]
  }
]

function handlerMenuData(menus) {
  const list = []
  menus.forEach(menu => {
    if(menu.children && menu.children.length) {
      list.push(...handlerMenuData(menu.children))
    }else {
      list.push(menu)
    }
  })
  return list
}

handlerMenuData(menuList).forEach(item => {
  if(item.path) {
    viewsRouter[0].children.push({
      path: item.path.replace('/', ''),
      name: item.path.slice(item.path.lastIndexOf('/') + 1),
      meta: {
        title: item.name
      },
      component: modules[`../../views/pages${item.path}.vue`]
    })
  }
})


export default viewsRouter