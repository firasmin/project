const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const adminrouter=require('./routes/admin')
const shoproute=require('./routes/shop')
app.use(bodyParser.urlencoded({extended: false}));
app.use('/admin',adminrouter);
app.use(shoproute);
app.use((req,res,next)=>
{
    res.status(404).send("<h1>page not found</h1>")
})
app.listen(3000);
