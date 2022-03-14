const jwt = require('jsonwebtoken')

const secretKey = 'itheima No ^_^'


exports.loginHandler = (req, res) => {
  const userInfo = req.body  // 用户信息（包含用户名、密码等）
  console.log(req.body,'body-->>')
  // 登录失败的情况
  if(userInfo.username !== 'admin' || userInfo.password !== '123456') {  // 去数据库查询 有没有这个用户 或者 密码是否正确
    return res.send({
      status: 400,
      message: '登录失败!'
    })
  }
  /**
   * 登录成功的情况
   * 调用 jsonwebtoken 中的 sign() 方法生成 jwt 字符串 发送给客户端
   * 参数1： 用户的信息对象 （为了保证安全，不要把密码加密到token字符串中）
   * 参数2： 加密的密钥
   * 参数3： 配置对象，可以配置当前token的有效期
   */
  const tokenStr = jwt.sign({username: userInfo.username}, secretKey, { expiresIn: '10h' })
  let ids = ''
  for(let i = 0; i < 10; i++) {
    ids += Math.floor(Math.random() * 10)
  }
  res.send({
    status: 200,
    message: '登录成功!',
    success: true,
    data: {
      token: tokenStr,
      username: '管理员',
      userid: ids
    }
  })
}