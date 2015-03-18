/**
 * this is edited by huhao
 * 2014.11.06
 * chenmm push me to do this i don't understand until now
 */

var DaoBase = require('./DaoBase');
var commentModel = require('../data').CommentRecipe;

var CommentDao = new DaoBase(commentModel);

module.exports = CommentDao;


CommentDao.delete = function (conditions,callback) {
    commentModel.remove(conditions).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
        //return callback(null, 'RecipeDao.delete success');
    });
}

// chenmm.add.start 2014/11/07 加入方法：列举一个菜谱的评论
CommentDao.listComment = function (recipeId,callback) {
    commentModel.find({"replyId":recipeId}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'logTime':-1}).exec(function(error,recipe){
        if(error)
            return callback(error,null);
        return callback(null, recipe);
    });
}
// chenmm.add.end 2014/11/07
