const express = require('express');

var routerDemo = require('./routers/demo.js');
var server = express();

server.listen(3000);

//托管静态资源
server.use(express.static("public"));
server.use(express.static("routers"));

server.use('/demo',routerDemo);
