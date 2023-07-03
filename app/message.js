const express=require('express')
const router=express.Router();
const fs=require('fs');

router.get('/',(req,res,next)=>{
    fs.readFile('some.txt',(err,data)=>
    {
        if(err)
        {
            data="no data"
        }
        res.send(
            `${data}<form onsubmit="document.getElementById('username').value=localStorage.getItem('username')" action="/" method="post"><input type="text" id="chat" name="message"><input type="text" id="username" name="username"><button type="submit">send</button></form>`);
        
    })
   
});
router.post('/',(req,res)=>
{
    console.log(req.body.message)
    console.log(req.body.username)
    fs.writeFile('some.txt',`${req.body.message}:${req.body.username}`,{flag:'a'},(err)=>{
err?connsole.log(err):res.redirect('/')
    })

})
module.exports=router;