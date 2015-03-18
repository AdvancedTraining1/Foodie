/**
 * Created by mengchi on 14-11-14.
 */

var DaoBase = require('./DaoBase'),
    TopicUploadModel = require('./../data').TopicUpload;

var TopicUploadDao = new DaoBase(TopicUploadModel);

module.exports = TopicUploadDao;


TopicUploadDao.getAllUploadToATopic = function (topic_id,pageNo,pageSize,callback) {
    TopicUploadModel.find({topic_id:topic_id}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'create_at':-1}).exec(function(error,uploads){
        if(error) return callback(error,null);
        return callback(null, uploads);
    });
};

TopicUploadDao.create = function(upload,callback){
    upload.save(function (error, newupload){
        if(error) return callback(error,null);

        return callback(null, newupload);
    });
};

TopicUploadDao.getOne = function (id,callback) {
    TopicUploadModel.findOne({_id:id}).exec(function(error,topicUpload){
        if(error) return callback(error,null);
        return callback(null, topicUpload);
    });
};

TopicUploadDao.update = function( conditions, update ,options, callback) {
    TopicUploadModel.update(conditions, update, options, function (error,doc) {
        if(error) return callback(error);
        return callback(null,doc);
    });

};

TopicUploadDao.listCommentNum = function (topicId,callback) {
    TopicUploadModel.count({"topic_id":topicId}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};