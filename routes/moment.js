/**
 * Created by cmm on 4/2/15.
 */

var moment = require('./../controller/momentHandler');
module.exports = function (app) {

    app.get('/service/moment/listAll', moment.listAll);//
    app.get('/service/moment/listOwn', moment.listByUser);//
    app.get('/service/moment/getCommentById', moment.getCommentById);//
    app.post('/service/moment/addMoment', moment.addMoment);//
    app.get('/service/moment/deleteMoment', moment.deleteMoment);
    app.post('/service/moment/addComment', moment.commentMoment);//
    app.get('/service/moment/deleteComment', moment.deleteComment);//
    app.post('/service/moment/addLike', moment.likeMoment);//
    app.post('/service/moment/upload', moment.upload);
};