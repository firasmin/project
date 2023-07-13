const path = require('path');
const rootDir = require('./util/path');
const booking = require('./model_booking');


exports.add_booking=(req, res, next) => {
    res.sendFile(path.join(rootDir,'booking.html'));
  };
  exports.post_booking=async (req, res)=> {
    try{
    const name=req.body.username;
    const email=req.body.email;
    const phone=req.body.phone;
   const data= await booking.create({
      name: name,
      email: email,
      phone: phone,
    
    })
      res.status(201).json({userdata:data})
  }catch{
    res.status(501).json({error:err})
  }
  }
  exports.getbooking=async(req,res)=>{
    try{
      const data=await booking.findAll()
      res.status(200).json({showdata:data})
    }catch(err){
       error:err;
    }
  }
  exports.deletebooking=async(req,res)=>{
    try{
      if(req.params.id=='undefined')
      {
        res.status(400).json({id:'id is missing'})
      }
      const uid=req.params.id
      
      await booking.destroy({where:{id:uid}})
      res.sendStatus(200)
    }catch(err){
     res.status(500).json(err)
    }
  }