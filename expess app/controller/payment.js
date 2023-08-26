const Razorpay=require('razorpay')
const Order=require('../model/order_model')
const userService=require('../services/userservice')
const s3service=require('../services/s3services')
const file=require('../model/file_download')
 
exports.download=async(req,res)=>{
  try{
    if(!req.user.ispremium){
      return res.status(404).json({message:"you are not a premium user",success:false})
    }
  const expenses=await userService.getExpenses(req)
  console.log(expenses)
  const stringfiedexpense=JSON.stringify(expenses)
  let userId=req.user.id
  
  const filename=`expense/${userId}/${new Date()}.txt`
  const fileurl=await s3service.uplodtoS3(stringfiedexpense,filename)
  console.log(fileurl)
  await  req.user.createFile({path:fileurl})
  res.status(200).json({fileurl,success:true})    
  
  
 }catch(err){
  res.status(501).json({success:false,err})
 }}
 exports.download_file=async(req,res)=>{
  try{

  const data=await req.user.getFiles()
  res.status(200).json({downloadfile:data})
}catch(err){
  console.log(err)
  res.status(402).json({error:err})
}
}

exports.premiumpay=async(req,res)=>{
  try{
      var rzp=new Razorpay({
        key_id:'rzp_test_0VdsQiFoT2EiXV',
          key_secret:'ZCt40DUEPeZdpuXTfnR4afYW'
      })
      const amount=2500
      rzp.orders.create({amount,currency:"INR"},(error,order)=>{
          if(error)
          {
              throw new Error(JSON.stringify(error))
          }
        req.user.createOrder({orderid:order.id,status:'pending'}).then(()=>{
         return res.status(201).json({order,key_id:rzp.key_id})
        }).catch(err=>{
          throw new Error(err)
        })
      })
  }
  catch(err){
    console.log(err)
      res.status(403).json({message:"failed"})
  }
}
exports.tractions=async(req,res)=>{
try{
  const {payment_id,order_id}=req.body
 const order=await Order.findOne({where:{orderid:order_id}})
   const promise1= order.update({paymentid:payment_id,status:'successfull'})
    const promise2=  req.user.update({ispremium:true})
    Promise.all([promise1,promise2]).then(()=>{
      return res.status(202).json({success:true,message:"traction successfull"})
    }).catch(error=>{
      throw new Error(error)
    })
        
     
} catch(err){
  console.log('something')
  res.status(406).json({success:false,message:"traction failed"})

}
}
exports.tractionfail=async(req,res)=>{
  try{
    const {payment_id,order_id}=req.body
   const order=await Order.findOne({where:{orderid:order_id}})
     const promise1= order.update({paymentid:payment_id,status:'failed'})
      const promise2=  req.user.update({ispremium:false})
      Promise.all([promise1,promise2]).then(()=>{
        return res.status(202).json({success:true,message:"traction failed"})
      }).catch(error=>{
        throw new Error(error)
      })
          
       
  } catch(err){
    console.log('something')
    res.status(407).json({success:false,message:"traction failed"})
  
  }
  }