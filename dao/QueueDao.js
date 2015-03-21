/**
 * Created by liuhanxu on 15-3-20.
 */

var DaoBase = require('./DaoBase');
var QueueModel = require('../data').Queue;

var QueueDao = new DaoBase(QueueModel);


QueueDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            console.log("QueueDao Add 成功！");
            callback(null,'QueueDao.prototype.save success');
        }
    });

};

QueueDao.getAllQueue = function (callback)
{
    QueueModel.find({},function(err,queues) {
        if (err) {
            callback(err,null);
            return;
        }
        if (!queues) {
            callback(null,"QueueDao.getAllQueue no queues");
            return;
        }
        callback(null,queues);
    });
};

QueueDao.delete = function (list,callback) {
    QueueModel.remove({_id:{$in:list}}).exec(function(error,queue){
        if(error) return callback(error,null);
        return callback(null, queue);
    });
}

QueueDao.update = function (conditions,update,options,callback) {
    QueueModel.update(conditions,update,options).exec(function(error,queue){
        if(error) return callback(error,null);
        return callback(null, queue);
    });
}

QueueDao.getQueueByUserId = function (userId,callback) {
    QueueModel.find({userId:userId}).exec(function(err,queues){
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            callback(null,queues);
        }
    });
}



module.exports = QueueDao;