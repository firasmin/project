const express=require('express')
 const sequelize=require('./util/database')
 const router=require('./expense_router')


const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(router)
sequelize.sync().then(result=>{
   
    app.listen(8000)
} ).catch(err=>console.log(err))