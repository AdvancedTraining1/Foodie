/**
 * Created by cmm on 4/2/15.
 */

var moment = require('./../controller/momentHandler');
module.exports = function (app) {

    app.get('/service/moment/listAll', moment.listAll);//
    app.get('/service/moment/listOwn', moment.listByUser);//
    app.get('/service/moment/getCommentById', moment.getCommentById);//
    app.get('/service/moment/delete', moment.deleteMoment);//
    app.post('/service/moment/add', moment.addMoment);//
    app.post('/service/moment/addComment', moment.commentMoment);//
    app.post('/service/moment/upload', moment.upload);
};