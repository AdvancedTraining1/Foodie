/**
 * Created by mengchi on 14-11-13.
 */
var DaoBase = require('./DaoBase'),
    TopicUploadCommentModel = require('./../data').TopicUploadComment;

var TopicUploadCommentDao = new DaoBase(TopicUploadCommentModel);

module.exports = TopicUploadCommentDao;

TopicUploadCommentDao.getAllCommentToTopicUpload = function (topicUpload_id,callback) {
    TopicUploadCommentModel.find({topicUpload_id:topicUpload_id}).sort({'create_at':-1}).exec(function(error,comments){
        if(error) return callback(error,null);
        return callback(null, comments);
    });
};

TopicUploadCommentDao.create = function(topicUploadComment,callback){
    topicUploadComment.save(function (error, newTopicUploadComment){
        if(error) return callback(error,null);

        return callback(null, newTopicUploadComment);
    });
}

