/**
 * Created by LiuHanxu on 14-11-12.
 */
var db = require('../util/database')

var BlogModel = require('../data').Blog;
var BlogDao = require('../dao/BlogDao');
var CollectBlogDao = require('../dao/CollectBlogDao');
var CollectBlogModel = require('./../data').CollectBlog;
var CommentToBlogDao = require('../dao/CommentToBlogDao');
var CommentToBlogModel = require('./../data').CommentToBlog;
var BlogLikeModel = require('./../data').BlogLike;
var BlogLikeDao = require('../dao/BlogLikeDao');
var UserDao = require("../dao/UserDao");
var UserModel = require('../data').user;
var querystring = require("querystring"),
    formidable = require('formidable'),
    RecipeDao = require("../dao/RecipeDao"),
    UserDao = require("../dao/UserDao"),
    RecipeModel = require("./../data").Recipe,
    fs = require('fs'),
    url = require('url'),
    config=require("../util/config");


function UserinfoHandler(){

}
UserinfoHandler.register=function(req,res){

    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        var params = querystring.parse(postData);
        console.log(params);//{ username: 'aaa', password: 'aaa', email: '1412@sfd.com' }

        var username = params.username;
        var password = params.password;
        var email = params.email;
        console.log("注册---username:" + username + "-----密码:" + password);

        var user = new UserModel({
            username: username,
            account: username,
            password: password,
            email: email
        });

        UserDao.save(user, function (err, data) {
            if(err&& err.length>0){
                res.json({message:"Register Failed！"});
            }else {
                res.json({message:"Register Successful！"});
            }

        });
    });
};

UserinfoHandler.login=function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        var params = querystring.parse(postData);
        console.log("登陆handler------params:" + params);
        console.log(params);
        UserDao.getUserByAccountAndPass(params['username'], params['password'], function (err, user) {

            if(err&& err.length>0){
                res.json({message:"Login Failed！",user:null});
                //res.writeHead(500, {
                //    "Content-Type": "text/plain;charset=utf-8"
                //});
                //res.end("登录失败！");
            }else if(user==null){
                res.json({message:"Username Or Password error,Please login again！",user:null});
            } else{
                req.session.user_id = user._id;
                req.session.account = user.account;
                req.session.user_name = user.username;
                req.session.password = user.password;
                req.session.head = user.head;
                console.log('登录成功---user_id:'+req.session.user_id);
                res.json({message:"Login Successful！",user:user});

                //res.writeHead(200, {
                //    "Content-Type": "text/plain;charset=utf-8"
                //});
                //res.end("登录成功！");
            }

        });
    });

};

UserinfoHandler.modifypass=function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    console.log("修改密码handler");
    var params = querystring.parse(postData);
    var oldpass = params.passwordold;
    var newpass = params.passwordnew1;

    var oldpassOfUser=req.session.password;
    if(oldpass!=oldpassOfUser){
        res.json({message:"Old Password Error!"});
        return 0;
    }
    var conditions = {_id:req.session.user_id};
    var update={"password":newpass};

    var user =UserDao.update(conditions,update,null,function (err, user)
    {
        if(err)
        {
            console.log(err);
            res.json({message:"Modify password failed！"});

        }else
        {
            req.session.password =newpass ;  //修改session中的值
            res.json({message:"Modify password successful!"});

        }
    });

};
UserinfoHandler.isLogin = function(req,res){
    var user_id = req.session.user_id;
    if(user_id.length>0){
        res.json({message:"1",username:req.session.user_name});
    }else{
        res.json({message:"2"});
    }
};

UserinfoHandler.modifyinfo=function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    var params = querystring.parse(postData);
    console.log("UserHandler---更改个人信息");
    var username = params['username'];
    var email = params['email'];
    console.log("修改个人信息handler");

    var conditions = {_id:req.session.user_id};
    var update={username:username,email:email};

    var user =UserDao.update(conditions,update,null,function (err, user)
    {
        if(err)
        {
            console.log(err);
            res.json({message:"Modify userinfo successful！"});

        }else
        {

            res.json({message:"Modify userinfo failed！"});

        }
    });

};

UserinfoHandler.viewUserinfo=function(req,res){

    var user_account =req.session.account;
    console.log("UserHandler---查看个人信息---user_account："+user_account);

    var user = UserDao.getUserByAccount(user_account,function (err, user)
    {
        if(err)
        {
            console.log(err);
            res.json({message:"Get userinfo successful!",user:null});

        }else
        {

            res.json({message:"Get userinfo failed！",user:user});

        }
    });

};

UserinfoHandler.getUserBlogs=function(req,res){

    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');

    var user_id = req.session.user_id;

    console.log("handler---UserBlogs");
    BlogDao.getUserBlogs(pageNo,pageSize,user_id,function(err,blogs){
        BlogDao.getUserBlogNum(user_id,function(err2,num){
            if(err || err2){
                res.json(500, {message: err.toString()});
                return;

            }
            if (!blogs) {
                res.json(404, {message: "Not found."});
                return;
            }

            console.log("User--Num:"+num)
            res.json({root:blogs,total:num});
        });
    });

};

UserinfoHandler.getUserRecipes=function(req,res){
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var authorId = req.session.user_id;

    console.log('UserHandler-----Recipes----userid:'+authorId);
    RecipeDao.getOwn(pageNo,pageSize,authorId,function (err1, recipe) {
        RecipeDao.getOwnNum(authorId,function(err2,num){
            if(!(err1 || err2)){
                res.json({root:recipe,total:num});
            }
        });
    });

};


UserinfoHandler.logout=function(req,res){
    req.session.user_id = "";
    req.session.account = "";
    req.session.user_name = "";
    req.session.password = "";
    req.session.head = "";

    console.log("UserHandler---注销");
    res.json({message:"Logout successful!"});
}

module.exports = UserinfoHandler;