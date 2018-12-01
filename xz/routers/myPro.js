const express = require('express');
var router = express();
var pool = require('../pool.js');
router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	//console.log(req.body);

	pool.query('SELECT * FROM xz_user where uname=? And upwd=?',
		[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		console.log(result);
		if(result.length>0){
			res.send({code:200,msg:'login sucess'});
		}else{
		res.send(result);
		}
	});
	
});
module.exports = router;