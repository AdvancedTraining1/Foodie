/**
 * Created by zhaiyuan on 3/29/15.
 */

var DateHandler = require('../controller/dateHandler');
module.exports = function (app) {
    app.get('/service/date/look',DateHandler.lookDate);
    app.post('/service/date/create',DateHandler.createDate);
    app.post('/service/date/select',DateHandler.selectFriend);

    app.get('/service/date/update',DateHandler.updateDate);//if or not
    app.get('/service/date/delete',DateHandler.deleteDate);

    app.get('/service/date/join',DateHandler.joinDate);
};