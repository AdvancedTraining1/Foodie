/**
 * Created by mengchi on 5/15/15.
 */
var DaoBase = require('./DaoBase');
var User = require('./../data').User;
var FriendMessage = require('./../data').FriendMessage;

var FriendMessageDao = new DaoBase(FriendMessage);

module.exports = FriendMessageDao;


FriendMessageDao.create = function(FriendMessage,callback){
    FriendMessage.save(function (error, friendMessage){
        if(error) return callback(error,null);

        return callback(null, friendMessage);
    });
}
FriendMessageDao.getNeedList = function(userId,callback){
    FriendMessage.find({"to.id":userId}).sort({'date':-1}).exec(function(error,fMlists){
        if(error) return callback(error,null);

        return callback(null, fMlists);
    });
}

FriendMessageDao.deal  = function(id,status,callback){
    FriendMessage.findByIdAndUpdate(id,{status:status},function(error,friendMessage){
        if(error) return callback(error,null);

        return callback(null, friendMessage);
    });
}
