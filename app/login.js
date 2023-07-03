const express=require('express');
const router=express.Router();
router.get('/login',(req,res,next)=>
{
    res.send(
        '<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/" method="POST"><input type="text" id="username"><button type="submit">login</button></form>');
});
module.exports=router