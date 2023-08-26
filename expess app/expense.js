
const express = require('express');
const bodyparse=require('body-parser')
const sequelize=require('../util/database')
const user=require('./model/user')
const payment=require('./router/payment')
const expense=require('./model/expense_model')
const Order=require('./model/order_model')
const Forgotpassword=require('./model/model_reset')
const file_download=require('./model/file_download')

const asad=require('./router/user')
const leader=require('./router/leadership')
const path=require('path')
const resetPasswordRoutes = require('./router/reset')


const app=express()
const dotenv = require('dotenv');

// get config vars
dotenv.config();




app.use(bodyparse.urlencoded({extended:false}))
app.use(bodyparse.json())
app.use(express.static(path.join(__dirname,'public')))
app.use(asad)
app.use(payment)
app.use(leader)
app.use(resetPasswordRoutes)


user.hasMany(expense)
expense.belongsTo(user)

user.hasMany(Order)
Order.belongsTo(user)


user.hasMany(Forgotpassword);
Forgotpassword.belongsTo(user);

user.hasMany(file_download);
file_download.belongsTo(user);

sequelize.sync({force:true}).then(result=>{
   
    app.listen(4000)
} ).catch(err=>console.log(err))