const mysql = require('mysql')
const config = require('../config/default')
const createTables = require('../config/createTables.js')

var pool = mysql.createPool({
  host: config.database.HOST,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

let createTable = function(sql) {
  return query(sql, [])
}

// 建表
// createTable(createTables.users)
// createTable(createTables.role)
// createTable(createTables.permission)
// createTable(createTables.userRole)
// createTable(createTables.rolePermission)

// 查询用户是否存在
let findUser = async function(id) {
  let _sql = `
        SELECT * FROM user_info where user_id="${id}" limit 1;
    `
  let result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}
// 查询用户以及用户角色
let findUserAndRole = async function(id) {
  let _sql = `
      SELECT u.*,r.role_name FROM user_info u,user_role ur,role_info r where u.id=(SELECT id FROM user_info where user_id="${id}" limit 1) and ur.user_id=u.id and r.id=ur.user_id limit 1;
    `
  let result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}

// 更新用户登录次数和登录时间
let UpdataUserInfo = async function(value) {
  let _sql =
    'UPDATE user_info SET user_count = ?, user_login_time = ? WHERE id = ?;'
  return query(_sql, value)
}

//  // 读取门店名称
// let getShopName = async function() {
//   let _sql =
//     'SELECT s.id, s.shop_name AS NAME FROM shop_info s;'
//   return query(_sql)
// }
// // 获取所有门店的日报信息
// let getShopAndAccount = async function(value) {
//   let _sql =
//     // 'SELECT a.*,s.shop_name FROM account_info a, shop_info s WHERE s.id = a.shop_id;'
//     'SELECT a.*, s.shop_name, us.user_name AS creat_name,ui.user_name AS change_name FROM account_info a, shop_info s, user_info us, user_info ui WHERE ui.id = a.change_id and s.id = a.shop_id AND a.creat_id = us.id;'
//   return query(_sql, value)
// }

// // 根据门店ID获取日报信息(获取某店铺所有日报)
// let getShopAndAccountWithId = async function(value) {
//   let _sql = ''
//   if (value) {
//     _sql =
//     'SELECT a.*, s.shop_name, us.user_name AS creat_name, ui.user_name AS change_name FROM account_info a, shop_info s, user_info us, user_info ui WHERE s.id = ? AND ui.id = a.change_id AND s.id = a.shop_id AND a.creat_id = us.id;'
//   } else {
//     _sql =
//     'SELECT a.*, s.shop_name, us.user_name AS creat_name,ui.user_name AS change_name FROM account_info a, shop_info s, user_info us, user_info ui WHERE ui.id = a.change_id and s.id = a.shop_id AND a.creat_id = us.id;'
//   }

//   return query(_sql, value)
// }
// // 新增日报
// let addAccount = async function(value) {
//   let _sql =
//     'insert into account_info VALUES ( NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), NULL, ?, ? );'
//   return query(_sql, value)
// }

// // 删除日报
// let delAccount = async function(value) {
//   let _sql = 'DELETE FROM account_info WHERE id = ?;'
//   return query(_sql, value)
// }

module.exports = {
  //暴露方法
  createTable,
  findUser,
  findUserAndRole,
  UpdataUserInfo,
  getShopAndAccount,
  getShopAndAccountWithId,
  getShopName,
  addAccount,
  delAccount
}
