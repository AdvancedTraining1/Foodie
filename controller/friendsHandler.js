/**
 * Created by mengchi on 3/30/15.
 */

var FriendDao = require('../dao/FriendsDao');
var UserDao = require('../dao/UserDao');
var querystring=require('querystring');
var UserModel = require('./../data').User;
var FriendMessageDao = require('../dao/FriendMessageDao');
var FriendMessageModel = require('./../data').FriendMessage;
var AccessToken = require("../auth/ControllerAccessToken.js");
var config=require("../util/config");


function FriendsHandler(){

}

FriendsHandler.saveFriendMessage=function(req,res){

    var friendId = req.param('friendId');
    var friendAccount =req.param('friendAccount');
    var friendHead =req.param('friendHead');
    var message =req.param('message');

    var to = {};
    to._id = friendId;
    to.account = friendAccount;
    to.head = friendHead;

    AccessToken.userActionWithToken(token, res, function (user) {

        var from = {}
        from._id = user._id;
        from.accout = user.account;
        from.head = user.head;

        var FriendMessage = new FriendMessageModel({
            from:from,
            to:to,
            status:"0",
            message:message
        });

        FriendMessageDao.create(FriendMessage,function(error, friendMessage){
            if(err){
                res.json(500, {message: err.toString()});
                return;
            }
            if(!friendMessage){
                res.json(404, {message: "send fail"});
                return;
            }
            res.json(200,{message:"send successful"});

        });

    });

}

