const express = require('express');
var router = express();
router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	pool.query('SELETE * FROM xz_user where uname=? And upwd=?',
		[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:200,msg:'login sucess'});
		}else{
		res.send(result);
		}
	});
	
});
module.exports = router;