/**
 * 类型
 */
let typeName = {};

typeName.LOGIN = "LOGIN";

const type_map = new Map();
// 登录操作1000-1100
type_map.set(typeName.LOGIN, 1000);

//根据类型名称获取类型信息
typeName.getTypeInfo = (type_name) => {
  let type_info;
  if (type_name) {
      type_info = type_map.get(type_name);
  }
  return type_info;
}
module.exports = typeName;