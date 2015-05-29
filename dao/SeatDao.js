/**
 * Edit by huhao on 15-4-4.
 */

var DaoBase = require('./DaoBase');
var SeatModel = require('../data').Seat;

var SeatDao = new DaoBase(SeatModel);


SeatDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            console.log("SeatDao Add 成功！");
            callback(null,'SeatDao save success');
        }
    });

};

SeatDao.getByRestaurantId = function (pageNo,pageSize,restaurantId,callback) {
    SeatModel.find({restaurantId:restaurantId}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'dishName':-1}).exec(function(error,data){
        if(error)
            return callback(error,null);
        return callback(null, data);
    });
};

SeatDao.delete = function (conditions,callback) {
    SeatModel.remove(conditions).exec(function(error,dish){
        if(error) return callback(error,null);
        return callback(null, dish);
    });
};


SeatDao.update = function (conditions,update,options,callback) {
    SeatModel.update(conditions,update,options).exec(function(error,data){
        if(error) return callback(error,null);
        return callback(null, data);
    });
};


SeatDao.insertPeople = function(Id,people,callback){
    SeatModel.findByIdAndUpdate(Id,{'$inc':{peopleNum: 1},'$push':{peopleList:people}}).exec(function(error1,data){
        if(error1)
            return callback(error1,null);
        else{
            return callback(null, data);
        }
    });
};

SeatDao.deletePeople = function(Id,people,callback){

    SeatModel.findByIdAndUpdate(Id,{'$inc':{peopleNum:-1},'$pull':{peopleList:people}},function(error2,moment){
        if(error2){
            return callback(error2,null);
        }
        return callback(null, moment);
    });

};

//SeatDao.updatePeopleNum = function (id,callback) {
//    SeatModel.findByIdAndUpdate(id,{$inc:{peopleNum:1}},function(error,data){
//        if(error)
//            return callback(error,null);
//        return callback(null, data);
//    });
//};

//SeatDao.getQueueByRestaurantId = function (restId,callback) {
//    SeatModel.find({restaurantId:restId}).exec(function(err,people){
//        if (err){
//            console.log("err"+err);
//            callback(err,null);
//        }
//        else{
//            callback(null,people);
//        }
//    });
//}



module.exports = SeatDao;