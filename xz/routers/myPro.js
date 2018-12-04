const express = require('express');
var pool = require('../pool.js');
var router = express();
//用户登录
router.post('/login',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	console.log(req.body.upwd);
	pool.query('SELECT * FROM xz_user where uname=? And upwd=?',
		[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:200,msg:'login sucess'});
		}else{
		res.send(result);
		}
	});
	
});

//用户列表
router.post('/list',(req,res)=>{
	//var $uid = req.body.uid;
	var $start = req.body.start;
	var $count = req.body.count;
	if(!$start){
		$start=1;
	}
	if(!$count){
		$count=5;
	}else{
		$count=parseInt($count);
	}
	pool.query('SELECT * FROM xz_user Limit ?,?',[($start-1)*$count,$count],(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});


//删除用户
router.post('/delete',(req,res)=>{
	var $uid=req.body.uid;
	pool.query('DELETE FROM xz_user WHERE uid=? ',
		[$uid],(err,result)=>{
			if(err) throw err;
			if(result.affectedRows>0){
				res.send("删除成功！");
			}else{
				res.send("删除失败");
			}
	});
});


//查询用户
router.get('/query',(req,res)=>{
	var $uid=req.query.uid;
	pool.query('SELECT * FROM xz_user WHERE uid=?',[$uid],
		(err,result)=>{
			if(err) throw err;
			res.send(result);
	});
});

//修改用户
router.post('/update',(req,res)=>{
	//res.send('qeqwe');
	var obj = req.body;
	//console.log(obj);
	var $uname = obj.uname;
	var $upwd = obj.upwd;
	var $email = obj.email;
	var $phone = obj.phone;
	var $avatar = obj.avatar;
	var $user_name = obj.user_name;
	var $gender = obj.gender;
	var $uid = obj.uid;
	console.log($gender);
	//res.send("qweqeq");
	//console.log(obj);
	
	var sql='UPDATE xz_user SET uname=?,upwd=?,email=?,phone=?,avatar=?,user_name=?,gender=? WHERE uid=?';
	pool.query(sql,[$uname,$upwd,$email,$phone,$avatar,$user_name,$gender,$uid],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		//if(result.affectedRows>0){
			res.send("<script>alert('修改成功!');location.href='http://localhost:3000/myPro_list.html';</script>");
		//}else{
			//res.send("修改失败");
		//}
	});


});

//检查是否有该用户
router.post('/checkname',(req,res)=>{
	var $uname = req.body.uname;
	//console.log($uname);
	pool.query('SELECT * FROM xz_user WHERE uname=?',
		[$uname],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("1");//用户名已经存在！
		}else{
			res.send("0");//用户名可以使用
		}
	});
});

//用户注册
router.post('/add',(req,res)=>{
	var $uname=req.body.uname;
	var $upwd=req.body.upwd;
	var $email=req.body.email;
	var $phone=req.body.phone;
	//console.log(req.body);
	
	pool.query('INSERT INTO xz_user(uname,upwd,email,phone) VALUES(?,?,?,?)',
		[$uname,$upwd,$email,$phone],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send("注册成功！");
		}else{
			res.send("注册失败，请重新注册");
		}
		
	});
	
});

module.exports = router;