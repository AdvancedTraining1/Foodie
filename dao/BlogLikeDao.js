/**
 * Created by mengchi on 14-11-13.
 */
var DaoBase = require('./DaoBase'),
    BlogLikeModel = require('./../data').BlogLike;

var BlogLikeDao = new DaoBase(BlogLikeModel);

module.exports = BlogLikeDao;
BlogLikeDao.create = function(blogLike,callback){
    blogLike.save(function (error, newbloglike){
        if(error) return callback(error,null);

        return callback(null, newbloglike);
    });
}