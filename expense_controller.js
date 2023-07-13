const path = require('path');
const sequelize=require('./util/database')
const Expense=require('./expense_model')
const rootDir = require('./util/path')
exports.adddetail=(req,res)=>{
    res.sendFile(path.join(rootDir,'crud.html'));
}
exports.post_expense=async(req,res)=>{
    try{
const expense=req.body.expense
const description=req.body.description
const category=req.body.category
 const data=await Expense.create({
    expense:expense,
    description:description,
    category:category,
})
res.status(201).json({userdata:data})
}catch(err){
    res.status(501).json({error:err})

} 
}
exports.get_detail=async(req,res)=>{
    try{

    const data=await Expense.findAll()
    res.status(200).json({userdetail:data})
}catch(err){
    res.status(402).json({error:err})
}
}
exports.delete_detail=async(req,res)=>{
    try{
      const uid = req.params.id
        await Expense.destroy({where:{id:uid}})
        res.sendStatus(200)
    }catch(err){
        error:err
    }
    }