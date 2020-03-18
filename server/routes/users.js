const router = require('koa-router')() //引入路由函数
const userControl = require('../controller/users') //引入逻辑
// const config = require('../config/default.js')
/**
 * @swagger
 * definitions:
 *   user:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
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
 * /api/logout:
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
 * /api/login:
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
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/user/login', userControl.login)

module.exports = router
//将页面暴露出去
