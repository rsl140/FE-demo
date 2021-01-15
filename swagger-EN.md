
#### plug-in
- `koa2-swagger-ui`
- `swagger-jsdoc`

#### step
1. Installing a plug-in

```
npm install koa2-swagger-ui swagger-jsdoc --save
```

2. use of koa2-swagger-ui in app.js

```
const Koa = require('koa')
const koaSwagger = require('koa2-swagger-ui')

app.use(koaSwagger({
  routePrefix: '/swagger', // host at /swagger instead of default /docs
  swaggerOptions: {
    url: '/swagger.json', // example path to json 其实就是之后swagger-jsdoc生成的文档地址
  },
}))
```

3.Create a util folder in the root directory and create `swagger.js` under the util folder with the following contents

```
const router = require('koa-router')()
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
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options)

// Get the generated annotation file through the route
router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json');
  ctx.body = swaggerSpec;
})

module.exports = router

```

4. back to `app.js` and write

```
const swagger = require('./util/swagger')
app.use(swagger.routes(), swagger.allowedMethods())
```

5.visit `http://localhost:3000/swagger` and now you can see it