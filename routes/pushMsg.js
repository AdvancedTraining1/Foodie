/**
 * Edit by huhao on 15-4-18
 */

var PushMsgHandler = require('../controller/pushMsgHandler');
PushMsgHandler2 =  require('../controller/pushMsgHandler2');
var DishHandler = require('../controller/dishHandler');

module.exports = function (app) {

    app.post('/service/pushmsg',PushMsgHandler.pushMsg);
    app.post('/service/pushmsg2',PushMsgHandler2.pushMsg);

};