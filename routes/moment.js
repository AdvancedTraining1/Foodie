/**
 * Created by cmm on 4/2/15.
 */

var moment = require('./../controller/momentHandler');
module.exports = function (app) {

    app.get('/service/moment/listAll', moment.listAll);//
    app.get('/service/recipe/listOwn', moment.listByUser);//
    app.get('/service/recipe/getCommentById', moment.getCommentById);//
    app.get('/service/recipe/delete', moment.deleteMoment);//
    app.post('/service/recipe/add', moment.addMoment);//
    app.post('/service/recipe/addComment', moment.commentMoment);//
    app.post('/service/recipe/upload', moment.upload);
};