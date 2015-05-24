/**
 * Created by LiuHanxu on 14-11-12.
 */
var db = require('../util/database')

var RestaurantModel = require('../data').Restaurant;
var UserModel = require('../data').User;

var querystring = require("querystring"),
    UserDao = require("../dao/UserDao"),
    AccessToken = require("../auth/ControllerAccessToken.js");
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

    req.addListener("data",function(){
        var params = querystring.parse(postData);
        console.log("Register...");
        var username = params['username'];
        var email = params['email'];
        var password = params['password'];

        console.log(username);
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
                res.end("Register Successful！");
            }
        });
    });

};

UserinfoHandler.login=function(req,res){

    console.log("登陆handler------");
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end",function(){
        var params = querystring.parse(postData);
        var username = params['username'];
        var password = params['password'];

        UserDao.getUserByAccountAndPass(username, password, function (err, user) {
            if(err&& err.length>0)
            {
                res.json({message:"Login Failed！",user:null});
            }
            else if(user==null)
            {
                res.json({message:"Username Or Password error,Please login again！",user:null});
            }
            else
            {
                AccessToken.createAccessToken(user._id, function(err, token){
                    if (err)
                    {
                        console.log("Error : " + err);
                        return res.status(500).end("Internal error");
                    }
                    console.log("hehe");
                    var data = {
                        "token" : token._id
                    }
                    res.status(200).json(data);
                    console.log(token._id);
                });
            }
        });
    });

};

UserinfoHandler.modifypass=function(req,res){
    console.log("修改密码handler");

    var oldpass = req.param('oldpass');
    var newpass = req.param('newpass');
    var token = req.param('token');
    console.log(token);

    AccessToken.userActionWithToken(token, res, function(user){
        var oldpassOfUser = user.password;
        var conditions = {_id: user._id};
        var update={"password": newpass};

        if(oldpass != oldpassOfUser) {
            res.json({message: "Old Password Error!"});
            return 0;
        }

        UserDao.update(conditions,update,null,function (err, user)
        {
            if(err)
            {
                console.log(err);
                res.json({message:"Modify password failed！"});

            }else
            {
                user.password = newpass ;
                res.end("Modify password successful!");
            }
        });

    }, req.params.id);

};

UserinfoHandler.isLogin = function(req,res){
    var token = req.param('token');
    AccessToken.userActionWithToken(token, res, function(user){
        if(user._id != null)
        {
            res.json({message:"1",username:user.username});
        }
        else
        {
            res.json({message:"2"});
        }

    }, req.params.id);
};

UserinfoHandler.logout=function(req,res){
    console.log("UserHandler---logout");
    var token = req.param('token');

    console.log(token);
    if (!token)
        return res.status(400).end("Not connected")
    AccessToken.removeAccessToken(token, function (err, token) {
        if (err) {
            console.log("Error token : " + err);
            return res.status(500).end("Internal error");
        }
        if (!token)
            return res.status(400).end("Bad token");
        res.status(204).end();
    })

    res.json({message:"Logout successful!"});
}

//**********************************zhaiyuan start********************************

UserinfoHandler.addUser=function(req,res){

    var user = new UserModel({
        username: "cmm",
        account: "cmm",
        password: "cmm",
        type: 0,
        phone: "15201342345",
        sex: 0,
        head:"2.img",
        friends: [{
            _id: "551d6239753c1a9c3d9e6e75",
            account : "zy",
            head: "2.img"
            },
            {
                _id: "552147699f6ffb2a5050760f",
                account : "zyy",
                head: "2.img"
            },
            {
                _id: "55570009443d204e23451b83",
                account : "mc",
                head: "2.img"
            }],


        friends_count: 3
    });

    UserDao.save(user,function(err, newuser) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        console.log(newuser)
        res.json(200, newuser);
        //res.render('index');
    });
};

UserinfoHandler.modifyinfo=function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    var params = querystring.parse(postData);
    console.log("UserHandler---更改个人信息");
    //var username = params['username'];
    //var email = params['email'];
    var username = "zhai"
    console.log("修改个人信息handler");

    //var conditions = {_id:req.session.user_id};
    //var update={username:username,email:email};
    var conditions = {_id:"551d6239753c1a9c3d9e6e75"};
    var update={username:username};

    var user =UserDao.update(conditions,update,null,function (err, user)
    {
        if(err)
        {
            console.log(err);
            res.json({message:"Modify userinfo failed！"});

        }else
        {

            res.json({message:"Modify userinfo successful！"});

        }
    });

};

UserinfoHandler.viewUserinfo=function(req,res){

    //var user_account =req.session.account;
    var user_account ="zy";
    console.log("UserHandler---查看个人信息---user_account："+user_account);

    UserDao.getUserByAccount(user_account,function (err, user){
        if(err)
        {
            console.log(err);
            res.json({message:"Get userinfo failed!",user:null});

        }else
        {

            res.json({message:"Get userinfo successful！",user:user});

        }
    });

};



//**********************************zhaiyuan  end********************************



/*
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
*/


module.exports = UserinfoHandler;