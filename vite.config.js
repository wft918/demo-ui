import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

//  element-plus 按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
    // 别名
    resolve: {
      alias: {
        //设置别名
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets')
      }
    },
    // 通过代理方式解决跨域问题
    server: {
      port: '3000',
      host: '0.0.0.0',//指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 将监听所有地址，包括局域网和公网地址。如果不设置，运行会有Network: use `--host` to expose
      open: false, //自动打开 
      // base: "./ ", //生产环境路径
      proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        // 正则表达式写法
        '/api': {
          target: env.VITE_APP_SERVER_URL, // 后端服务实际地址
          changeOrigin: true, //开启代理
          rewrite: (path) => path.replace(/^\/api/, '')
          // rewrite: () => ''
        }
      }
    }
  })
}
