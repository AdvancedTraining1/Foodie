/**
 * Edit by huhao on 15-4-4
 */

var SeatHandler = require('../controller/SeatHandler');
module.exports = function (app) {

    app.post('/service/seat/add',SeatHandler.add);
    app.get('/service/seat/getseatnum',SeatHandler.getSeatNum);
    app.post('/service/seat/setseatnum',SeatHandler.setSeatNum);
    app.get('/service/seat/getPeopleNum',SeatHandler.getPeopleNum);
    app.get('/service/seat/insertPeople',SeatHandler.insertPeople);
    app.get('/service/seat/deletePeople',SeatHandler.deletePeople);
    app.get('/service/seat/deleteById',SeatHandler.deleteById);
    app.get('/service/seat/getList',SeatHandler.getByRestaurantId);
    app.get('/service/seat/test',SeatHandler.testdata);
    /*
     deleteDishById
     app.post('/service/userinfo/isLogin',UserinfoHandler.isLogin);
     app.get('/service/userinfo/logout',UserinfoHandler.logout);

     app.post('/showuserinfo',UserinfoHandler.viewUserinfo);*/
    // app.post('/service/userinfo/logout');

    //http://localhost:3000/service/dish/create?a=123&&b=123&&c=2131

};