
const express = require('express');

const sequelize=require('./util/database')
const booking=require('./model_booking')
const book = require('./booking_router');
const cors=require('cors')

const app=express()  
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(book)
app.get('/get-booking',async(req,res)=>{
  try{
    const data=await booking.findAll()
    res.status(200).json({showdata:data})
  }catch(err){
error:err;
  }
})
app.delete('/get-delete/:id',async(req,res)=>{
  try{
    if(req.params.id=='undefined')
    {
      res.status(400).json({id:'id is missing'})
    }
    const uid=req.params.id
    
    await booking.destroy({where:{id:uid}})
    res.sendStatus(200)
  }catch(err){
   res.status(500).json(err)
  }
})

sequelize.sync().then(result=>{
   
    app.listen(4000)
} ).catch(err=>console.log(err))