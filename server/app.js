const Koa = require('koa')
const koaSwagger = require('koa2-swagger-ui')
const jwt = require('koa-jwt')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const convert = require('koa-convert')


var session = require('koa-session-minimal')
var MysqlStore = require('koa-mysql-session')
var config = require('./config/default.js')
var cors = require('koa2-cors')

const users = require('./routes/users')
// swagger
const swagger = require('./util/swagger')
app.use(swagger.routes(), swagger.allowedMethods())
// 配置Swagger-ui
app.use(koaSwagger({
  routePrefix: '/swagger', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: '/swagger.json', // example path to json
  },
}))

// error handler
onerror(app)
// cors
app.use(cors({
  origin: function(ctx) { //设置允许来自指定域名请求
      // return 'http://localhost:8888'; //只允许http://localhost:8888这个域名的请求
      return '*'
  },
  maxAge: 5, //指定本次预检请求的有效期，单位为秒。
  // credentials: true, //是否允许发送Cookie
  allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'], //设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
}))

// 配置jwt错误返回
app.use(function(ctx, next) {
  return next().catch(err => {
    console.log(err);
    if (401 == err.status) {
      ctx.status = 401
      ctx.body = ApiErrorNames.getErrorInfo(ApiErrorNames.INVALID_TOKEN)
    } else {
      throw err
    }
  })
})

// Middleware below this line is only reached if JWT token is valid

app.use(
  jwt({ secret: config.secret, passthrough: true }).unless({
    path: [/\/register/, /\/user\/login/]
  })
)

// Unprotected middleware
app.use(function(ctx, next) {
  if (ctx.url.match(/^\/public/)) {
    ctx.body = 'unprotected\n'
  } else {
    return next()
  }
})

// middlewares
app.use(convert(bodyparser({
  enableTypes:['json', 'form', 'text']
})))
app.use(convert(json()))
app.use(convert(logger()))
app.use(require('koa-static')(__dirname + '/public'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
