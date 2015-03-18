/**
 * chenmm
 * 2014/10/30
 * 菜谱数据访问类
 */

var DaoBase = require('./DaoBase'),
    Recipe = require('./../data').Recipe;

var RecipeDao = new DaoBase(Recipe);

module.exports = RecipeDao;

RecipeDao.getOwn = function (pageNo,pageSize,authorId,callback) {
    Recipe.find({"author._id":authorId,flag:true}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'logTime':-1}).exec(function(error,recipe){
        if(error)
            return callback(error,null);
        return callback(null, recipe);
    });
};

RecipeDao.getOwnNum = function (authorId,callback) {
    Recipe.find({"author.id":authorId,flag:true}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};

RecipeDao.update = function(id,recipeNew,callback){
    Recipe.findByIdAndUpdate(id,recipeNew,function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}

RecipeDao.delete = function (list,callback) {
    Recipe.remove({_id:{$in:list}}).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}

RecipeDao.getAll = function (pageNo,pageSize,callback) {
    Recipe.find({flag:true}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'logTime':-1}).exec(function(error,recipe){
        if(error)
            return callback(error,null);
        return callback(null, recipe);
    });
};

RecipeDao.getAllNum = function (callback) {
    Recipe.count({flag:true}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};

RecipeDao.searchRecipe = function (pageNo,pageSize,query,callback) {
    var str = ""+query+".*";
    //{ $regex: str} 第一种使用正则表达式的方式
    //var str1 = new RegExp(query); 第二种使用正则表达式的方式
    Recipe.find({recipeName:{ $regex: str}}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'logTime':-1}).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
};

RecipeDao.searchRecipeNum = function (query,callback) {
    var str = ""+query+".*";
    //{ $regex: str} 第一种使用正则表达式的方式
    //*var str1 = new RegExp(query); //第二种使用正则表达式的方式

    Recipe.count({recipeName:{ $regex: str}}).exec(function(error,recipe){
        if(error)
            return callback(error,null);
        return callback(null, recipe);
    });
};

RecipeDao.updateCommentNum = function (id,callback) {
    Recipe.findByIdAndUpdate(id,{$inc:{commentNum:1}},function(error,recipe){
        if(error)
            return callback(error,null);
        return callback(null, recipe);
    });
};

RecipeDao.updateProductNum = function (id,callback) {
    Recipe.findByIdAndUpdate(id,{$inc:{productNum:1}},function(error,recipe){
        if(error)
            return callback(error,null);
        return callback(null, recipe);
    });
};

RecipeDao.updateCollectNum = function (id,callback) {
    Recipe.findByIdAndUpdate(id,{$inc:{collectNum:1}},function(error,recipe){
        if(error)
            return callback(error,null);
        return callback(null, recipe);
    });
};

/*RecipeDao.listComment = function(id,callback){
    Recipe.find({_id:id},{commentList:1}).sort({'logTime':-1}).limit(10).exec(function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}

RecipeDao.comment = function (id,comment,callback) {
    Recipe.findByIdAndUpdate(id,{$push:comment},function(error,recipe){
        if(error) return callback(error,null);

        return callback(null, recipe);
    });
}*/
