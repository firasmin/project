const express=require('express')
const router=express.Router()
const bcrypt=require('bcrypt')
const path=require('path')
const model=require('./model')
const root_dir=require('../util/path')
const { Error } = require('sequelize')
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
router.get('/expense',(req,res,next)=>{
    res.sendFile(path.join(root_dir,'index.html'))
})
router.post('/expense',async(req,res,next)=>{
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
        return res.status(400).json({success:false,err:"something is missing"})
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

            res.status(200).json({success:true,message:"login successfull"})
        }
        else{
         res.status(402).json({success:false,error:"password is wrong"})
        }
        })
       
    }
    else{
        
        res.status(404).json({success:false,error:'email is wrong'})
       
    }
}catch(err){
    res.status(500).json({error:err})
}
})
module.exports=router