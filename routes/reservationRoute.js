/**
 * Created by liuhanxu on 15-3-20.
 */
var ReservationHandler = require('../controller/reservationHandler');
module.exports = function (app) {

    app.get('/testinterface',function(req,res){
        res.render('testuserinfo');
    });
    app.post('/service/userinfo/isLogin',UserinfoHandler.isLogin);
    app.get('/service/userinfo/logout',UserinfoHandler.logout);

    app.post('/showuserinfo',UserinfoHandler.viewUserinfo);

};