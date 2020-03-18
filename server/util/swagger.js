const router = require('koa-router')() //引入路由函数
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  info: {
    title: 'API',
    version: '1.0.0',
    description: 'API',
  },
  host: 'localhost:3000',
  basePath: '/' // Base path (optional)
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // <-- not in the definition, but in the options
};

const swaggerSpec = swaggerJSDoc(options)

router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
})

module.exports = router
//将页面暴露出去
