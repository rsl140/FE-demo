const {query} = require('./query.js')
// 查询用户是否存在
let findUser = async function(id) {
  let _sql = `
        SELECT * FROM AUTH_USER where email="${id}" limit 1;
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
    SELECT u.*,r.NAME FROM AUTH_USER u,AUTH_USER_ROLE ur,AUTH_ROLE r where u.ID=(SELECT ID FROM AUTH_USER where ID=${id} limit 1) and ur.USER_ID=u.ID and r.ID=ur.ROLE_ID limit 1;
  `
  let result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}

// 记录用户行为
let saveUserInfo = async function(value) {
  let _sql =
  'INSERT INTO AUTH_USER_BEHAVIOR set ?;'
  return query(_sql, value)
}

// 注册
let register = async function(value) {
  let _sql =
  `INSERT INTO AUTH_USER set ?;INSERT INTO AUTH_USER_ROLE set ?;`
  return query(_sql, value)
}

// 通过用户ID查询用户信息
let findUserInfoById = async function(id) {
  let _sql = `
    SELECT ID, NICK_NAME, SEX, AVATAR, EMAIL, PHONE FROM AUTH_USER WHERE ID='${id}' limit 1;
  `
  let result = await query(_sql)

  if (Array.isArray(result) && result.length > 0) {
    result = result[0]
  } else {
    result = null
  }
  return result
}

module.exports = {
  //暴露方法
  findUser,
  findUserAndRole,
  saveUserInfo,
  findUserInfoById,
  register
}
