const express=require('express')
const router=express.Router()

const path=require('path')
const model=require('./model')
const root_dir=require('../util/path')
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
   await model.create({
        name:name,
        email:email,
        password:password
    })
    res.status(201).json({message:"successs"})
    
}catch(err){
res.status(500).json({error:err})
    }
    

})
router.get('/login',(req,res,next)=>{
    res.sendFile(path.join(root_dir,'login.html'))
})
router.post('/login',async(req,res)=>{
    email=req.body.email
    password=req.body.password
    console.log(email)
    const a=await model.findOne({where:{email:`${email}`}})
    if(a==null)
    {
        res.status(404).json({error:'email is wrong'})
    }
    else{
       if(password==a.password)
       {
        res.status(200).json({message:"login successfull"})
       }
       else{
        res.status(402).json({error:"password is wrong"})
       }
    }
})
module.exports=router