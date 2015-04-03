/**
 * Created by mengchi on 3/30/15.
 */

var FriendDao = require('../dao/FriendsDao');
var UserDao = require('../dao/UserDao');
var querystring=require('querystring');
var UserModel = require('./../data').User;


function FriendsHandler(){

}

FriendsHandler.showAllFriends=function(req,res){
    console.log("show all friend of user");

    var userId = req.param('userId');

    UserDao.getUserById(userId,function(err,user){
        if(err){
            res.json(500, {message: err.toString()});
            return;
        }
        if(!user){
            res.json(404, {message: "This user not exit"});
            return;

        }
        res.json(200,{friendList:user.friends,num: user.friends_count});

    })
}


FriendsHandler.addFriend=function(req,res){
    console.log("add a friend");

    var friendId = req.param('friendId');//"551d7bbe1fb802ae1c438f15"//
    var friendAccount =req.param('friendAccount');//"bbb" //
    var friendHead =req.param('friendHead');//"/head/defaulthead.jpeg" //

    var friends = {};
    friends._id = friendId;
    friends.account = friendAccount;
    friends.head = friendHead;

    var userId = req.session.user_id;//"551d7bb281e3449e1c1c6600"; //
    var userAccount = req.session.account;//"aaa"; //
    var userHead = req.session.head;//"/head/defaulthead.jpeg"; //

    var me = {};
    me._id =userId;
    me.account = userAccount;
    me.head = userHead;



    FriendDao.addFriend(friendId,me,function(err,user){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        else if (!user) {
            res.json(404, {message: "Not found."});
            return;
        }else{
            FriendDao.addFriend(userId,friends,function(err,user2){
                if (err) {
                    res.json(500, {message: err.toString()});
                    return;
                }
                if (!user) {
                    res.json(404, {message: "Not found."});
                    return;
                }
                res.json(200,{message:'add friends success', user:user2});

            })
        }
    })
};

FriendsHandler.deleteFriend = function(req,res){
    var friendId = req.param('friendId');
    var friendAccount = req.param('friendAccount');
    var friendHead = req.param('friendHead');

    //var friendId = "551d7bbe1fb802ae1c438f15"//req.param('friendId');
    //var friendAccount ="bbb" //req.param('friendAccount');
    //var friendHead ="/head/defaulthead.jpeg" //req.param('friendHead');

    var friends = {};
    friends._id = friendId;
    friends.account = friendAccount;
    friends.head = friendHead;

    //var userId = "551d7bb281e3449e1c1c6600"; //req.session.user_id;
    //var userAccount = "aaa"; //req.session.account;
    //var userHead = "/head/defaulthead.jpeg"; //req.session.head;

    var userId = req.session.user_id;
    var userAccount = req.session.account;
    var userHead = req.session.head;
    var me = {}
    me._id =userId;
    me.account = userAccount;
    me.head = userHead;

    FriendDao.deleteFriend(friendId,me,function(err,user){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        else if (!user) {
            res.json(404, {message: "Not found1."});
            return;
        }else{
            FriendDao.deleteFriend(userId,friends,function(err,user2){
                if (err) {
                    res.json(500, {message: err.toString()});
                    return;
                }
                if (!user) {
                    res.json(404, {message: "Not found2."});
                    return;
                }
                res.json(200,{message:'delete friends success', user:user2});

            })
        }
    })

}

FriendsHandler.searchFriends=function(req,res){


    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var queryStr =req.param('queryStr');//"b" //
    var userid = req.session.user_id;//"551d7bb281e3449e1c1c6600"//

    FriendDao.searchFriends(pageNo,pageSize,queryStr,function (err, users) {
        if(err){
            res.json(500, {message: err.toString()});
            return;
        }
        if(!users){
            res.json(200, {message: "Not found."});
            return;
        }

        res.json(200,{users:users});

    });

}


FriendsHandler.checkFriend=function(req,res){
    FriendDao.check(userId,friendId,function(err,result){

        var isFriend = false;

        if(err){
            res.json(500, {message: err.toString()});
            return;

        }
        if(!result){
            isFriend = false;
        }else
            isFriend = true;

        res.json(200,{isFriend:isFriend});

    })

}


FriendsHandler.recommend=function(req,res){

}

FriendsHandler.adduser=function(req,res){

var username ='ggg'
var password = 'ggg'
var email = '1412@sfd.com'


var user = new UserModel({
    username: username,
    account: username,
    password: password,
    email: email
});
    console.log("注册---username:" + username + "-----密码:" + password);
UserDao.save(user, function (err, data) {
    if(err&& err.length>0){
        res.json(500,{message:"Register Failed！"});
    }else {
        res.json(200,{message:"Register Successful！"});
    }

});
}



module.exports = FriendsHandler;