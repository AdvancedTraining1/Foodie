/**
 * Created by liuhanxu on 15-3-20.
 */

var DaoBase = require('./DaoBase');
var RestaurantModel = require('../data').Restaurant;

var RestaurantDao = new DaoBase(RestaurantModel);


RestaurantDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            console.log("RestaurantDao Add 成功！");
            callback(null,'RestaurantDao.prototype.save success');
        }
    });

};

RestaurantDao.getAllRestaurant = function (callback)
{
    RestaurantModel.find({},function(err,restaurants) {
        if (err) {
            callback(err,null);
            return;
        }
        if (!restaurants) {
            callback(null,"RestaurantDao.getAllRestaurant no restaurants");
            return;
        }
        callback(null,restaurants);

    });

};

RestaurantDao.delete = function (list,callback) {
    RestaurantModel.remove({_id:{$in:list}}).exec(function(error,restaurnt){
        if(error) return callback(error,null);
        return callback(null, restaurnt);
    });
}

RestaurantDao.update = function (conditions,update,options,callback) {
    RestaurantModel.update(conditions,update,options).exec(function(error,restaurnt){
        if(error) return callback(error,null);
        return callback(null, restaurnt);
    });
}

RestaurantDao.getRestaurantByID= function (restid,callback) {
    RestaurantModel.findOne({_id:restid}).exec(function(err,restaurant){
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            callback(null,restaurant);
        }
    });
}
RestaurantDao.getRestaurantByName= function (pageNo,pageSize,restname,callback) {
    RestaurantModel.find({restaurantName:restname}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'date':-1}).exec(function(error,restaurantlist){
        if(error)
            return callback(error,null);
        return callback(null, restaurantlist);
    });
};
RestaurantDao.testRestaurantName= function (restname,callback) {
    RestaurantModel.findOne({restaurantName:restname}).exec(function(err,restaurant){
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            callback(null,restaurant);
        }
    });
};

RestaurantDao.getNumByName= function (restname,callback) {
    RestaurantModel.count({restaurantName:restname}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};

module.exports = RestaurantDao;
