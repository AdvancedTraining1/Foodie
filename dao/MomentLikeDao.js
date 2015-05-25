/**
 * Created by cmm on 4/4/15.
 */

var DaoBase = require('./DaoBase'),
    MomentLike = require('./../data').MomentLike;

var MomentLikeDao = new DaoBase(MomentLike);
module.exports = MomentLikeDao;

MomentLikeDao.getByIdList = function (idList,callback) {
    MomentLike.findOne({_id:{$in:idList},flag:true}).sort({'date':-1}).exec(function(error,momentLike){
        if(error)
            return callback(error,null);
        return callback(null, momentLike);
    });
};