FriendsHandler.dealFriendMessage = function(req,res) {

    var friendId = req.param('friendId');
    console.log(friendId)
    var friendAccount = req.param('friendAccount');
    var friendHead = req.param('friendHead');

    var friends = {};
    friends._id = friendId;
    friends.account = friendAccount;
    friends.head = friendHead;

    var messageId = req.param('messageId');
    var status = req.param('status');// 1: agree ,2 :disagree

    if (status == "1") {

        AccessToken.userActionWithToken(token, res, function (user) {

            var userId = user._id;
            var me = {};
            me._id = user._id;
            me.account = user.account;
            me.head = user.head;

            FriendMessageDao.deal(messageId, status, function (error, friendMessage) {
                if (err) {
                    res.json(500, {message: err.toString()});
                    return;
                }
                if (!friendMessage) {
                    res.json(404, {message: "add fail"});
                    return;
                }

                FriendDao.addFriend(friendId, me, function (err, user) {
                    console.log(user);
                    if (err) {
                        res.json(500, {message: err.toString()});
                        return;
                    }
                    else if (!user) {
                        res.json(404, {message: "Not found."});
                        return;
                    } else {
                        FriendDao.addFriend(userId, friends, function (err, user2) {
                            if (err) {
                                res.json(500, {message: err.toString()});
                                return;
                            }
                            if (!user) {
                                res.json(404, {message: "Not found."});
                                return;
                            }
                            res.json(200, {message: "add successful", friendMessage: friendMessage});

                        })
                    }
                })
            });

        });

    } else if (status == "2") {


        FriendMessageDao.deal(messageId, status, function (error, friendMessage) {
            if (err) {
                res.json(500, {message: err.toString()});
                return;
            }
            if (!friendMessage) {
                res.json(404, {message: "refuse fail"});
                return;
            }

            var to = friendMessage.to;
            var from = friendMessage.from;

            friendMessage.from = to;
            friendMessage.to = from;

            FriendMessageDao.create(friendMessage,function(error, friendMessage2){
                if(err){
                    res.json(500, {message: err.toString()});
                    return;
                }
                if(!friendMessage){
                    res.json(404, {message: "refuse fail"});
                    return;
                }
                res.json(200, {message: "refuse successful", friendMessage: friendMessage});

            });



        });


    }

    FriendsHandler.getFriendMessage = function (req, res) {

        AccessToken.userActionWithToken(token, res, function (user) {
            var id = user.id;

            FriendMessageDao.getNeedList(id, function (err, fMlists) {
                if (err) {
                    res.json(500, {message: err.toString()});
                    return;
                }
                if (!fMlists) {
                    res.json(404, {message: "no message"});
                    return;

                }

                res.json(200, {fMlists: fMlists});

            });
        })


    }

    FriendsHandler.showAllFriends = function (req, res) {
        console.log("show all friend of user");

        var userId = req.param('userId');
        console.log(userId);

        UserDao.getUserById(userId, function (err, user) {
            if (err) {
                res.json(500, {message: err.toString()});
                return;
            }
            if (!user) {
                res.json(404, {message: "This user not exit"});
                return;

            }

            res.json(200, {friendList: user.friends, num: user.friends_count});

        })
    }


    FriendsHandler.addFriend = function (req, res) {
        console.log("add a friend");

        var friendId = req.param('friendId');//"551d7bbe1fb802ae1c438f15"//
        console.log(friendId)
        var friendAccount = req.param('friendAccount');//"bbb" //
        var friendHead = req.param('friendHead');//"/head/defaulthead.jpeg" //

        var friends = {};
        friends._id = friendId;
        friends.account = friendAccount;
        friends.head = friendHead;


        var userId = "551f50c59561511112bde212"; //req.session.user_id;
        var userAccount = "aaa"; //req.session.account;
        var userHead = "/head/defaulthead.jpeg"; //req.session.head;

        //var userId = req.session.user_id;//"551d7bb281e3449e1c1c6600"; //
        //var userAccount = req.session.account;//"aaa"; //
        //var userHead = req.session.head;//"/head/defaulthead.jpeg"; //

        var me = {};
        me._id = userId;
        me.account = userAccount;
        me.head = userHead;


        FriendDao.addFriend(friendId, me, function (err, user) {
            console.log(user);
            if (err) {
                res.json(500, {message: err.toString()});
                return;
            }
            else if (!user) {
                res.json(404, {message: "Not found."});
                return;
            } else {
                FriendDao.addFriend(userId, friends, function (err, user2) {
                    if (err) {
                        res.json(500, {message: err.toString()});
                        return;
                    }
                    if (!user) {
                        res.json(404, {message: "Not found."});
                        return;
                    }
                    res.json(200, {message: 'add friends success', user: user2});

                })
            }
        })
    };

    FriendsHandler.deleteFriend = function (req, res) {
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

        var userId = "551f50c59561511112bde212"; //req.session.user_id;
        var userAccount = "aaa"; //req.session.account;
        var userHead = "/head/defaulthead.jpeg"; //req.session.head;
        //
        //var userId = req.session.user_id;
        //var userAccount = req.session.account;
        //var userHead = req.session.head;
        var me = {}
        me._id = userId;
        me.account = userAccount;
        me.head = userHead;

        FriendDao.deleteFriend(friendId, me, function (err, user) {
            if (err) {
                res.json(500, {message: err.toString()});
                return;
            }
            else if (!user) {
                res.json(404, {message: "Not found1."});
                return;
            } else {
                FriendDao.deleteFriend(userId, friends, function (err, user2) {
                    if (err) {
                        res.json(500, {message: err.toString()});
                        return;
                    }
                    if (!user) {
                        res.json(404, {message: "Not found2."});
                        return;
                    }
                    res.json(200, {message: 'delete friends success', user: user2});

                })
            }
        })

    }

    FriendsHandler.searchFriends = function (req, res) {


        var pageNo = req.param('pageNo');
        var pageSize = req.param('pageSize');
        var queryStr = req.param('queryStr');//"b" //
        var userid = req.session.user_id;//"551d7bb281e3449e1c1c6600"//

        FriendDao.searchFriends(pageNo, pageSize, queryStr, function (err, users) {
            if (err) {
                res.json(500, {message: err.toString()});
                return;
            }
            if (!users) {
                res.json(200, {message: "Not found."});
                return;
            }

            res.json(200, {friendList: users});

        });

    }


    FriendsHandler.checkFriend = function (req, res) {
        FriendDao.check(userId, friendId, function (err, result) {

            var isFriend = false;

            if (err) {
                res.json(500, {message: err.toString()});
                return;

            }
            if (!result) {
                isFriend = false;
            } else
                isFriend = true;

            res.json(200, {isFriend: isFriend});

        });

    }


    FriendsHandler.recommend = function (req, res) {

    }

    FriendsHandler.adduser = function (req, res) {

        var username = 'ggg'
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
            if (err && err.length > 0) {
                res.json(500, {message: "Register Failed！"});
            } else {
                res.json(200, {message: "Register Successful！"});
            }

        });
    }

    function logTime() {
        var data = new Date().format('yyyy-MM-dd hh:mm:ss');
        console.log(data);
        return data;
    }
}
module.exports = FriendsHandler;