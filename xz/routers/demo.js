const express = require("express");
var router = express.Router();
var pool = require("../pool.js");

router.get("/ajaxDemo",(req,res)=>{
	res.send("这是我的第一个ajax程序");
});
module.exports = router;