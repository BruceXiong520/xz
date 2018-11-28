const express = require('express');
const bodyParser = require('body-parser');
var pool = require('../pool.js');
var router = express.Router();//注意()

router.get('/list',(req,res)=>{
	//console.log(req.query);
	var $pno = req.query.pno;
	var $pagesize = req.query.pagesize;
	if(!$pno){
		$pno=1;
	}
	if(!$pagesize){
		$pagesize=10;
	}else{
		$pagesize = parseInt($pagesize);
	}
	pool.query('SELECT * FROM xz_laptop ORDER BY lid DESC LIMIT ?,?',
		[($pno-1)*$pagesize,$pagesize],(err,result)=>{
			if(err) throw err;
			res.send(result);
	});
});

router.get('/query',(req,res)=>{
	//console.log(req.query);
	var $lid = req.query.lid;
	if(!$lid){
		res.send({code:402,msg:'lid is required'});
		return;
	}
	pool.query('SELECT * FROM xz_laptop WHERE lid=?',
		[$lid],(err,result)=>{
		if(result.length>0){
			res.send(result[0]);
		}else{
			res.send({code:400,msg:'product is not existed'});
		}
	});
});
router.get('/delete',(req,res)=>{
	var $lid = req.query.lid;
	if(!$lid){
		res.send({code:402,msg:'lid is required'});
		return;
	}
	pool.query('DELETE FROM xz_laptop WHERE lid=?',
		[$lid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:200,msg:'delete success'});
		}else{
			res.send({code:400,msg:'lid is not existed'});
		}
	});
});
router.post('/add',(req,res)=>{	
	var obj = req.body;
	//遍历数组，循环验证是否为空
	for(var proName in obj){
		if(!obj[proName]){
			//res.send({code:401,msg:proName +' '+'is required'});
			res.send({code:401,msg:`${proName } is required`});
			return;
		}
	}
	obj.lid = null;
	
	var $family_id = obj.family_id
	var $title = obj.title;//主标题
	var $subtitle = obj.subtitle//副标题
	var $price = obj.price;//单价
	var $promise = obj.promise;//服务承诺
	var $spec = obj.spec;//规格
	var $lname = obj.lname;//商品名称
	var $os = obj.os;//操作系统
	var $memory =obj.memory;//内存容量
	var $resolution = obj.resolution;//分辨率
	var $video_card = obj.video_card;//显卡型号
	var $cpu = obj.cpu;//处理器
	var $video_memory = obj.video_memory;//显卡容量
	var $category = obj.category;//所属分类
	var $disk = obj.disk;//磁盘类型
	var $details = obj.details;//详情说明
	var $shelf_time = obj.shelf_time;
	var $sold_count = obj.sold_count;
	var $is_onsale = obj.is_onsale;//是否促销
	
//SET ? ?是数组
//前面obj.lid=null,非常重要
	pool.query('INSERT INTO xz_laptop SET ?',[obj],(err,result)=>{
					if(err) throw err;
					if(result.affectedRows>0){
						res.send({code:200,msg:'add  success'});
					}else{
						res.send({code:401,msg:'add fail'});
					}
					
				});
				
/*	方法2			
	pool.query('INSERT INTO xz_laptop VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
				[null,$family_id,$title,
				$subtitle,$price,$promise,$spec,$lname,$os,$memory,
				$resolution,$video_card,$cpu,$video_memory,$category,
				$disk,$details,$shelf_time,$sold_count,$is_onsale],(err,result)=>{
					if(err) throw err;
					if(result.affectedRows>0){
						res.send({code:200,msg:'add  success'});
					}else{
						res.send({code:401,msg:'add fail'});
						}
					});
					*/
				
});
module.exports = router;