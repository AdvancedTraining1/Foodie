/**
 * this is edited by huhao
 * 2014.10,28
 * use for admin to choose right page
 */
var express = require('express');
var router = express.Router();
var adminHandler = require('../controller/adminHandler');
var topicHandler = require('../controller/topicHandler');
var commentHandler = require('../controller/commentHandler');
var seasonHandler = require('../controller/seasonHandler');

/* GET admin page. */
router.get('/', function(req, res) {
  res.render('admin/admin');
});

router.get('/addUser', function(req, res) {
  res.render('admin/adduser');
});

router.get('/getUser', function(req, res) {
  res.render('admin/getuser');
});

router.get('/updateUser', function(req, res) {
	res.render('admin/updateuser');
});

router.get('/updateUser_an/:_account', function(req, res) {
	res.render("admin/adminIndex");
});

router.get('/addUser_an', function(req, res) {
	res.render("admin/adminIndex");
});

router.get('/getUser_an', function(req, res) {
	res.render("admin/adminIndex");
});

router.get('/addSeason', function(req, res) {
	res.render("admin/addseason");
});

router.get('/addSeason_an', function(req, res) {
	res.render("admin/adminIndex");
});

router.get('/getSeason_an', function(req, res) {
	res.render("admin/adminIndex");
});

router.get('/getSeason', function(req, res) {
	res.render("admin/getseason");
});
/*
user
* */
router.post('/add',adminHandler.addUser);
//router.get('/getAllUsers',adminHandler.getAllUsers);
router.post('/delete',adminHandler.deleteUser);
router.get('/getUsers',adminHandler.getUsers1);

router.get('/getUserByAccount',adminHandler.getUserByAccount);
//router.post('/getUsers',adminHandler.getUsers);
router.post('/updateUser',adminHandler.updateUser);

/*
对评论的操作
* */
router.post('/comment/delete',commentHandler.delete);

/*
对topic的操作
* */
//router.post('/addTopic',topicHandler.add);
router.post('/getAllTopic',topicHandler.getAll);
router.post('/searchTopic',topicHandler.searchTopic);

/*
对时另食物的操作
* */
router.post('/addSeason',seasonHandler.add);
router.post('/getAllSeason',seasonHandler.getAll);
router.get('/searchSeason',seasonHandler.searchSeasonFood);
router.post('/season/upload', seasonHandler.upload);
//传统的方法链接数据库
//var mongo = require('mongodb');
//var port = mongo.Connection.DEFAULT_PORT;
//var server = new mongo.Server('localhost',27017,{auto_reconnect:true});
//var db = new mongo.Db('admin-example',server,{safe:true});

//db.open(function(err,db)
//{
//	//db.close();
//	if(!err)
//    {
//		console.log('connect');
//		db.close();
//    }else
//    {
//        console.log('no connect');
//        //db.close();
//    }
//});
//db.close();
//db.on('close',function(err,db)
//{
//	if(err)
//	{
//		throw err;
//	}
//	else
//	{
//		console.log('关闭数据库成功');
//	}
//});


module.exports = router;
