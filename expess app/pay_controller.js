const Razorpay=require('razorpay')
const Order=require('./order_model')
const { Promise } = require('bluebird')
 


exports.premiumpay=async(req,res)=>{
  try{
      var rzp=new Razorpay({
        key_id:'rzp_test_g5xhZgDHoBSjE6',
          key_secret:'WUfS5bRcoXToOE8kFmplKeDR'
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