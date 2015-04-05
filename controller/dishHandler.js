/**
 * Created by liuhanxu on 15-3-20.
 */

var db = require('../util/database')

var DishModel = require('../data').Dish;
var RestaurantModel = require('../data').Restaurant;
var UserModel = require('../data').user;

var DishDao=require("../dao/DishDao");

var UserDao = require("../dao/UserDao");

var querystring = require("querystring"),
    formidable = require('formidable'),
    fs = require('fs'),
    url = require('url'),
    config=require("../util/config");


function DishHandler(){
}

DishHandler.addDish=function(req,res){

    console.log("DishHandler----addDish()");
    var restaurantId = 111;
    var logTime =Date.parse(new Date());  //毫秒
    console.log("time---"+logTime);

    var m_dishName = req.body.dishName;
    var photo = "/head/1.jpg";
    console.log(m_dishName);
    if(m_dishName && m_dishName.length>0){
        console.log("111");
        var dish = new DishModel({
            dishName: m_dishName,
            description: req.body.description,
            photo: photo,
            logTime: logTime,
            restaurantId:restaurantId
        });

        DishDao.save(dish, function (err, data) {
            if(!err){
                res.writeHead(200, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("Dish add Successful！");
            }
        });
    }
};

DishHandler.getAllDishs=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("DishHandler----getAllDishs");
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    console.log("pageNo---"+pageNo);
    console.log("pageSize---"+pageSize);

    DishDao.getAllDish(pageNo,pageSize,function (err1, dishs) {
        DishDao.getAllNum(function(err2,num){
            if(!(err1 || err2)){
                res.json({root:dishs,total:num});
            }
        });
    });
};

DishHandler.getDishesNum=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("DishHandler----getDishesNUm");

    DishDao.getAllNum(function(err2,num){
        if(!(err2)){
            res.json({total:num});
        }
    });
};

DishHandler.getByRestaurantId=function(req,res){
    console.log("DishHandler----getByRestaurantId");
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var restaurantId = req.param('restaurantId');
    console.log("pageNo---"+pageNo);
    console.log("pageSize---"+pageSize);
    console.log("restaurantId---"+restaurantId);

    DishDao.getByRestaurantId(pageNo,pageSize,restaurantId,function (err1, dishs) {
        DishDao.getRestaurantDishesNum(restaurantId,function(err2,num){
            if(!(err2 || err1)){
                res.json({root:dishs,total:num});
            }
        });

    });
}

DishHandler.getRestaurantDishesNum=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("DishHandler----getRestaurantDishesNum");
    var restaurantId = req.param('restaurantId');
    console.log("restaurantId---"+restaurantId);

    DishDao.getRestaurantDishesNum(restaurantId,function(err2,num){
        if(!(err2)){
            res.json({total:num});
        }
    });
};

DishHandler.deleteDishById=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("DishHandler----deleteDishById");
    var DishId = req.param('DishId');
    console.log("DishId---"+DishId);
    //var idStr = req.params.ids.split(",");
    var conditions ={_id : DishId};
    DishDao.delete(conditions,function (err, recipe) {
        if(!(err)){
            res.end("delete dish success！");
        }

    });

};

DishHandler.deleteDishByName=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("DishHandler----deleteDishBydishName");
    var dishName = req.param('dishName');
    console.log("dishName---"+dishName);
    //var idStr = req.params.ids.split(",");
    var conditions ={dishName : dishName};
    DishDao.delete(conditions,function (err, recipe) {
        if(!(err)){
            res.end("delete dish success！");
        }

    });

};

DishHandler.updatePraiseNum=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("DishHandler----updatePraiseNum");
    var id = req.param('id');
    console.log("Id---"+id);
    //var idStr = req.params.ids.split(",");
    //var conditions ={dishName : dishName};
    DishDao.updatePraiseNum(id,function (err, recipe) {
        if(!(err)){
            res.end("update dish praise num！");
        }

    });

};

DishHandler.updateLoverNum=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("DishHandler----updateLoverNum");
    var id = req.param('id');
    console.log("Id---"+id);
    //var idStr = req.params.ids.split(",");
    //var conditions ={dishName : dishName};
    DishDao.updateLoverNum(id,function (err, recipe) {
        if(!(err)){
            res.end("update dish lover num！");
        }

    });

};

DishHandler.updateTotalStarsNum=function(req,res){

    console.log("DishHandler----updateLoverNum");
    var id = req.body.id;
    var num = req.body.num;
    console.log("Id---"+id);
    console.log("num---"+num);

    DishDao.updateTotalStarsNum(id,num,function (err, recipe) {
        if(!(err)){
            res.end("update dish update total stars num！");
        }

    });

};

module.exports = DishHandler;