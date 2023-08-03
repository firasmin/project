const model=require('./model')
const expense_model=require('./expense_model')
const sequelize = require('../util/database')


exports.leadership=async(req,res)=>{
    try{
        const user= await model.findAll({
            attributes:['id','name',[sequelize.fn('SUM',sequelize.col('expense')),'amount']],
            include:[{
                model:expense_model,
                attributes:[]
            }],
            group : ['asad.id'],
            order:[['amount','DESC']]
        })
   res.status(200).json(user)

}catch(err){
    console.log(err)
    res.status(402).json({error:err})
}
}