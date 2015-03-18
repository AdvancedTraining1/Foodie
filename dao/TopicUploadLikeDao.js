/**
 * Created by mengchi on 14-11-14.
 */
var DaoBase = require('./DaoBase'),
    TopicUploadLikeModel = require('./../data').TopicUploadLike;

var TopicUploadLikeDao = new DaoBase(TopicUploadLikeModel);

module.exports = TopicUploadLikeDao;
TopicUploadLikeDao.create = function(topicUploadLike,callback){
    topicUploadLike.save(function (error, newTopicUploadLike){
        if(error) return callback(error,null);

        return callback(null, newTopicUploadLike);
    });
}