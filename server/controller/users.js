const mysqlModel = require('../lib/users') //引入数据库方法
const jwt = require('jsonwebtoken')
const config = require('../config/default.js')
const ApiErrorNames = require('../error/ApiErrorNames.js')
const type = require('../util/type.js')
const moment = require('moment')
const util = require('../util/util')
const { v1: uuidv1 } = require('uuid');
const { nanoid } = require('nanoid');
const md5 = require('md5');

/**
 * 普通登录
 */
exports.login = async (ctx, next) => {
  const { body } = ctx.request
  try {
    const user = await mysqlModel.findUser(body.username)
    if (!user) {
      // ctx.status = 401
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_NOT_EXIST)
      return
    }

    const {SALT, PASSWORD} = (await user)
    const pwd = SALT + md5(SALT + body.password)
    // let bodys = await JSON.parse(JSON.stringify(user))
    // 匹配密码是否相等
    if (PASSWORD === pwd) {
      let updateInfo = {
        USER_ID: user.ID,
        TYPE: type.LOGIN,
        VALUE: type.getTypeInfo(type.LOGIN),
        INTRO: type.LOGIN,
        IP: util.getUserIp(ctx.req),
        CREATED_BY: user.NICK_NAME,
        CREATED_TIME: moment().format('YYYY-MM-DD HH:mm:ss'),
        UPDATED_BY: user.NICK_NAME,
        UPDATED_TIME: moment().format('YYYY-MM-DD HH:mm:ss')
    }
      await mysqlModel
      .saveUserInfo(updateInfo)
      .then(() => {
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
 * 通过ID获取用户信息
 */
exports.userInfoById = async (ctx) => {
  try {
    const token = ctx.header.authorization
    let payload
    if (token) {
      payload = await jwt.verify(token.split(' ')[1], config.secret) // 解密，获取payload
      const user = await mysqlModel.findUserInfoById(payload.data)
      if (!user) {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_NOT_EXIST)
      } else {
        ctx.body = ApiErrorNames.getSuccessInfo(user)
      }
    } else {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.INVALID_TOKEN)
    }
  } catch (error) {
    ApiErrorNames.errorCatch(error, ctx)
  }
}

/**
 * 注册
 */
exports.register = async (ctx) => {
  const { body } = ctx.request
  try {
    const user = await mysqlModel.findUser(body.email)
    if (user) {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_HAS_EXISTED)
      return
    }
    const userId = uuidv1()
    const salt = nanoid(6)
    const pwd = salt + md5(salt + body.password)
    let info = [
      {
        ID: userId,
        NICK_NAME: body.nickname,
        SALT: salt,
        SEX: 0,
        PASSWORD: pwd,
        EMAIL: body.email,
        STATUS: '1',
        CREATED_BY: body.nickname,
        CREATED_TIME: moment().format('YYYY-MM-DD HH:mm:ss'),
        UPDATED_BY: body.nickname,
        UPDATED_TIME: moment().format('YYYY-MM-DD HH:mm:ss'),

      },
      {
        USER_ID: userId,
        ROLE_ID: '1003',
        STATUS: '1',
        CREATED_BY: body.nickname,
        CREATED_TIME: moment().format('YYYY-MM-DD HH:mm:ss'),
        UPDATED_BY: body.nickname,
        UPDATED_TIME: moment().format('YYYY-MM-DD HH:mm:ss'),
      }
    ]
    await mysqlModel
      .register(info)
      .then(() => {
        ctx.body = ApiErrorNames.getSuccessInfo()
      })
      .catch(() => {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.UNKNOW_ERROR)
      })
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
