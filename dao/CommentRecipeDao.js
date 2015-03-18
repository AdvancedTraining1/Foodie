/**
 * Created by cmm on 12/6/14.
 */
var DaoBase = require('./DaoBase');
var commentModel = require('../data').CommentRecipe;

var CommentRecipeDao = new DaoBase(commentModel);

module.exports = CommentRecipeDao;

CommentRecipeDao.listComment = function (pageNo,pageSize,recipeId,callback) {
    commentModel.find({"replyId":recipeId}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'logTime':-1}).exec(function(error,comment){
        if(error)
            return callback(error,null);
        return callback(null, comment);
    });
};

CommentRecipeDao.listCommentNum = function (recipeId,callback) {
    commentModel.count({"replyId":recipeId}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};
