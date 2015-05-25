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


module.exports = RestaurantHandler;