
const express =require('express');
const bodyParser = require('body-parser');
const app=express();
const login=require('./app/login')
const send=require('./app/message');
app.use(bodyParser.urlencoded({extended:false}))

app.use(login);
app.use(send);



app.listen(8000)