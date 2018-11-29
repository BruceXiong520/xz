const express =require('express');
const querystring = require("querystring");

var router = express.Router();

router.get('/ajaxDemo',(req,res)=>{
	res.send('这是我的第二个ajax程序');
});

router.get('/ajaxlogin',(req,res)=>{
	var $uname = req.query.uname;
	
	
	res.send($uname);
	
	
});

module.exports = router;