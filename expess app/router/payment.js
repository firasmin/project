const express=require('express')
const router=express.Router()
const paymethod=require('../controller/payment')
const authorize=require('../authenticatation')
router.get('/pay',authorize.authenticate,paymethod.premiumpay)
router.post('/traction',authorize.authenticate,paymethod.tractions)

router.post('/failtraction',authorize.authenticate,paymethod.tractionfail)
router.get('/download',authorize.authenticate,paymethod.download)
router.get('/file',authorize.authenticate,paymethod.download_file)

module.exports=router