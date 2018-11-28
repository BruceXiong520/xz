//创建web服务器
const express = require('express');
const bodyParser = require('body-parser');

var userRouter = require('./routers/user.js');
var productRouter = require('./routers/product.js');
var shoppingcartRouter = require('./routers/shoppingcart.js')
var server = express();
server.listen(3000,()=>{
	console.log('服务器启动成功');
});
//有服务器才能使用中间件
//连接数据库

server.use(bodyParser.urlencoded({extended:false}));

server.use(express.static('public'));
server.use('/user',userRouter);
server.use('/product',productRouter);
server.use('/cart',shoppingcartRouter);
