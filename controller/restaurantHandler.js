/**
 * Created by liuhanxu on 15-3-20.
 */

var db = require('../util/database')

var DishModel = require('../data').Dish;
var RestaurantModel = require('../data').Restaurant;
var UserModel = require('../data').user;

var RestaurantDao=require("../dao/RestaurantDao");

var UserDao = require("../dao/UserDao");

var querystring = require("querystring"),
    formidable = require('formidable'),
    AccessToken = require("../auth/ControllerAccessToken.js"),
    fs = require('fs'),
    url = require('url'),
    config=require("../util/config");


function RestaurantHandler(){
}

RestaurantHandler.addRestaurant=function(req,res){  //http://localhost:3000/service/dish/create?a=a&b=b&c=c
    console.log("RestaurantHandler----addRestaurant()");
    var ownerId ="12345";
    var logTime =Date.parse(new Date());  //毫秒
    var restaurantName = req.param('restaurantName');
    var description = req.param('description');
    var address=req.param('address');
    var cuisine=req.param('cuisine');
    var phone=req.param('phone');
    var photo = req.param('photo');
    var tableNumber = req.param('tableNumber');
    var tableRemain = tableNumber;

    if(restaurantName&& restaurantName.length>0){
        var restaurant = new RestaurantModel({
            restaurantName: restaurantName,
            description: description,
            photo: photo,
            address:address,
            cuisine:cuisine,
            phone:phone,
            logTime: logTime,
            tableNumber:tableNumber,
            tableRemain:tableRemain
        });

        RestaurantDao.save(restaurant, function (err, data) {
            if(err&& err.length>0){
                res.json({message:"restaurant add Error"});
            }else {
                res.json({message:"restaurant add Successful！"});
            }
        });
    }
};

RestaurantHandler.insertRestaurant=function(req,res) {
    console.log("RestaurantHandler----get restaurant by ID");
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end",function(){
        var params = querystring.parse(postData);
        console.log("解析restaurant信息字符串");
        var restaurant = new RestaurantModel({
            restaurantName: params['restaurantName'],
            description: params['description'],
            cuisine: params['cuisine'],
            address: params['address'],
            phone: params['phone'],
            photo: params['photo'],
            logTime: logTime(),
            ownerId: "LHX",
            tableNumber: 30,
            tableRemain: 30
        });

        RestaurantDao.save(restaurant, function (err, data) {
            if(err&& err.length>0){
                res.json({message:"insert Failed！"});
            }else {
                res.end("insert Successful！");
            }
        });
    });

};


RestaurantHandler.getRestaurantByID=function(req,res){  //http://localhost:3000/service/restaurant/getRestByID?a=a&b=b&c=c
    console.log("RestaurantHandler----getRestaurantByID()");
    var restID = req.param('restID');

    RestaurantDao.getRestaurantByID(restID,function (err, restaurant){
        if(err)
        {
            console.log(err);
            res.json({message:"Get userinfo failed!",restaurant:null});
        }else
        {
            res.json({message:"Get userinfo successful！",restaurant:restaurant});
        }
    });
};


RestaurantHandler.getRestaurantListByName=function(req,res){  //http://localhost:3000/service/restaurant/getRestByID?a=a&b=b&c=c
    console.log("RestaurantHandler----getRestaurantByID()");
    var restName = req.param('restname');
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    if (!pageNo)
        return res.status(400).end("pageNo missing.");
    if (!pageSize)
        return res.status(400).end("pageSize missing.");

    RestaurantDao.getRestaurantByName(restName,pageNo,pageSize,function (err1, restaurantlist) {
        RestaurantDao.getNumByName(restName,function(err2,num){
            if(!(err1 || err2)){
                res.json({root:restaurantlist,total:num});
            }
        });
    });
};

RestaurantHandler.testName=function(req,res){  //http://localhost:3000/service/restaurant/getRestByID?a=a&b=b&c=c
    console.log("RestaurantHandler----test restaurant Name");
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener("end",function(){
        var params = querystring.parse(postData);
        var restaurantName=params['restaurantName'];
        RestaurantDao.testRestaurantName(restaurantName,function (err, restaurant) {
         if(err)
         {
             console.log(err);
             res.json({message:"There is not a restaurant in db",restaurant:null});
         }else
         {
             res.json({message:"There is a restaurant in db",restaurant:restaurant});
         }
        });
    });
    // console.log("RestaurantHandler----testName----");
    // var restName = req.param('restaurantName');
   
    

    // RestaurantDao.testRestaurantName(restName,function (err, restaurant) {
    //     if(err)
    //     {
    //         console.log(err);
    //         res.json({message:"Get userinfo failed!",restaurant:null});
    //     }else
    //     {
    //         res.json({message:"Get userinfo successful！",restaurant:restaurant});
    //     }
    // });
};


function logTime(){
    var data =new Date().format('yyyy-MM-dd hh:mm:ss');
    console.log(data);
    return data;
}



module.exports = RestaurantHandler;
