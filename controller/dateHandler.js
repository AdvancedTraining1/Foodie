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

    /*var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    console.log("look date");
    DateDao.getAll(pageNo,pageSize,function(err,date){
        DateDao.getAllNum(function(err2,num){
            if(err || err2){
                res.json(500, {message: err.toString()});
                return;

            }
            if (!date) {
                res.json(404, {message: "Not found."});
                return;
            }

            console.log("num"+num)
            res.json({root:date,total:num});
        });
    })*/

    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);

        AccessToken.userActionWithToken(params["token"], res, function (user) {
            if (!req.body.content)
                return res.status(400).end("content missing.");

            var userId=user._id;

            DateDao.getAll(function(err,date){
                if(err){
                    res.json(500,{message:err.toString()});
                    return;
                }else{
                    res.json(200,{date:date});
                }
            })

        });

        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("数据提交完毕");
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
            if (!req.body.content)
                return res.status(400).end("content missing.");

            var date = new DateModel({
                userId: user._id,
                //dateTitle: dateTitle,
                //dateContent: dateContent,
                dateTime: params['time'],
                logTime: Date.parse(new Date()),
                restaurantId:params['content'],

                dateUsers:params['friends']//?????????? id1 id2 id3 account head
            });

            DateDao.save(date, function (err, data) {
                if(err&& err.length>0){
                    res.json({message:"Date create Error"});
                }else {
                    res.json({message:"Date create Successful！"});
                }
            });

        });

        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("数据提交完毕");
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
    //var date_id = req.params.date_id;
    var date_id = "551d6f4811a4d97e4d3bfe6a";

    var dateUsers = {};
    dateUsers._id=123;
    dateUsers.account=123;
    dateUsers.head="2.img";

    DateDao.getOne(date_id,function(err,date){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }else{
        /*var conditions = {_id: date_id};
        var dateUsers_count = date.dateUsers_count + 1;

        var update={$push: {dateUsers:dateUsers},$set: {dateUsers_count:dateUsers_count}};
*/

        DateDao.updateById(date_id,dateUsers,function(err,date){

            if(err)
            {
                console.log(err);
                res.json({message:"join failed！"});

            }else
            {
                res.json({message:"join successful！"});
            }
        })
        }
    })

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