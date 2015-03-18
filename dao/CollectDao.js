/*
 * chenmm
 * 2014/11/01
 * 收藏菜谱数据访问类
 */

var DaoBase = require('./DaoBase'),
    CollectModel = require('./../data').CollectRecipe;

var CollectDao = new DaoBase(CollectModel);

module.exports = CollectDao;

CollectDao.check = function (userId,recipeId,callback) {
    CollectModel.find({userId:userId,recipeId:recipeId},function(error,collect){
        if(error)
            return callback(error,null);
        return callback(null, collect);
    });
};
