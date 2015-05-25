/**
 * Created by cmm on 4/2/15.
 */

var DaoBase = require('./DaoBase'),
    Moment = require('./../data').Moment,
    MomentComment = require('./../data').MomentComment,
    MomentLike = require('./../data').MomentLike;

var MomentDao = new DaoBase(Moment);
module.exports = MomentDao;

MomentDao.getAll = function (pageNo,pageSize,callback) {
    Moment.find({flag:true}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'date':-1}).exec(function(error,moment){
        if(error)
            return callback(error,null);
        return callback(null, moment);
    });
};

MomentDao.getAllNum = function (callback) {
    Moment.count({flag:true}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};

MomentDao.getByUserId = function (pageNo,pageSize,authorId,callback) {
    Moment.find({"author._id":authorId,flag:true}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'date':-1}).exec(function(error,moment){
        if(error)
            return callback(error,null);
        return callback(null, moment);
    });
};

MomentDao.getNumByUserId = function (authorId,callback) {
    Moment.count({"author._id":authorId,flag:true}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};

MomentDao.delete = function (id,callback) {
    Moment.findByIdAndUpdate(id,{flag:false},function(error,moment){
        if(error)
            return callback(error,null);
        return callback(null, moment);
    });
};

MomentDao.updateLikeNum = function (id,callback) {
    Moment.findByIdAndUpdate(id,{$inc:{likeNum:1}},function(error,moment){
        if(error)
            return callback(error,null);
        return callback(null, moment);
    });
};

MomentDao.updateComment = function (replyId,commentId,callback) {
    //if(flag == true){
    Moment.findByIdAndUpdate(replyId,{'$inc':{commentNum:1},'push':{commentList:commentId}},function(error,moment){
        if(error)
            return callback(error,null);
        return callback(null, moment);
    });
    //}/*else {
        /*Moment.findByIdAndUpdate(replyId,{$inc:{commentNum:-1},'$pull':{commentList:commentId}},function(error,moment){
            if(error)
                return callback(error,null);
            return callback(null, moment);
        });*/
    //}
};

MomentDao.addComment = function(id,comment,callback){
    MomentComment.push(comment,function(error,comment1){
        if(error)
            return callback(error,null);
        else{
            Moment.findByIdAndUpdate(id,{$inc:{commentNum:1}},function(error,moment){
                if(error)
                    return callback(error,null);
                return callback(null, moment);
            });
        }
    });
};

MomentDao.deleteComment = function(commentId,momentId,callback){
    MomentComment.findByIdAndUpdate(commentId,{"flag":false}).exec(function(error1,comment){
        if(error1)
            return callback(error1,null);
        else{
            Moment.findByIdAndUpdate(momentId,{'$inc':{commentNum:-1},'$pull':{commentList:commentId}},function(error2,moment){
                if(error2){
                    return callback(error2,null);
                }
                return callback(null, moment);
            });
        }
    });
};

MomentDao.likeMoment = function(momentId,like,callback){
    MomentComment.findByIdAndUpdate(momentId,{'$inc':{likeNum:-1},'$push':{likeList:like}}).exec(function(error1,moment){
        if(error1)
            return callback(error1,null);
        else{
            return callback(null, moment);
        }
    });
};