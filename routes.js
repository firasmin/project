const fs = require('fs');

const requesthandler= (req,res)=>
{
    const url = req.url;
    const method = req.method;
    if (url === '/') {
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
    else if (url === '/message' && method === 'POST') {
      const body = [];
      req.on('data', chunk => {
         body.push(chunk);
      });
      return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];
        fs.writeFile('some.txt', message, err => {
          res.statusCode = 302;
          res.setHeader('Location', '/');
          return res.end();
        });
      });
    }
    else{
      res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
    }
}
module.exports=requesthandler;
