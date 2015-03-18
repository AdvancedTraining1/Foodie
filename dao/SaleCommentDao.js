/**
 * Created by zhangcan on 14-11-26.
 */
var DaoBase = require('./DaoBase'),
    SaleComment = require('./../data').CommentToBlog;

var SaleCommentDao = new DaoBase(SaleComment);

module.exports = SaleCommentDao;

SaleCommentDao.getAllCommentToBlog = function (pageNo,pageSize,blod_id,callback) {
    SaleComment.find({blog_id:blod_id}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'create_at':-1}).exec(function(error,comments){
        if(error) return callback(error,null);
        return callback(null, comments);
    });
};

SaleCommentDao.create = function(saleComment, callback){
    saleComment.save(function (error, newSaleComment){
        if(error)
            return callback(error,null);

        return callback(null, newSaleComment);
    });
}

SaleCommentDao.listCommentNum = function (blogId,callback) {
    SaleComment.count({"blog_id":blogId}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};