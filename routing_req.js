const http= require('http');
const fs=require('fs');
const server =http.createServer((req,res)=>
{
    const url =req.url
    const method=req.method
   // console.log(req.url,req.method,req.headers)
    if(url==='/')
    {

     fs.readFile("some.txt",{ encoding: 'utf8' },(err, data) => {
            if (err) {
              console.error(err);
             
            }
            
            res.write('<html><head><title>form  </title> </head>')
            res.write(`<body>${data}</body>`)
            res.write('<body><form action="/message" method="POST"><input type="text" name="form_name">')
            res.write('<button type="submit">send</button>')
            res.write('</form></body></html>')
         return res.end()
          })
       
    }
    if(url==='/message' && method==='POST')
    {
        
        const body=[]

    req.on('data',(chunk)=>{
        console.log(chunk)
        body.push(chunk)
        })
        req.on('end',()=>{
            const bodyparse=Buffer.concat(body).toString();
            console.log(bodyparse)
            const message=bodyparse.split('=')[1]
            fs.writeFileSync('some.txt',message)
        })
       
        
      res.statusCode=302
      res.setHeader('Location','/');
      return res.end()
    }
})
server.listen(4000)