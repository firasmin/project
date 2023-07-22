const express=require('express')
const path=require('path')
const root_dir=require('../util/path')

const app=express()
app.use(express.static(path.join(__dirname,'public')))
app.use('/expense',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
app.post('/expense',(req,res,next)=>{
    console.log("anything")
})
app.listen(4000)