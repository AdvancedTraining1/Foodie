/**
 * Created by liuhanxu on 15-3-20.
 * Edit by huhao on 15-4-4.
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

DishDao.getAllDish = function (pageNo,pageSize,callback)
{
    DishModel.find({}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'dishName':-1}).exec(function(err,data){
        if (err) {
            console.log("fuck");
            callback(err,null);
            return;
        }
        return callback(null,data);
    });
};

DishDao.getAllNum = function (callback) {
    DishModel.count({}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};

DishDao.getByRestaurantId = function (pageNo,pageSize,restaurantId,callback) {
    DishModel.find({"restaurantId":restaurantId}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'dishName':-1}).exec(function(error,data){
        if(error)
            return callback(error,null);
        return callback(null, data);
    });
};

DishDao.getRestaurantDishesNum = function (restaurantId,callback) {
    DishModel.count({"restaurantId":restaurantId}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};

DishDao.delete = function (conditions,callback) {
    DishModel.remove(conditions).exec(function(error,dish){
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

DishDao.updatePraiseNum = function (id,callback) {
    DishModel.findByIdAndUpdate(id,{$inc:{praiseNum:1}},function(error,data){
        if(error)
            return callback(error,null);
        return callback(null, data);
    });
};

DishDao.updateLoverNum = function (id,callback) {
    DishModel.findByIdAndUpdate(id,{$inc:{loverNum:1}},function(error,data){
        if(error)
            return callback(error,null);
        return callback(null, data);
    });
};

DishDao.updateTotalStarsNum = function (id,num,callback) {
    DishModel.findByIdAndUpdate(id,{$inc:{loverNum:num}},function(error,data){
        if(error)
            return callback(error,null);
        return callback(null, data);
    });
};

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