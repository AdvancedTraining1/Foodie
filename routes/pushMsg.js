/**
 * Edit by huhao on 15-4-18
 */

var PushMsgHandler = require('../controller/pushMsgHandler');
var PushMsgHandler2 =  require('../controller/pushMsgHandler2');
var DishHandler = require('../controller/dishHandler');

module.exports = function (app) {

    app.post('/service/pushmsg',PushMsgHandler.pushMsg);
    app.get('/service/pushmsg2',PushMsgHandler2.pushMsg);

};
