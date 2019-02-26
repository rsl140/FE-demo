const mysqlModel = require('../lib/mysql') //引入数据库方法
const jwt = require('jsonwebtoken')
const config = require('../config/default.js')

/**
 * 普通登录
 */
exports.login = async (ctx, next) => {
  const { body } = ctx.request
  try {
    // const user = await mysqlModel.findUser(body.username)
    // if (!user) {
    //   ctx.code = 401
    //   ctx.body = {
    //     message: '用户名错误'
    //   }
    //   return
    // }
    // let bodys = await JSON.parse(JSON.stringify(user))
    // 匹配密码是否相等
    // if ((await user.user_pwd) === body.password) {
    if ('admin' === body.password) {
      ctx.code = 200
      ctx.body = {
        code: 200,
        message: '登录成功',
        data: {
          // user: user.user_id,
          user: 'admin',
          // 生成 token 返回给客户端
          token: jwt.sign(
            {
              // data: user.user_id,
              data: 'admin',
              // 设置 token 过期时间
              exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
            },
            config.secret
          )
        }
      }
    } else {
      ctx.code = 401
      ctx.body = {
        message: '密码错误'
      }
    }
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 获取用户信息
 */
exports.info = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const token = ctx.header.authorization
    let payload
    if (token) {
      payload = await jwt.verify(token.split(' ')[1], config.secret) // 解密，获取payload
      // console.log(payload)
      const user = await mysqlModel.findUser(payload.data)
      if (!user) {
        ctx.code = 401
        ctx.body = {
          code: 400,
          message: '授权失败'
        }
      } else {
        ctx.code = 200
        ctx.body = {
          code: 200,
          message: '成功',
          data: {
            avatar:
              'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            name: user.user_id,
            roles: [user.user_admin === 0 ? 'admin' : '']
          }
        }
      }
    } else {
      ctx.body = {
        message: '授权失败',
        code: 401
      }
    }
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 退出登录
 */
exports.logout = async (ctx, next) => {
  try {
    ctx.code = 200
    ctx.body = {
      code: 200,
      message: '成功',
      data: 'success'
    }
  } catch (error) {
    ctx.throw(500)
  }
}
