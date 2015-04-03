/**
 * Created by mengchi on 4/2/15.
 */
var friend = require('./../controller/friendsHandler');

module.exports = function (app) {

    app.get('/service/friend/listFriend/:userId', friend.showAllFriends);
    app.get('/service/friend/searchFriend',friend.searchFriends);
    app.get('/service/friend/add', friend.addFriend);
    app.get('/service/friend/delete', friend.deleteFriend);
    app.get('/service/friend/check', friend.checkFriend);
   // app.get('/service/friend/adduser', friend.adduser);

};
