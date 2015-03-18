/**
 * Created by liuhanxu on 2014-11-12.
 */

var UserinfoHandler = require('../controller/userinfoHandler');
module.exports = function (app) {

	app.get('/testinterface',function(req,res){
		res.render('testuserinfo');
	});
	app.get('/show',function(req,res){
		res.render('userinfo/showUserinfo');
	});
	app.get('/service/userinfo/gotoRegister',function(req,res){
		res.render('userinfo/register');
	});
	app.get('/service/userinfo/gotoInfo',function(req,res){
		res.render('userinfo/info');
	});
	app.get('/service/userinfo/gotoModifyPass',function(req,res){
		res.render('userinfo/modifypass');
	});
	app.get('/service/userinfo/gotoCenterBlogs',function(req,res){
		res.render('userinfo/center_blog');
	});
	app.get('/service/userinfo/gotoCenterRecipes',function(req,res){
		res.render('userinfo/center_recipe');
	});


	app.post('/service/userinfo/register',UserinfoHandler.register);
	app.post('/service/userinfo/login',UserinfoHandler.login);
	app.post('/service/userinfo/getUserInfo',UserinfoHandler.viewUserinfo);
	app.post('/service/userinfo/modifyPass',UserinfoHandler.modifypass);
	app.post('/service/userinfo/modifyInfo',UserinfoHandler.modifyinfo);
	app.post('/service/userinfo/isLogin',UserinfoHandler.isLogin);

	app.get('/service/userinfo/getUserBlogs',UserinfoHandler.getUserBlogs);
	app.get('/service/userinfo/getUserRecipes',UserinfoHandler.getUserRecipes);
	app.get('/service/userinfo/logout',UserinfoHandler.logout);

	app.post('/showuserinfo',UserinfoHandler.viewUserinfo);

};