/**
 * Created by liuhanxu on 15-3-20.
 */

var DaoBase = require('./DaoBase');
var DishModel = require('../data').Dish;

var DishDao = new DaoBase(DishModel);


DishDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            console.log("DishDao Add 成功！");
            callback(null,'DishDao.prototype.save success');
        }
    });

};

DishDao.getAllDish = function (callback)
{
    DishModel.find({},function(err,queues) {
        if (err) {
            callback(err,null);
            return;
        }
        if (!queues) {
            callback(null,"DishDao.getAllDish no dishes");
            return;
        }
        callback(null,queues);
    });
};

DishDao.delete = function (list,callback) {
    DishModel.remove({_id:{$in:list}}).exec(function(error,dish){
        if(error) return callback(error,null);
        return callback(null, dish);
    });
}

DishDao.update = function (conditions,update,options,callback) {
    DishModel.update(conditions,update,options).exec(function(error,dish){
        if(error) return callback(error,null);
        return callback(null, dish);
    });
}

DishDao.getQueueByRestaurantId = function (restId,callback) {
    DishModel.find({restaurantId:restId}).exec(function(err,dishes){
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            callback(null,dishes);
        }
    });
}



module.exports = DishDao;