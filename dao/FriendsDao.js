/**
 * Created by mengchi on 3/30/15.
 */

var DaoBase = require('./DaoBase');
var User = require('./../data').User;

var FriendsDao = new DaoBase(User);

module.exports = FriendsDao;

FriendsDao.addFriend = function (id,friends,callback) {
    User.findByIdAndUpdate(id,{$push:{friends:friends},$inc:{friends_count:1}},function(error,user){
        return callback(null,user);
    });

};

FriendsDao.deleteFriend = function (id,friends,callback) {
    User.findByIdAndUpdate(id,{$pull:{friends:friends},$inc:{friends_count:-1}},function(error,users){
        return callback(null,users);
    });
};

FriendsDao.searchFriends = function (pageNo,pageSize,queryStr,callback) {

    var str = ""+queryStr+".*";

    User.find({account:{ $regex: str}}).skip((pageNo-1)*pageSize).limit(pageSize).exec(function(error,users){
        if(error) return callback(error,null);

        return callback(null, users);
    });
};

FriendsDao.check = function (userId,friendId,callback) {
    User.find({_id:userId,"friends._id":friendId}).exec(function(error,result){
        if(error)
            return callback(error,null);
        return callback(null, result);
    });
};

