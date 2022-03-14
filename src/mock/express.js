const express = require('express')
const cors = require('cors')
const expressJWT = require('express-jwt')

const app = express()

const router = require('./router/user.js')

const secretKey = 'itheima No ^_^'

app.use(expressJWT({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: ['/login'] }))

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use((req, res, next) => {
  console.log('触发了全局中间件-->>')
  next()
})

app.use(router)

app.use((err, req, res, next) => {
  console.log('触发了全局错误中间件')
  if(err.name == 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token'
    })
  }
  // 其他错误
  res.send({
    status: 500,
    message: err.message || '未知错误'
  })
})

app.listen(8888, () => {
  console.log('Server running at http://127.0.0.1:8888')
})