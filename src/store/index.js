import { defineStore } from 'pinia'
import viewsRouter from '../router/views'
export const useIndexStore = defineStore('index', {
  state: () => ({
    // top 背景色
    topBg: '#3296fa',
    // 面包屑
    mainTabs: []
  }),

  getters: {
    
  },

  actions: {
    updatetopBg(val) {
      this.topBg = val
    },
    updatemainTabs(val) {
      if(typeof val === 'string') {
        let obj = JSON.parse(JSON.stringify(viewsRouter[0].children.filter(item => `/${item.path}` == val)[0]))
        obj.path = val
        if(this.mainTabs.every(item => item.path !== val)) {
          this.mainTabs.push(obj)
        }
       }else {
        this.mainTabs.splice(val, 1)
      }
    }
  }
})