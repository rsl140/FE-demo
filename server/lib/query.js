// 执行SQL语句方法
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

module.exports = {
  //暴露方法
  createTable,
  query
}