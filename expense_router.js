const express=require('express')
const router=express.Router()

const controller=require('./expense_controller')


router.get('/expense',controller.adddetail)
router.post('/expense',controller.post_expense)
router.get('/detail',controller.get_detail)
router.delete('/user_delete/:id',controller.delete_detail)
module.exports=router