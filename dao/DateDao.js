/**
 * Created by zhaiyuan on 3/29/15.
 */

var DaoBase = require('./DaoBase');
var DateModel = require('../data').Date;

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