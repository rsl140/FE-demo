const mysqlModel = require('../lib/mysql') //引入数据库方法
const jwt = require('jsonwebtoken')
const config = require('../config/default.js')
const moment = require('moment')
const ApiErrorNames = require('../error/ApiErrorNames.js')

/**
 * 存入日报
 */
exports.addAccount = async (ctx, next) => {
  try {
    const token = ctx.header.authorization
    let payload
    if (token) {
      payload = await jwt.verify(token.split(' ')[1], config.secret) // 解密，获取payload
      const user = await mysqlModel.findUserAndRole(payload.data)
      if (!user) {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.USER_NOT_EXIST)
      } else {
        const { body } = ctx.request
        let insertData = []
        for (let i in body) {
            insertData.push(body[i]);
        }
        insertData.push(user.id)
        insertData.push(user.id)
        await mysqlModel
          .addAccount(insertData)
          .then(res => {
            let data = {
              id: res.insertId
            }
            ctx.body = ApiErrorNames.getSuccessInfo(data)
          })
          .catch(err => {
            ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.PARAM_IS_INVALID)
          })
      }
    } else {
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.INVALID_TOKEN)
    }
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 删除日报
 */
exports.deleteAccount = async (ctx, next) => {
  const { body } = ctx.request
  try {
    await mysqlModel
      .delAccount(body.id)
      .then(res => {
        ctx.body = ApiErrorNames.getSuccessInfo()
      })
      .catch(err => {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.RESULE_DATA_NONE)
      })
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 获取门店信息
 */
exports.getShopName = async (ctx, next) => {
  try {
    await mysqlModel
      .getShopName()
      .then(res => {
        ctx.body = ApiErrorNames.getSuccessInfo(res)
      })
      .catch(err => {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.RESULE_DATA_NONE)
      })
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 获取所有门店信息
 */
exports.getShopAndAccount = async (ctx, next) => {
  try {
    await mysqlModel
      .getShopAndAccount()
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          res[i].creat_data = moment(res[i].creat_data).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          res[i].change_data = moment(res[i].change_data).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
        ctx.body = ApiErrorNames.getSuccessInfo(res)
      })
      .catch(err => {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.RESULE_DATA_NONE)
      })
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 根据id搜索某一门店信息
 */
exports.getShopAndAccountWithId = async (ctx, next) => {
  try {
    const id = ctx.query.id
    await mysqlModel
      .getShopAndAccountWithId(id)
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          res[i].creat_data = moment(res[i].creat_data).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          res[i].change_data = moment(res[i].change_data).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
        ctx.body = ApiErrorNames.getSuccessInfo(res)
      })
      .catch(err => {
        ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.RESULE_DATA_NONE)
      })
  } catch (error) {
    ctx.throw(500)
  }
}
