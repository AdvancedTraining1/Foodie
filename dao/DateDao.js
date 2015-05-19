/**
 * Created by zhaiyuan on 3/29/15.
 */

var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;   wrong
var ObjectId = require('mongodb').ObjectID;   //right


var DaoBase = require('./DaoBase');
var DateModel = require('../data').Date;
var UserModel = require('../data').User;

var DateDao = new DaoBase(DateModel);

DateDao.getAll = function (callback)
{
    DateModel.find({},function(err,date) {
        if (err) {
            return callback(err,null);

        }else {
            return callback(null,date);

        }
    });
};

DateDao.getAllNum = function (callback) {
    DateModel.count({}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};

DateDao.getOne = function (id,callback) {
    DateModel.findOne({_id:id}).exec(function(error,date){
        if(error) return callback(error,null);
        return callback(null, date);
    });
};

DateDao.findFriendsById = function (user,callback) {
    var friendIdList=[];

    for (var i = 0, len = user.friends.length; i < len; i++) {
        //var BSON = require('mongodb').BSONPure;
        //var obj_id = BSON.ObjectID.createFromHexString(user.friends[i]._id);

        friendIdList = friendIdList + new ObjectId(user.friends[i]._id) + ",";
        console.log(user.friends[i]._id);

    }
    console.log(friendIdList);

    if(friendIdList.length!=0){

        UserModel.find({_id:{'$in':friendIdList.split(",")}}).exec(function(error,friends){
            //if(error) return callback(error,null);
            return callback(null, friends);
        });

    }

};
//db.users.find({'age' : {'$in' : [10, 22, 26]}});
//db.users.find({_id:{'$in':[ObjectId("551d6239753c1a9c3d9e6e75"),ObjectId("55570009443d204e23451b83")]}})


DateDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            console.log("Date create Successful");
            callback(null,'DateDao.prototype.save success');
        }
    });

};

DateDao.update = function (conditions,update,options,callback) {
    DateModel.update(conditions,update,options).exec(function(error,date){
        if(error) return callback(error,null);
        return callback(null, date);
    });
}


DateDao.updateById = function (id,dateUsers,callback) {

    DateModel.findByIdAndUpdate(id,{$push: {dateUsers:dateUsers},$inc:{dateUsers_count:1}},function(error,date){
        if(error) return callback(error,null);
        return callback(null, date);
    });
}

DateDao.delete = function (list,callback) {
    DateModel.remove({_id:{$in:list}}).exec(function(error,date){
        if(error) return callback(error,null);
        return callback(null, date);
    });
}


module.exports = DateDao;