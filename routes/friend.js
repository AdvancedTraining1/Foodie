/**
 * Created by mengchi on 5/18/15.
 */
var friend = require('./../controller/friendsHandler');

module.exports = function (app) {

    app.post('/service/friend/saveFriendMessage',friend.saveFriendMessage);
    app.get('/service/friend/getFriendMessage',friend.getFriendMessage);
    app.post('/service/friend/dealFriendMessage',friend.dealFriendMessage);

    app.get('/service/friend/listFriend', friend.showAllFriends);
    app.get('/service/friend/myId', friend.getUserId);
    app.post('/service/friend/searchNewFriend',friend.searchNewFriends);
    app.post('/service/friend/add', friend.addFriend);
    app.post('/service/friend/delete', friend.deleteFriend);
    app.get('/service/friend/check', friend.checkFriend);
    // app.get('/service/friend/adduser', friend.adduser);

};