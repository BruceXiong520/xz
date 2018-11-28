const express = require('express');
var pool=require('../pool.js');
//创建空路由
var router = express.Router();

//添加路由
//用户注册
router.post('/register',(req,res)=>{
	//console.log(req.body);
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	var $email=obj.email;
	var $phone=obj.phone;
	//验证是否为空
	if(!$uname){
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!$upwd){
		res.send({code:401,msg:'upwd required'});
		return;
	}
	if(!$email){
		res.send({code:401,msg:'email required'});
		return;
	}
	if(!$phone){
		res.send({code:401,msg:'phone required'});
		return;
	}
	else{
		pool.query('INSERT INTO xz_user SET ?',[obj],(err,result)=>{
			if(err) throw err;
			//console.log(result);
			if(result.affectedRows>0){
				res.send({code:200,msg:'success'});
			}
			//console.log(result);
		});
	//res.send('这是用户注册页');
	}
	//res.sendFile(__dirname+'/register.html');
});
//登录页
router.post('/login',(req,res)=>{
	//console.log(req.body);
	var obj = req.body;
	//console.log(obj);
	var $uname = obj.uname;
	var $upwd = obj.upwd;
	if($uname==''){
		res.send({code:401,msg:'uname is requied'});
		return;
	}
	if($upwd==''){
		res.send({code:401,msg:'upwd is requied'});
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
//用户列表页
router.get('/list',(req,res)=>{
	var obj=req.query;
	//用到数值型的时候，一定要记得把用户输入的字符串转化成整型
	var $pno = obj.pno;
	var $pagesize = obj.pagesize;
	if(!$pno){
		$pno=1;
	}else{
		$pno=parseInt($pno);
	}
	if(!$pagesize){
		$pagesize = 10;
	}else{
		$pagesize=parseInt($pagesize);
	}
	pool.query('SELECT * FROM xz_user ORDER BY uid ASC LIMIT ?,?',
			[($pno-1)*$pagesize,$pagesize],(err,result)=>{
				if(err) throw err;
				//console.log(result);
 				res.send(result);
			
	});
});
//检索用户信息
router.get('/query',(req,res)=>{
		//console.log(req.query);
		var $uid = req.query.uid;
		if(!$uid){
			res.send({code:401,msg:'uid is required'});
			return;
		}else{
			$uid = parseInt($uid);
		}
		pool.query('SELECT * FROM xz_user WHERE uid = ?',
			[$uid],(err,result)=>{
				res.send(result[0]);
		});

});
//删除用户
router.post('/delete',(req,res)=>{
	//console.log(req.body);
	var $uid = req.body.uid;
	if(!$uid){
		res.send({code:401,msg:'uid is required'});
		return;
	}else{
		$uid = parseInt($uid);
	}
	pool.query('DELETE FROM xz_user WHERE uid = ?',
		[$uid],(err,result)=>{
			if(result.affectedRows>0){
				res.send({code:200,msg:'delete sucess'});
			}else{
				res.send({code:401,msg:'uid is not exist'});
			}
			
	});
});
//修改用户信息
router.post('/update',(req,res)=>{
	//console.log(req.body);
	var $uid = req.body.uid;
	var $user_name = req.body.user_name;
	var $gender = req.body.gender;
	var $phone = req.body.phone;
	var $email = req.body.email;
	if(!$uid){
		res.send({code:401,msg:'uid id required'});
		return;
	}else{
		$uid = parseInt($uid);
	}
	if(!$user_name){
		res.send({code:401,msg:'user_name is required'});
		return;
	}
	if(!$gender){
		res.send({code:401,msg:'gender is required'});
		return;
	}
	if(!$phone){
		res.send({code:401,msg:'phone is required'});
		return;
	}
	if(!$email){
		res.send({code:401,msg:'emaile is required'});
		return;
	}
	pool.query('UPDATE xz_user SET user_name=?,gender=?,phone=?,email=? WHERE uid = ?',
		[$user_name,$gender,$phone,$email,$uid],(err,result)=>{
			if(err) throw err;
			if(result.affectedRows>0){
				res.send({code:200,msg:'update is sucessed'});
		}else{
			res.send({code:401,msg:'update is fialed'});
		}
	});

});

module.exports=router;