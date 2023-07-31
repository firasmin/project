const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const path=require('path')
const model=require('./model')
const expense_model=require('./expense_model')
const root_dir=require('../util/path')
const { Error } = require('sequelize')
const paymethod=require('./pay_controller')
const authorize=require('./authenticatation')

function IsStringInvalid(str)
{
    if(str==undefined||str.length===0)
    {
        return true
    }
    else
    {
        return false
    }
}
function generateAccesstoken(id){
  return jwt.sign({userid:id},'securatewq')
}
router.get('/signup',(req,res,next)=>{
    res.sendFile(path.join(root_dir,'index.html'))
})
router.post('/signup',async(req,res,next)=>{
    try{
    const name=req.body.username
    const email=req.body.email
    const password=req.body.password
    if(IsStringInvalid(name)||IsStringInvalid(email)||IsStringInvalid(password))
    {
        return res.status(400).json({err:"something is missing"})
    }
    bcrypt.hash(password,10,async(err,hash)=>{
        console.log(err)
 await model.create({
        name,
        email,
        password:hash
    })
    res.status(201).json({message:"successs"})
    })
  
    
}catch(err){
res.status(500).json({error:err})
    }
    

})
router.get('/login',(req,res,next)=>{
    res.sendFile(path.join(root_dir,'login.html'))
})
router.post('/login',async(req,res)=>{
    try{

    email=req.body.email
    password=req.body.password
    console.log(email)
    const a=await model.findAll({where:{email:`${email}`}})
    if(IsStringInvalid(email)||IsStringInvalid(password))
    {
        return res.status(400).json({success:false,message:"something is missing"})
    }
    if(a.length>0)
    {
        bcrypt.compare(password,a[0].password,(err,result)=>{
          if(err)
          {
            throw new Error('SOMETHING WENT WRONG')
          } 
          if(result==true)
          {

            res.status(200).json({success:true,message:"login successfull",token:generateAccesstoken(a[0].id)})
        }
        else{
         res.status(402).json({success:false,message:"password is wrong"})
        }
        })
       
    }
    else{
        
        res.status(404).json({success:false,message:'email is wrong'})
       
    }
}catch(err){
    res.status(500).json({message:err})
}
})
router.get('/pay',authorize.authenticate,paymethod.premiumpay)
router.post('/traction',authorize.authenticate,paymethod.tractions)

router.post('/failtraction',authorize.authenticate,paymethod.tractionfail)
router.get('/expense',(req,res)=>{
    res.sendFile(path.join(root_dir,'expense.html')) 
})
router.post('/expense',authorize.authenticate,async(req,res)=>{
    try{
  const expense=req.body.expense
  const description=req.body.description
  const category=req.body.category
  if(IsStringInvalid(expense)||IsStringInvalid(description)||IsStringInvalid(category))
    {
        return res.status(400).json({message:"something is missing"})
    }
  const datauser=await req.user.createExpense({

    expense,description,category,
   }
   )
   res.status(201).json({userdata:datauser,success:true,expense})

    }catch(err){
        res.status(500).json({success:false,err})
    }
})
router.get('/detail',authorize.authenticate,async(req,res)=>{
    try{

    const data=await req.user.getExpenses()
    res.status(200).json({userdetail:data})
}catch(err){
    res.status(402).json({error:err})
}
})
router.delete('/user_delete/:id',authorize.authenticate,async(req,res)=>{
    try{
      const uid = req.params.id
      if(IsStringInvalid(uid))
    {
        return res.status(400).json({success:false,message:"something is missing"})
    }
        const row=await expense_model.destroy({where:{id:uid,asadId:req.user.id}})
        if(row==0)
        {
            res.status(405).json({success:false,message:'doesnt belong to user'})
        }
        res.sendStatus(200)
    }catch(err){
        error:err
    }
    })
   
module.exports=router