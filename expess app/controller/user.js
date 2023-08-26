const root_dir=require('../../util/path')
const path=require('path')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const model=require('../model/user')
const sequelize=require('../../util/database')
const expense_model=require('../model/expense_model')

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
function generateAccesstoken(id,ispremium){
    return jwt.sign({userid:id,ispremium},'securatewq')
  }
exports.signupfile=(req,res,next)=>{
    res.sendFile(path.join(root_dir,'views','index.html'))               
}
exports.signup=async(req,res,next)=>{
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
    

}
exports.loginfile=(req,res,next)=>{
    res.sendFile(path.join(root_dir,'views','login.html'))
}
exports.login=async(req,res)=>{
    try{

    email=req.body.email
    password=req.body.password
    
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
            console.log(a)
            

            res.status(200).json({success:true,message:"login successfull",token:generateAccesstoken(a[0].id,a[0].ispremium)})
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
}
exports.expensefile=(req,res)=>{
    res.sendFile(path.join(root_dir,'views','expense.html')) 
}
exports.expense=async(req,res)=>{
    const t = await sequelize.transaction();
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
   },{ transaction: t }
   )
   const totalamount=Number(req.user.totalExpese)+Number(datauser.expense)
 const data= await model.update({totalExpese:totalamount||0},{where:{id:req.user.id},transaction: t })
  await t.commit()
   res.status(200).json({userdata:datauser,success:true,data})

    }catch(err){
        await t.rollback()
        res.status(500).json({success:false,err})
    }
}
exports.getexpense=async(req,res)=>{
    try{

    const data=await req.user.getExpenses()
    res.status(200).json({userdetail:data})
}catch(err){
    res.status(402).json({error:err})
}
}
exports.deleteExpense=async(req,res)=>{
    const t = await sequelize.transaction();
    try{
      const uid = req.params.id
      if(IsStringInvalid(uid))
    {
        return res.status(400).json({success:false,message:"something is missing"})
    }
        const row=await expense_model.findByPk(uid,{transaction: t })
        if(row==0)
        {
            res.status(405).json({success:false,message:'doesnt belong to user'})
        }
            
        const totalamount=Number(req.user.totalExpese)-Number(row.expense)
        await expense_model.destroy({where:{id:uid,asadId:req.user.id},transaction: t })
          await model.update({totalExpese:totalamount},{where:{id:req.user.id},transaction: t  })
        
       await t.commit()
        res.sendStatus(200)
    }catch(err){
        
        await t.rollback()
        res.status(505).json({success:false,message:'somethoing went wrong'})
    }
    }
