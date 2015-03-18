/**
 * this is edited by huhao
 * 2014.11.06
 * chenmm push me to do this i don't understand until now
 */

var DaoBase = require('./DaoBase');
var advertiseModel = require('../data').advertise;

var AdvertiseDao = new DaoBase(advertiseModel);

module.exports = AdvertiseDao;

AdvertiseDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err)
            callback(err,null);
        else
            callback(null,'UserDao.prototype.save success');
    });
};

AdvertiseDao.getAllAds = function (callback)
{
    advertiseModel.find({},function(err,ads) {
        if (err) {
            callback(err,null);
            return;
        }
        if (!ads) {
            callback(null,"UserDao.getAllUsers no users");
            return;
        }
        callback(null,ads);

    });

};

AdvertiseDao.delete = function (conditions,callback) {
    advertiseModel.remove(conditions).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
        //return callback(null, 'RecipeDao.delete success');
    });
}

AdvertiseDao.update = function (conditions,update,options,callback) {
    advertiseModel.update(conditions,update,options).exec(function(error,data){
        if(error) return callback(error,null);

        return callback(null, 'UserDao.update success');
        //return callback(null, 'RecipeDao.delete success');
    });
}

//AdvertiseDao.getUserById = function (userId,callback) {
//    advertiseModel.find({"account":userId}).exec(function(error,user){
//        if(error) return callback(error,null);
//
//        return callback(null, user);
//    });
//}

module.exports = AdvertiseDao;
