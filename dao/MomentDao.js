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
    Moment.find({"author.id":authorId,flag:true}).exec(function(error,num){
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

MomentDao.updateCommentNum = function (id,flag,callback) {
    if(flag == true){
        Moment.findByIdAndUpdate(id,{$inc:{commentNum:1}},function(error,moment){
            if(error)
                return callback(error,null);
            return callback(null, moment);
        });
    }else {
        Moment.findByIdAndUpdate(id,{$inc:{commentNum:-1}},function(error,moment){
            if(error)
                return callback(error,null);
            return callback(null, moment);
        });
    }
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
        //return callback(null, comment1);
    });
};

MomentDao.deleteComment = function(commentId,momentId,callback){
    MomentComment.findOne({"id":commentId}).exec(function(error,comment){
        if(error)
            return callback(error,null);
        else{
            MomentComment.pop(comment);
            Moment.findByIdAndUpdate(momentId,{$inc:{commentNum:-1}},function(error,moment){
                if(error)
                    return callback(error,null);
                return callback(null, moment);
            });
        }
        //return callback(null, num);
    });
};

//关于like的方法等comment方法验证之后再写