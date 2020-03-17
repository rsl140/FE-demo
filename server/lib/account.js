// 样例demo
const {query} = require('./query.js')

 // 读取门店名称
let getShopName = async function() {
  let _sql =
    'SELECT s.id, s.shop_name AS NAME FROM shop_info s;'
  return query(_sql)
}
// 获取所有门店的日报信息
let getShopAndAccount = async function(value) {
  let _sql =
    // 'SELECT a.*,s.shop_name FROM account_info a, shop_info s WHERE s.id = a.shop_id;'
    'SELECT a.*, s.shop_name, us.user_name AS creat_name,ui.user_name AS change_name FROM account_info a, shop_info s, user_info us, user_info ui WHERE ui.id = a.change_id and s.id = a.shop_id AND a.creat_id = us.id;'
  return query(_sql, value)
}

// 根据门店ID获取日报信息(获取某店铺所有日报)
let getShopAndAccountWithId = async function(value) {
  let _sql = ''
  if (value) {
    _sql =
    'SELECT a.*, s.shop_name, us.user_name AS creat_name, ui.user_name AS change_name FROM account_info a, shop_info s, user_info us, user_info ui WHERE s.id = ? AND ui.id = a.change_id AND s.id = a.shop_id AND a.creat_id = us.id;'
  } else {
    _sql =
    'SELECT a.*, s.shop_name, us.user_name AS creat_name,ui.user_name AS change_name FROM account_info a, shop_info s, user_info us, user_info ui WHERE ui.id = a.change_id and s.id = a.shop_id AND a.creat_id = us.id;'
  }

  return query(_sql, value)
}
// 新增日报
let addAccount = async function(value) {
  let _sql =
    'insert into account_info VALUES ( NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), NULL, ?, ? );'
  return query(_sql, value)
}

// 删除日报
let delAccount = async function(value) {
  let _sql = 'DELETE FROM account_info WHERE id = ?;'
  return query(_sql, value)
}

module.exports = {
  //暴露方法
  getShopAndAccount,
  getShopAndAccountWithId,
  getShopName,
  addAccount,
  delAccount
}
