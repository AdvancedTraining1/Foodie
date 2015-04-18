/**
 * Edit by huhao on 15-4-18
 */

var PushMsgHandler = require('../controller/pushMsgHandler');
var DishHandler = require('../controller/dishHandler');

module.exports = function (app) {

    app.post('/service/pushmsg',PushMsgHandler.pushMsg);

};