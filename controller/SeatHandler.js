/**
 * Created by huhao on 15-3-20.
 */

var db = require('../util/database')

var SeatModel = require('../data').Seat;
var SeatDao=require("../dao/SeatDao");

var querystring = require("querystring"),
    formidable = require('formidable'),
    fs = require('fs'),
    url = require('url'),
    config=require("../util/config");


function SeatHandler(){
}

SeatHandler.add=function(req,res){

    console.log("SeatHandler----add()");
    var restaurantId = req.body.restaurantId;
    var temp = req.body.peopleList;
    var person = temp[0];
    var seatNum = req.body.seatsNum;
    var peopleNum = req.body.peopleNum;
    var restaurantName = req.body.restaurantName;

    console.log(restaurantId);
    console.log(seatNum);
    console.log(peopleNum);
    console.log(restaurantName);
    console.log(person._id);

    if(restaurantName && restaurantName.length>0){

        var Seat = new SeatModel({
            restaurantName: restaurantName,
            restaurantId: restaurantId,
            seatsNum: seatNum,
            peopleNum:peopleNum,
            peopleList:[
                person
            ]
        });

        SeatDao.save(Seat, function (err, data) {
            if(!err){
                res.writeHead(200, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("Seat add Successful！");
            }
        });
    }
};


SeatHandler.getSeatNum=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("SeatHandler----getSeatNUm");
    var restaurantId = req.param('restaurantId');
    SeatDao.getByRestaurantId(1,20,restaurantId,function (err1, data) {
        if(!(err1)){
            //console.log(data[0].seatsNum);
            res.json({num : data[0].seatsNum});
            //data
        }
    });
};

SeatHandler.setSeatNum=function(req,res){

    console.log("SeatHandler----setSeatNum");
    var id = req.body.restaurantId;
    var num = req.body.seatsNum;
    //console.log("Id---"+id);
    //console.log("num---"+num);
    var conditions ={restaurantId : id};
    var update = {$set : {seatsNum : num}};
    var options = {update : true};

    SeatDao.update(conditions,update,options,function (err, recipe) {
        if(!(err)){
            res.end("setSeatNum！");
        }

    });

};

SeatHandler.getPeopleNum=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("SeatHandler----getPeopleNum");
    var restaurantId = req.param('restaurantId');
    SeatDao.getByRestaurantId(1,20,restaurantId,function (err1, data) {
        if(!(err1)){
            res.json({num:data[0].peopleNum});
            //data
        }
    });
};

SeatHandler.getByRestaurantId=function(req,res){
    console.log("SeatHandler----getByRestaurantId");

    //var restaurantName = req.param('pageNo');
    var restaurantId = req.param('restaurantId');
    //var restaurantId = req.param('restaurantId');
//    console.log("pageNo---"+pageNo);
//    console.log("pageSize---"+pageSize);
//    console.log("restaurantId---"+restaurantId);

    SeatDao.getByRestaurantId(1,20,restaurantId,function (err1, data) {
        if(!(err1)){
            console.log(data[0]);
            console.log(data[0].peopleList);
            res.json({peopleList:data[0].peopleList});
            //data
        }
    });
}

SeatHandler.deleteById=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("SeatHandler----deleteById");
    var Id = req.param('restaurantId');
    //console.log("DishId---"+DishId);
    //var idStr = req.params.ids.split(",");
    var conditions ={restaurantId : Id};
    SeatDao.delete(conditions,function (err, recipe) {
        if(!(err)){
            res.end("delete seat success！");
        }

    });

};

SeatHandler.insertPeople=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("SeatHandler----insertPeople");
    var person = {
        _id: req.param('Id'),
        name: req.param('Name')
    };


    SeatDao.getByRestaurantId(1,20,req.param('restaurantId'),function (err1, data) {
        if(!(err1)){
            //console.log(data[0].peopleNum);
            SeatDao.insertPeople(data[0]._id,person,function (err, recipe) {
                if(!(err)){
                    //console.log(data[0]._id);
//                    SeatDao.getByRestaurantId(1,20,110,function (err1, data2) {
//                        if(!(err1)){
//                            console.log(data2[0]);
//                            //data
//                        }
//                    });
                    res.end("insertPeople！");
                }

            });

        }
    });




};

SeatHandler.deletePeople=function(req,res){
    ///service/dish/getalldishs?a=a&b=b
    console.log("SeatHandler----deletePeople");
    var person = {
        _id: req.param('Id'),
        name: req.param('Name')
    };
    //var id = req.params.param('restaurantId');
    //console.log(req.param('Id'));
    //console.log(req.param('restaurantId'));
    //console.log(req.param('Name'));
    SeatDao.getByRestaurantId(1,20,req.param('restaurantId'),function (err1, data) {
        if(!(err1)){
            //console.log(data[0].peopleNum);
            SeatDao.deletePeople(data[0]._id,person,function (err, recipe) {
                if(!(err)){

//                    SeatDao.getByRestaurantId(1,20,110,function (err1, data2) {
//                        if(!(err1)){
//                            console.log(data2[0]);
//                            //data
//                        }
//                    });
                    res.end("deletePeople！");
                }

            });

        }
    });
    //console.log("Id---"+id);
    //var idStr = req.params.ids.split(",");
    //var conditions ={dishName : dishName}




};

SeatHandler.testdata=function(req,res){
    console.log("testdata!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    var restaurantId = 5201314;
    var person = {
        _id: 5211314,
        name: 'hh'
    };
    var seatNum = 40;
    var peopleNum = 40;
    var restaurantName = 'HH';
    var temp = new SeatModel({
        restaurantName: restaurantName,
        restaurantId: restaurantId,
        seatsNum: seatNum,
        peopleNum:peopleNum,
        peopleList:[
            person
        ]
    });
    temp.save(function (err) {
        if (err) throw err;
        //done();
    });

};



module.exports = SeatHandler;