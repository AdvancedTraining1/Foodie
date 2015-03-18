/*
 * chenmm
 * 2014/11/01
 * 作品数据访问类
 */

var DaoBase = require('./DaoBase'),
    ProductModel = require('./../data').Product;

var ProductDao = new DaoBase(ProductModel);

module.exports = ProductDao;

ProductDao.listProduct = function (pageNo,pageSize,recipeId,callback) {
    ProductModel.find({"recipeId":recipeId}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'logTime':-1}).exec(function(error,product){
        if(error)
            return callback(error,null);
        return callback(null, product);
    });
};

ProductDao.listProductNum = function (recipeId,callback) {
    ProductModel.count({"recipeId":recipeId}).exec(function(error,num){
        if(error) return callback(error,null);

        return callback(null, num);
    });
};

ProductDao.likeProduct = function (id,like,num,callback) {
    ProductModel.findByIdAndUpdate(id,{$push:{likeList:like},likeNum:num},function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}
