const router = require('koa-router')() //引入路由函数
const userControl = require('../controller/users') //引入逻辑
// const config = require('../config/default.js')
/**
 * @swagger
 * definitions:
 *   user:
 *     properties:
 *       nick_name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: integer
 */
/**
 * @swagger
 * definitions:
 *   login:
 *     properties:
 *       username:
 *         type: string
 *       password:
 *         type: string
 */
/**
 * @swagger
 * definitions:
 *   register:
 *     properties:
 *       email:
 *         type: string
 *       nickname:
 *         type: string
  *       password:
  *         type: string
  *       password2:
  *         type: string
 */
router.get('/', async (ctx, next) => {
  'use strict'
  ctx.redirect('/user/login')
})
// 路由中间间，页面路由到／，就是端口号的时候，（网址），页面指引到／/user/login
/**
 * @swagger
 * /user/info:
 *   get:
 *     tags:
 *       - user
 *     description: Returns all user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of user
 *         schema:
 *           $ref: '#/definitions/user'
 */
router.get('/user/info', userControl.info)
/**
 * @swagger
 * /user/logout:
 *   post:
 *     tags:
 *       - logout
 *     description: Creates a new puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: puppy
 *         description: Puppy object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/user/logout', userControl.logout)
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - login
 *     description: Creates a new login
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: login
 *         description: login object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/login'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/user/login', userControl.login)
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - register
 *     description: Creates a new register
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: register
 *         description: register object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/register'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/user/register', userControl.register)

module.exports = router
//将页面暴露出去
