const express = require("express");
const pool= require("../pool.js");
var router = express.Router();

router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	//console.log(req.body);
	if(!$uname){
		res.send("用户名不能为空");
	}
	if(!$upwd){
		res.send("密码不能为空");
	}
	pool.query("SELECT * FROM xz_user WHERE uname=? AND upwd=?",
		[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length){
			res.send("登录成功");
		}else{
			res.send("请检查用户名和密码");
		}
		
	});
});

router.get("/userList",(req,res)=>{
	var $start=req.query.start;
	var $count=parseInt(req.query.count);
	//console.log(req.query);
	if(!$start){
		$start=1;
	}if(!$count){
		$count=10;
	}
	pool.query("SELECT * FROM xz_user limit ?,?",[($start-1)*$count,$count],(err,result)=>{
			if(err) throw err;
			res.send(result);
			
	});
	
});

router.get("/delete",(req,res)=>{
	var $uid=req.query.uid;
	//console.log($uid);
	pool.query("DELETE FROM xz_user WHERE uid=?",
		[$uid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("删除成功");
		}
		
	});
});
router.get("/query",(req,res)=>{
	var $uid=req.query.uid;
	//console.log($uid);
	pool.query("SELECT * FROM xz_user WHERE uid=?",[$uid],
		(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				res.send(result);
			}else{
				res.send("0");
			}
	});
});

router.post("/update",(req,res)=>{
	var $uid=req.body.uid;
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	var $phone=req.body.phone;
	var $avatar=req.body.avatar;
	var $user_name=req.body.user_name;
	var $gender=req.body.gender;
	//console.log(req.body);
	
	pool.query('UPDATE xz_user SET uname=?,upwd=?,email=?,phone=?,avatar=?,user_name=?,gender=? WHERE uid=?',
		[$uname,$upwd,$email,$phone,$avatar,$user_name,$gender,$uid],
			(err,result)=>{
				if(err) throw err;
				//console.log(result);
				if(result.affectedRows>0){
					res.send("<script>alert('修改成功!');location.href='http://localhost:3000/02_getlist.html';</script>");
				}else{
					res.send("修改失败");
				}
	});
	
});

router.post("/checkName",(req,res)=>{
	var $uname=req.body.uname;
	//console.log($uname);
	if(!$uname){
		res.send("用户名不能为空");
		return;
	}
	pool.query("SELECT * FROM xz_user WHERE uname=?",
		[$uname],(err,result)=>{
			if(err) throw err;
			if(result.length>0){
				res.send("1");//用户名已存在
			}else{
				res.send("0");//用户名可以使用
			}
			
	});
});

router.post("/register",(req,res)=>{
	for(proName in req.body){
		if(!req.body[proName]){
			res.send(proName+"不能为空！");
			return;
		}
	}
	//console.log(req.body);
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	var $phone=req.body.email;
	var $avatar=req.body.email;
	var $user_name=req.body.user_name;
	var $gender=req.body.gender;
	//console.log(req.body);
	pool.query("INSERT INTO xz_user VALUES(?,?,?,?,?,?,?,?)",
		[null,$uname,$upwd,$email,$phone,$avatar,$user_name,$gender],
		(err,result)=>{
			if(err) throw err;
			if(result.affectedRows>0){
				res.send('1');//注册成功

			}else{
				res.send("0");	//注册失败
			}
			
	});
});
module.exports = router;
