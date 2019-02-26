const mysqlModel = require('../lib/mysql') //引入数据库方法
const config = require('../config/default.js')
const moment = require('moment')

/**
 * 存入库存
 */
exports.addAccount = async (ctx, next) => {
  const { body } = ctx.request
  try {
    let insertData = [
      body.numberId,
      body.count,
      body.money,
      body.payType,
      body.commit,
      moment().format('YYYY-MM-DD HH:mm:ss')
    ]
    await mysqlModel
      .addAccount(insertData)
      .then(res => {
        ctx.code = 200
        ctx.body = {
          code: 200,
          message: '成功',
          data: {
            id: res.insertId
          }
        }
      })
      .catch(err => {
        ctx.code = 400
        ctx.body = {
          code: 400,
          message: '存储失败'
        }
      })
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 删除库存
 */
exports.deleteAccount = async (ctx, next) => {
  const { body } = ctx.request
  try {
    await mysqlModel
      .delAccount(body.id)
      .then(res => {
        ctx.code = 200
        ctx.body = {
          code: 200,
          message: '成功'
        }
      })
      .catch(err => {
        ctx.code = 400
        ctx.body = {
          code: 400,
          message: '失败'
        }
      })
  } catch (error) {
    ctx.throw(500)
  }
}

/**
 * 搜索库存
 */
exports.searchAccountList = async (ctx, next) => {
  try {
    const id = '%' + ctx.query.id + '%'
    await mysqlModel
      .searchAccountList(id)
      .then(res => {
        for (let i = 0; i < res.length; i++) {
          res[i].accounts_data = moment(res[i].accounts_data).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        }
        ctx.code = 200
        ctx.body = {
          code: 200,
          message: '成功',
          data: res
        }
      })
      .catch(err => {
        ctx.code = 400
        ctx.body = {
          code: 400,
          message: '失败'
        }
      })
  } catch (error) {
    ctx.throw(500)
  }
}
