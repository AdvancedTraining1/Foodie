/**
 * Created by mengchi on 14-11-9.
 */
var DaoBase = require('./DaoBase'),
    CollectBlogModel = require('./../data').CollectBlog;

var CollectBlogDao = new DaoBase(CollectBlogModel);

module.exports = CollectBlogDao;

CollectBlogDao.create = function(collectBlog,callback){
    collectBlog.save(function (error, newCollectBlog){
        if(error) return callback(error,null);

        return callback(null, newCollectBlog);
    });
}

CollectBlogDao.check = function (userId,recipeId,callback) {
    CollectBlogModel.find({user_id:userId,blog_id:recipeId},function(error,collect){
        if(error)
            return callback(error,null);
        return callback(null, collect);
    });
};
