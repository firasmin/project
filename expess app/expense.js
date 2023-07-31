
const express = require('express');
const bodyparse=require('body-parser')
const sequelize=require('../util/database')
const user=require('./model')
const expense=require('./expense_model')
const Order=require('./order_model')
const router=require('./router')
const path=require('path')
const cors=require('cors')

const app=express()

app.use(bodyparse.urlencoded({extended:false}))
app.use(bodyparse.json())
app.use(express.static(path.join(__dirname,'public')))
user.hasMany(expense)
expense.belongsTo(user)
user.hasMany(Order)
Order.belongsTo(user)
app.use(router)
sequelize.sync().then(result=>{
   
    app.listen(4000)
} ).catch(err=>console.log(err))