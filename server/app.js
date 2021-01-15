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

// error handler
onerror(app)
// 配置Swagger-ui
app.use(koaSwagger({
  routePrefix: '/swagger', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: '/swagger.json', // example path to json
  },
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

// Unprotected middleware
app.use(function(ctx, next) {
  if (ctx.url.match(/^\/public/)) {
    ctx.body = 'unprotected\n'
  } else {
    return next()
  }
})

// Middleware below this line is only reached if JWT token is valid

app.use(
  jwt({ secret: config.secret, passthrough: true }).unless({
    path: [/\/register/, /\/user\/login/]
  })
)

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

// cors
app.use(cors())

// routes
// app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
