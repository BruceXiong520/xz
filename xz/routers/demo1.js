const express= require('express');
const pool=require('../pool.js');

var router= express.Router();
router.get('/ajaxdemo1',(req,res)=>{
	var $uname=req.query.uname;
	var $upwd=req.query.upwd;
	
	pool.query("SELECT * FROM xz_user WHERE uname=? AND upwd=?",
		[$uname,$upwd],(err,result)=>{
			if(err) throw err;
			res.send(result);
	});
});

router.get('/login',(req,res)=>{
	//console.log(req.body);
	var obj = req.query;
	//console.log(obj);
	var $uname = obj.uname;
	var $upwd = obj.upwd;
	if($uname==''){
		res.send({code:401,msg:'uname is requied'});
		return;
	}
	if($upwd==''){
		res.send({code:402,msg:'upwd is requied'});
		return;
	}
	pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',
		[$uname,$upwd],(err,result)=>{
			if(err) throw err;
			//if(result[0].uname);
			if(result.length>0){
				res.send({code:200,msg:'success'});
					}else{
				res.send({code:300,msg:'用户名或者密码错误'});
						}
			});
			
});

router.post('/register',(req,res)=>{
	//console.log(req.body);
	var i=400;
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	var $email=obj.email;
	var $phone=obj.phone;
	//验证是否为空
	for(var proName in obj){
		i++;
		if(!obj[proName]){
			res.send({code:i,msg:`${proName } is required`});
			return;
		}
	}

		pool.query('INSERT INTO xz_user SET ?',[obj],(err,result)=>{
			if(err) throw err;
			//console.log(result);
			if(result.affectedRows>0){
				res.send({code:200,msg:'success'});
			}
			//console.log(result);
		});
});

router.get("/checkName",(req,res)=>{
	console.log(req.query);
	
	var $uname=req.query.uname;
	pool.query('SELECT * FROM xz_user WHERE uname=?',[$uname],
		(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				res.send("1");
			}else{
				res.send("0");
			}
			//res.send(result);
	});
	
});
	/*
	pool.query('INSERT INTO xz_user SET ?',[obj],(err,result)=>{
			if(err) throw err;
			//console.log(result);
			if(result.affectedRows>0){
				res.send({code:200,msg:'success'});
			}
			//console.log(result);
		});
		*/
router.get("/userList",(req,res)=>{
	var $start=req.query.start;
	var $count=parseInt(req.query.count);
	console.log(req.query);
	
	pool.query("SELECT * FROM xz_user limit ?,?",[($start-1)*$count,$count],(err,result)=>{
			if(err) throw err;
			res.send(result);
			
	});
	
});
module.exports=router;