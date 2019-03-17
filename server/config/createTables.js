// 数据库表格创建
const createTable = {
  users: `CREATE TABLE IF NOT EXISTS user_info (
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
      user_id VARCHAR ( 100 ) NOT NULL COMMENT '账号',
      user_name VARCHAR ( 100 ) NOT NULL COMMENT '用户名',
      user_pwd VARCHAR ( 100 ) NOT NULL COMMENT '密码',
      user_head VARCHAR ( 225 ) COMMENT '头像',
      user_mobile VARCHAR ( 20 ) COMMENT '手机',
      user_email VARCHAR ( 64 ) COMMENT '邮箱',
      user_creatdata TIMESTAMP NOT NULL DEFAULT NOW( ) COMMENT '注册日期',
      user_login_time TIMESTAMP DEFAULT NOW( ) COMMENT '登录时间',
      user_count INT COMMENT '登录次数'
    ) ENGINE = INNODB charset = utf8;`,
    role: `CREATE TABLE IF NOT EXISTS role_info (
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
      role_name VARCHAR ( 20 ) NOT NULL COMMENT '角色名',
      role_description VARCHAR ( 255 ) DEFAULT NULL COMMENT '描述'
    ) ENGINE = INNODB charset = utf8;`,
    permission: `CREATE TABLE IF NOT EXISTS permission_info (
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
      permission_name VARCHAR ( 20 ) NOT NULL COMMENT '权限名',
      permission_description VARCHAR ( 255 ) DEFAULT NULL COMMENT '描述'
    ) ENGINE = INNODB charset = utf8;`,
    userRole: `CREATE TABLE IF NOT EXISTS user_role (
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
      user_id INT NOT NULL COMMENT '关联用户',
      role_id INT NOT NULL COMMENT '关联角色',
      KEY fk_user_role_role_info_1 ( role_id ),
      KEY fk_user_role_user_info_1 ( user_id ),
      CONSTRAINT fk_user_role_role_info_1 FOREIGN KEY ( role_id ) REFERENCES role_info ( id ) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_user_role_user_info_1 FOREIGN KEY ( user_id ) REFERENCES user_info ( id ) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = INNODB charset = utf8;`,
    rolePermission: `CREATE TABLE IF NOT EXISTS role_permission (
      id INT PRIMARY KEY NOT NULL AUTO_INCREMENT COMMENT '(自增长)',
      role_id INT NOT NULL COMMENT '关联角色',
      permission_id INT NOT NULL COMMENT '关联权限',
      KEY fk_role_permission_role_info_1 ( role_id ),
      KEY fk_role_permission_permission_info_1 ( permission_id ),
      CONSTRAINT fk_role_permission_role_info_1 FOREIGN KEY ( role_id ) REFERENCES role_info ( id ) ON DELETE CASCADE ON UPDATE CASCADE,
      CONSTRAINT fk_role_permission_permission_info_1 FOREIGN KEY ( permission_id ) REFERENCES permission_info ( id ) ON DELETE CASCADE ON UPDATE CASCADE
    ) ENGINE = INNODB charset = utf8;`
}

module.exports = createTable
// module.exports = secret
