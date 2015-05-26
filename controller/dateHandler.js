/**
 * Created by zhaiyuan on 3/29/15.
 */

var db = require('../util/database')

var DateModel = require('../data').Date;
var UserModel = require('../data').User;

var DateDao=require("../dao/DateDao");
var UserDao = require("../dao/UserDao");

var querystring = require("querystring"),
    AccessToken = require("../auth/ControllerAccessToken.js"),
    formidable = require('formidable'),
    fs = require('fs'),
    url = require('url'),
    config=require("../util/config");


function DateHandler(){
}

DateHandler.lookDate=function(req,res){

    var token = req.param('token');

    AccessToken.userActionWithToken(token, res, function (user) {

        var userId=user._id;

        DateDao.findByDateUserId(userId,function(err,date){
            if(err){
                res.json(500,{message:err.toString()});
                return;
            }else{

                res.json(200,{date:date});
            }
        })

    });
};

DateHandler.lookMyDate=function(req,res){

    var token = req.param('token');

    AccessToken.userActionWithToken(token, res, function (user) {

        var userId=user._id;

        DateDao.findByAuthorId(userId,function(err,date){
            if(err){
                res.json(500,{message:err.toString()});
                return;
            }else{

                res.json(200,{date:date});
            }
        })

    });
};


DateHandler.createDate=function(req,res){

    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);

        AccessToken.userActionWithToken(params["token"], res, function (user) {

            var date = new DateModel({
                //userId: user._id,
                author:{
                    _id:user._id,
                    account:user.account,
                    head:user.head
                },
                //dateTitle: dateTitle,
                dateContent: params['content'],
                dateTime: params['time'],
                logTime: new Date().format('yyyy-MM-dd hh:mm:ss')
                //restaurantId:params['content'],

               // dateUsers:params['friends']
            });

            var ids=params['friendids'];
            console.log(ids.split(","));
            var names=params['friendnames'];
            console.log(names);

            DateDao.save(date, function (err, data) {
                if(err&& err.length>0){
                    res.json("publish date error！");
                }else {

                    for(var i=0;i<ids.split(",").length-1;i++){

                        UserDao.getUserById(ids.split(",")[i],function(err,user){
                            var dateUsers={
                                _id: user._id,
                                account : user.account,
                                head: user.head,
                                status: 0
                            };


                            DateDao.updateById(date._id,dateUsers,function(error,date){
                                //res.json("publish date success！");
                            })

                        })

                    }
                    res.end("publish date success");
                }
            });

        });

    });


};


DateHandler.selectFriend=function(req,res){

    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);

        AccessToken.userActionWithToken(params["token"], res, function (user) {
            res.json({root:user.friends});

//          UserDao.getUserById(user._id, function (err, user){
//
//              if(err&& err.length>0){
//                  res.json({message:"No user"});
//              }else {
//                  DateDao.findFriendsById(user, function (err, friends) {
//                      if(err&& err.length>0){
//                          res.json(500,{message:err.toString()});
//                      }else {
//                          console.log("friends2222==="+friends);
//                          res.json({root:friends});
//                      }
//                  });
//
//              }
//          });

        });

    });


};



DateHandler.updateDate=function(req,res){
    var date_id = req.params.date_id;
    DateDao.getOne(date_id,function(err,date){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!date) {
            res.json(404, {message: "Not found."});
            return;
        }
        res.render('updateDate', {_id:date._id,dateTitle: date.dateTitle, dateContent: date.dateContent})

    })

};

DateHandler.joinDate=function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);

        AccessToken.userActionWithToken(params["token"], res, function (user) {

            DateDao.updateStatusById(params["dateId"],user._id,function(err,date){
                if(err)
                {
                    console.log(err);
                    res.json({message:"join failed！"});

                }else
                {
                    res.json({message:"join successful！"});
                }
            })
        });

    });

};

DateHandler.nojoinDate=function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);

        AccessToken.userActionWithToken(params["token"], res, function (user) {

            DateDao.updateStatusNoById(params["dateId"],user._id,function(err,date){
                if(err)
                {
                    console.log(err);
                    res.json({message:"refuse failed！"});

                }else
                {
                    res.json({message:"refuse successful！"});
                }
            })
        });

    });

};

DateHandler.deleteDate=function(req,res){
    //var deleteList = [req.params.date_id];
    var deleteList = ["551d6bd5ea4f724549447891"];
    DateDao.delete(deleteList,function(error,date){
        if (error) {
            console.log(error);
        } else {
            console.log('delete ok!');
            res.json(200, {message: "delete ok!"});
        }
    });


};

module.exports = DateHandler;