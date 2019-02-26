const mysql = require('mysql')
const config = require('../config/default')

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

users = `create table if not exists user_gutai(
id int PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
user_id varchar(100) not null COMMENT '账号',
user_name varchar(100) not null  COMMENT '用户名',
user_pwd varchar(100) not null  COMMENT '密码',
user_admin int not null  COMMENT '权限(0->admin,1)',
user_creatdata timestamp NOT NULL DEFAULT NOW()  COMMENT '创建日期'
)engine=innodb charset=utf8;`

librarys = `create table if not exists librarys_gutai(
id int PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
library_id varchar(100) not null COMMENT '编号',
library_name varchar(100)  COMMENT '别名',
library_moneyin double  COMMENT '进价',
library_count int COMMENT '件数',
library_money double COMMENT '定价',
library_creatdata timestamp NOT NULL DEFAULT NOW()  COMMENT '创建日期'
)engine=innodb charset=utf8;`

accounts = `create table if not exists accounts_gutai(
id int PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
accounts_id varchar(100) not null COMMENT '编号',
accounts_count int COMMENT '件数',
accounts_getmoney double  COMMENT '出货价',
accounts_paytype int  COMMENT '付款方式',
accounts_commit varchar(100)  COMMENT '备注',
accounts_data timestamp NOT NULL DEFAULT NOW()  COMMENT '日期'
)engine=innodb charset=utf8;`

let createTable = function(sql) {
  return query(sql, [])
}

// 建表
createTable(users)
createTable(librarys)
createTable(accounts)

// 查询用户是否存在
let findUser = async function(id) {
  let _sql = `
        SELECT * FROM user_gutai where user_id="${id}" limit 1
    `
  let result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}

// 新增库存
let addStock = async function(value) {
  let _sql =
    'insert into librarys_gutai set library_id =?, library_name =?, library_moneyin =?, library_count =?, library_money =?, library_creatdata =?;'
  return query(_sql, value)
}

// 删除库存
let delStock = async function(value) {
  let _sql = 'DELETE FROM librarys_gutai WHERE id =?;'
  return query(_sql, value)
}

// 获取库存列表
let getStockList = async function() {
  let _sql = 'SELECT * FROM librarys_gutai;'
  return query(_sql)
}

// 搜索库存
let searchStockList = async function(value) {
  let _sql = 'SELECT * FROM librarys_gutai where library_id LIKE ?;'
  return query(_sql, value)
}

// 新增库存
let addAccount = async function(value) {
  let _sql =
    'insert into accounts_gutai set accounts_id =?, accounts_count =?, accounts_getmoney =?, accounts_paytype =?, accounts_commit =?, accounts_data =?;'
  return query(_sql, value)
}

// 删除库存
let delAccount = async function(value) {
  let _sql = 'DELETE FROM accounts_gutai WHERE id =?;'
  return query(_sql, value)
}

// 获取库存列表
let getAccountList = async function() {
  let _sql = 'SELECT * FROM accounts_gutai;'
  return query(_sql)
}

// 搜索库存
let searchAccountList = async function(value) {
  let _sql = 'SELECT * FROM accounts_gutai where accounts_id LIKE ?;'
  return query(_sql, value)
}

module.exports = {
  //暴露方法
  findUser,
  createTable,
  addStock,
  delStock,
  getStockList,
  searchStockList,
  addAccount,
  delAccount,
  getAccountList,
  searchAccountList
}
