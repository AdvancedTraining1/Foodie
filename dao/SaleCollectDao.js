/**
 * Created by zhangcan on 14-11-26.
 */
var DaoBase = require('./DaoBase'),
    SaleCollect = require('./../data').CollectBlog;

var SaleCollectDao = new DaoBase(SaleCollect);

module.exports = SaleCollectDao;

SaleCollectDao.create = function(saleCollect, callback){
    saleCollect.save(function (error, newSaleCollect){
        if(error)
            return callback(error, null);

        return callback(null, newSaleCollect);
    });
}

SaleCollectDao.check = function (userId,recipeId,callback) {
    SaleCollect.find({user_id:userId,blog_id:recipeId},function(error,collect){
        if(error)
            return callback(error,null);
        console.log("========"+collect);
        return callback(null, collect);
    });
};