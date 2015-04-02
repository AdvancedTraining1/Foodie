/**
 * Created by mengchi on 3/30/15.
 */

var DaoBase = require('./DaoBase');
var User = require('./../data').user;

var FriendsDao = new DaoBase(User);

module.exports = FriendsDao;

FriendsDao.getAllFriends = function (pageNo,pageSize,callback) {

    User.find({flag:true}).sort({'fans_count':-1}).skip((pageNo-1)*pageSize).limit(pageSize).exec(function(error,users){
        if(error)
            return callback(error,null);
        return callback(null, users);
    });

}

FriendsDao.searchAllUsers = function (pageNo,pageSize,queryStr,callback) {

    var str = ""+queryStr+".*";

    User.find({username:{ $regex: str}}).sort({'fans_count':-1}).skip((pageNo-1)*pageSize).limit(pageSize).exec(function(error,users){
        if(error) return callback(error,null);

        return callback(null, users);
    });
}

FriendsDao.getNum = function (callback) {
    User.count({flag:true}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};


FriendsDao.searchNum = function (query,callback) {
    var str = ""+query+".*";
    //{ $regex: str} 第一种使用正则表达式的方式
    //*var str1 = new RegExp(query); //第二种使用正则表达式的方式

    User.count({username:{ $regex: str}}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};

FriendsDao.check = function (userId,friendId,callback) {
    User.find({_id:userId,"friends._id":friendId},function(error,attention){
        if(error)
            return callback(error,null);
        return callback(null, attention);
    });
};

FriendsDao.addFriend = function (id,friends,callback) {
    User.findByIdAndUpdate(id,{$push:{friends:friends},$inc:{friends_count:1}},function(error,users){
        return callback(null,users);
    });

}



FriendsDao.deleteFriend = function (id,friends,callback) {
    User.findByIdAndUpdate(id,{$pull:{friends:friends},$inc:{friends_count:-1}},function(error,users){
        return callback(null,users);
    });
}
