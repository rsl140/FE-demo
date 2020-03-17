// demo??
const router = require('koa-router')()
const accountControl = require('../controller/account') //引入逻辑

router.prefix('/account')
router.post('/', accountControl.addAccount)
router.del('/', accountControl.deleteAccount)
router.get('/', accountControl.getShopAndAccount)
router.get('/search', accountControl.getShopAndAccountWithId)


// router.get('/table/search', accountControl.searchAccountList)
router.get('/shop', accountControl.getShopName)


module.exports = router
