const express=require('express')
const router=express.Router()
const controllerUser=require('../controller/user')

const authorize=require('../authenticatation')

router.get('/signup',controllerUser.signupfile)
router.post('/signup',controllerUser.signup)
router.get('/login',controllerUser.loginfile)
router.post('/login',controllerUser.login)
router.get('/expense',controllerUser.expensefile)
router.post('/expense',authorize.authenticate,controllerUser.expense)
router.get('/detail',authorize.authenticate,controllerUser.getexpense)
router.delete('/user_delete/:id',authorize.authenticate,controllerUser.deleteExpense)
module.exports=router