const express=require('express');
const app=express()
app.use((req,res,next)=>
{
    console.log("this is middleware")
     next()
})
app.use((req,res,next)=>
{
    console.log("this is  next middleware")
    res.send("<h1>hello from express js</h1>")
})


app.listen(3000);
