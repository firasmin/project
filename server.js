const http= require('http');
const server =http.createServer((req,res)=>
{
    console.log(req.url,req.method,req.headers)
    if(req.url=='/connect')
    {
    res.setHeader('Content-Type','text/html')
    res.write('<html><head><title>my first page </title><body><h1> this is node js </h1></body> </head></html>')
    res.end()
    }
    else if(req.url=='/home')
    {
    res.setHeader('Content-Type','text/html')
    res.write('<html><head><title>my first page </title><body><h1> welcome home </h1></body> </head></html>')
    res.end()
    }
    else if(req.url=='/about')
    {
    res.setHeader('Content-Type','text/html')
    res.write('<html><head><title>my first page </title><body><h1> welcome to abou us</h1></body> </head></html>')
    res.end()
    }
    else{
     res.setHeader('Content-Type','text/html')
    res.write('<html><head><title>my first page </title><body><h1> nothing</h1></body> </head></html>')
    res.end()   
    }
})
server.listen(4000)