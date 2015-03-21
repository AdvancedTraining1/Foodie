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

DishHandler.addDish=function(req,res){  //http://localhost:3000/service/dish/create?a=a&b=b&c=c


    console.log("DishHandler----addDish()");
    var restaurantId = 111;
    var logTime =Date.parse(new Date());  //毫秒
    console.log("time---"+logTime);

    var dishName = req.param('dishName');
    var description = req.param('description');
    var photo = req.param('photo');

    if(dishName&& dishName.length>0){
        var dish = new DishModel({
            dishName: dishName,
            description: description,
            photo: photo,
            logTime: logTime,
            restaurantId:restaurantId
        });

        DishDao.save(dish, function (err, data) {
            if(err&& err.length>0){
                res.json({message:"Dish add Error"});
            }else {
                res.json({message:"Dish add Successful！"});
            }
        });
    }
};


module.exports = DishHandler;