const express=require('express')
const path=require('path')
const root_dir= require('./util/path')
const sequelize=require('./util/database')
const sell=require('./product_model')
const { error } = require('console')
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
 
app.get('/sell_product',(req,res)=>{
    res.sendFile(path.join(root_dir,'selling_product.html'))

})
app.post('/sell_product',async(req,res)=>{
    try{
    
    const price=req.body.price
    const product=req.body.product
    console.log(req.body)
  const data =await sell.create({
    price:price,
    product:product
  })
  res.status(201).json({userdata:data})
} catch(err){
    res.status(501).json({err:err})

}
})
app.get('/get_product',async(req,res)=>{
    try{
     const get_data =await sell.findAll()
     
     res.status(200).json({getdata:get_data})
    }catch(err){
        res.status(402).json({err:err})

    }
})

app.delete('/delete/:id',async(req,res)=>{
    try{
        console.log(req.params.id)
        const prodid=req.params.id
      await sell.destroy({where:{id:prodid}})
     
      res.sendStatus(200)
    }catch(err){
        error:err
    }
    }
    )


sequelize.sync().then(result=>{
   
    app.listen(4000)
} ).catch(err=>console.log(err))