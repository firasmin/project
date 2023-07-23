
const express = require('express');
const bodyparse=require('body-parser')
const sequelize=require('../util/database')
const router=require('./router')
const path=require('path')
const cors=require('cors')

const app=express()

app.use(bodyparse.urlencoded({extended:false}))
app.use(bodyparse.json())
app.use(express.static(path.join(__dirname,'public')))

app.use(router)
sequelize.sync({force:true}).then(result=>{
   
    app.listen(4000)
} ).catch(err=>console.log(err))