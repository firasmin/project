router.get('/expense',(req,res)=>{
    res.sendFile(path.join(root_dir,'expense.html')) 
})
router.post('/expense',authorize.authenticate,async(req,res)=>{
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
 const data= await model.update({totalExpese:totalamount},{where:{id:req.user.id},transaction: t })
  await t.commit()
   res.status(200).json({userdata:datauser,success:true,data})

    }catch(err){
        await t.rollback()
        res.status(500).json({success:false,err})
    }
})

router.get("/leadership",leader.leadership)
router.get('/detail',authorize.authenticate,async(req,res)=>{
    try{

    const data=await req.user.getExpenses()
    res.status(200).json({userdetail:data})
}catch(err){
    res.status(402).json({error:err})
}
})
router.delete('/user_delete/:id',authorize.authenticate,async(req,res)=>{
    const t= await sequelize.transaction()
    try{
      const uid = req.params.id
      if(IsStringInvalid(uid))
    {
        return res.status(400).json({success:false,message:"something is missing"})
    }
        const row=await expense_model.findByPk(uid,{transaction:t})
        if(row==0)
        {
            res.status(405).json({success:false,message:'doesnt belong to user'})
        }
            
        const totalamount=Number(req.user.totalExpese)-Number(row.expense)
        await expense_model.destroy({where:{id:uid,asadId:req.user.id},transaction:t})
          await model.update({totalExpese:totalamount},{where:{id:req.user.id},transaction:t })
        
       await t.commit()
        res.sendStatus(200)
    }catch(err){
        
        await t.rollback()
        res.status(505).json({success:false,message:'somethoing went wrong'})
    }
    })
   
module.exports=router