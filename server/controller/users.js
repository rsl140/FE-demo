const mysqlModel = require('../lib/users') //引入数据库方法
const jwt = require('jsonwebtoken')
const config = require('../config/default.js')
const ApiErrorNames = require('../error/ApiErrorNames.js')
const type = require('../util/type.js')
const moment = require('moment')

/**
 * 普通登录
 */
exports.login = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const user = await mysqlModel.findUser(body.username)
    console.log(user);
    if (!user) {
      // ctx.status = 401
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_NOT_EXIST)
      return
    }

    // let bodys = await JSON.parse(JSON.stringify(user))
    // 匹配密码是否相等
    if ((await user.PASSWORD) === body.password) {
      let updateInfo = [
        user.ID,
        type.LOGIN,
        type.getTypeInfo(type.LOGIN),
        type.LOGIN,
        user.NICK_NAME,
        moment().format('YYYY-MM-DD HH:mm:ss'),
        user.NICK_NAME,
        moment().format('YYYY-MM-DD HH:mm:ss')
      ]
      await mysqlModel
      .SaveUserInfo(updateInfo)
      .then(res => {
        let data = {
          user: user.NICK_NAME,
          // 生成 token 返回给客户端
          token: jwt.sign(
            {
              data: user.ID,
              // 设置 token 过期时间
              exp: Math.floor(Date.now() / 1000) + 60 * 60 // 60 seconds * 60 minutes = 1 hour
            },
            config.secret
          )
        }
        ctx.body = ApiErrorNames.getSuccessInfo(data)
      })
      .catch(err => {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.DATA_IS_WRONG)
      })
    } else {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_LOGIN_ERROR)
    }
  } catch (error) {
    ApiErrorNames.errorCatch(error, ctx)
  }
}

/**
 * 获取用户信息
 */
exports.info = async (ctx, next) => {
  const { body } = ctx.request
  // console.log(body)
  try {
    const token = ctx.header.authorization
    let payload
    if (token) {
      payload = await jwt.verify(token.split(' ')[1], config.secret) // 解密，获取payload
      const user = await mysqlModel.findUserAndRole(payload.data)
      if (!user) {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_NOT_EXIST)
      } else {
        let data = {
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          name: user.ID,
            // roles: [user.user_admin === 0 ? 'admin' : '']
          roles: [user.NAME]
        }
        ctx.body = ApiErrorNames.getSuccessInfo(data)
      }
    } else {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.INVALID_TOKEN)
    }
  } catch (error) {
    ApiErrorNames.errorCatch(error, ctx)
  }
}

/**
 * 退出登录
 */
exports.logout = async (ctx, next) => {
  try {
    // ctx.status = 200
    ctx.body = ApiErrorNames.getSuccessInfo()
  } catch (error) {
    ApiErrorNames.errorCatch(error, ctx)
  }
}
