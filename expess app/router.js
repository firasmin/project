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
module.exports=router