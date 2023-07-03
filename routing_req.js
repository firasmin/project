const http = require('http');
const route =require('./routes')
console.log(route.some)
const server = http.createServer(route.handeler);

server.listen(3000);
