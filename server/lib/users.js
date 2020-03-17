const {query} = require('./query.js')
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

module.exports = {
  //暴露方法
  findUser,
  findUserAndRole,
  UpdataUserInfo
}
