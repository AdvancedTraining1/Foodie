/**
 * Created by zhaiyuan on 3/29/15.
 */

var db = require('../util/database')

var DateModel = require('../data').Date;
var UserModel = require('../data').User;

var DateDao=require("../dao/DateDao");
var UserDao = require("../dao/UserDao");

var querystring = require("querystring"),
    formidable = require('formidable'),
    fs = require('fs'),
    url = require('url'),
    config=require("../util/config");


function DateHandler(){
}

DateHandler.lookDate=function(req,res){

    var pageNo = req.param('pageNo');
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
    })

};

DateHandler.createDate=function(req,res){

    console.log("create one date");
    var userId = 123;
    var restaurantId = 321;
    var logTime =Date.parse(new Date());

    var dateTitle = req.param('dateTitle');
    var dateContent = req.param('dateContent');
    var dateTime = req.param('dateTime');

    if(dateTitle&& dateTitle.length>0){
        var date = new DateModel({
            userId: userId,
            dateTitle: dateTitle,
            dateContent: dateContent,
            dateTime: dateTime,
            logTime: logTime,
            restaurantId:restaurantId
        });

        DateDao.save(date, function (err, data) {
            if(err&& err.length>0){
                res.json({message:"Date create Error"});
            }else {
                res.json({message:"Date create Successful！"});
            }
        });
    }
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
        res.render('updateDate', { _id: 121,account : 121, head: 121})         //need to modify

    })

};

DateHandler.deleteDate=function(req,res){
    var deleteList = [req.params.date_id];
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