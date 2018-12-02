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

//修改用户
router.post('/update',(req,res)=>{
	
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
router.get('/update',(req,res)=>{
	//res.send('qeqwe');
	var obj = req.query;
	//console.log(obj);
	var $uname = obj.uname;
	var $upwd = obj.upwd;
	var $email = obj.email;
	var $phone = obj.phone;
	var $avatar = obj.avatar;
	var $user_name = obj.user_name;
	var $gender = obj.gender;
	var $uid = obj.uid;
	//res.send("qweqeq");
	//console.log(obj);
	
	var sql='UPDATE xz_user SET uname=?,upwd=?,email=?,phone=?,avatar=?,user_name=?,gender=? WHERE uid=?';
	pool.query(sql,[$uname,$upwd,$email,$phone,$avatar,$user_name,$gender,$uid],(err,result)=>{
		if(err) throw err;
		//console.log(result);
		//if(result.affectedRows>0){
			res.send("修改成功");
		//}else{
			//res.send("修改失败");
		//}
	});


});


module.exports = router;