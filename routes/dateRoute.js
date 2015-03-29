/**
 * Created by zhaiyuan on 3/29/15.
 */

var DateHandler = require('../controller/dateHandler');
module.exports = function (app) {
    app.get('/service/date/look',DateHandler.lookDate);
    app.get('/service/date/create',DateHandler.createDate);
    app.get('/service/date/update',DateHandler.updateDate);
    app.get('/service/date/delete',DateHandler.deleteDate);

    app.get('/service/date/join',DateHandler.joinDate);
};