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

    var user = new UserModel({
        username: req.body.username,
        account: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    UserDao.save(user, function (err, data) {
        if(err&& err.length>0){
            res.json({message:"Register Failed！"});
        }else {
            res.end("Register Successful！");
        }

    });
};

UserinfoHandler.login=function(req,res){

    console.log("登陆handler------");
    var username = req.param('username');
    var password = req.param('password');
    console.log(username);
    console.log(password);

    UserDao.getUserByAccountAndPass(username, password, function (err, user) {
        if(err&& err.length>0)
        {
            res.json({message:"Login Failed！",user:null});
            //res.writeHead(500, {
            //    "Content-Type": "text/plain;charset=utf-8"
            //});
            //res.end("登录失败！");
        }
        else if(user==null)
        {
            res.json({message:"Username Or Password error,Please login again！",user:null});
        }
        else
        {
            console.log("hehe");

//            AccessToken.userActionWithToken(req.params.token, res, function(){
//
//            }, req.params.id);
            AccessToken.createAccessToken(user.__id, function(err, token){
                if (err)
                {
                    console.log("Error : " + err);
                    return res.status(500).end("Internal error");
                }
                var data = {
                    "token" : token._id
                }
                res.status(200).json(data);
            });
        }
    });

};

UserinfoHandler.modifypass=function(req,res){
    console.log("修改密码handler");
    var oldpass = req.body.passwordold;
    var newpass = req.body.password;

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
            res.end("Modify password successful!");

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

//**********************************zhaiyuan start********************************

UserinfoHandler.addUser=function(req,res){

    var user = new UserModel({
        username: "zyy",
        account: "zyy",
        password: "zyy",
        type: 0,
        phone: "15201345555",
        sex: 0,
        head:"2.img"/*,
        friends: [{
            _id: "54578976af75277b630cc379",
            account : "zhaiyuan",
            head: "1.img"
        },
            {
                _id: "5457aa1f0233539703192dc9",
                account : "mengchi",
                head: "2.img"
            }],

        friends_count: 2*/
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

UserinfoHandler.logout=function(req,res){

    console.log("UserHandler---logout");
    if (!req.body.token)
        return res.status(400).end("Not connected")
    AccessToken.removeAccessToken(req.body.token, function (err, token) {
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

module.exports = UserinfoHandler;