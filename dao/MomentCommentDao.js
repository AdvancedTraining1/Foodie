/**
 * Created by cmm on 4/4/15.
 */

var DaoBase = require('./DaoBase'),
    MomentComment = require('./../data').MomentComment;

var MomentCommentDao = new DaoBase(MomentComment);
module.exports = MomentCommentDao;

MomentCommentDao.getByIdList = function (idList,callback) {
    MomentComment.find({_id:{$in:idList},flag:true}).sort({'date':-1}).exec(function(error,momentComment){
        if(error)
            return callback(error,null);
        return callback(null, momentComment);
    });
};