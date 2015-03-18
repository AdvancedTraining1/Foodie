/**
 * Created by mengchi on 14-11-13.
 */
var DaoBase = require('./DaoBase'),
    CommentToBlogModel = require('./../data').CommentToBlog;

var CommentToBlogDao = new DaoBase(CommentToBlogModel);

module.exports = CommentToBlogDao;

CommentToBlogDao.getAllCommentToBlog = function (pageNo,pageSize,blod_id,callback) {
    CommentToBlogModel.find({blog_id:blod_id}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'create_at':-1}).exec(function(error,comments){
        if(error) return callback(error,null);
        return callback(null, comments);
    });
};

CommentToBlogDao.create = function(commentToBlog,callback){
    commentToBlog.save(function (error, newCommentToBlog){
        if(error) return callback(error,null);

        return callback(null, newCommentToBlog);
    });
}

CommentToBlogDao.listCommentNum = function (blogId,callback) {
    CommentToBlogModel.count({"blog_id":blogId}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};
