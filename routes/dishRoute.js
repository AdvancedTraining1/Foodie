/**
 * Created by liuhanxu on 15-3-x20.
 */

var DishHandler = require('../controller/dishHandler');
module.exports = function (app) {

    app.get('/service/dish/create',DishHandler.addDish);
    /*
    app.post('/service/userinfo/isLogin',UserinfoHandler.isLogin);
    app.get('/service/userinfo/logout',UserinfoHandler.logout);

    app.post('/showuserinfo',UserinfoHandler.viewUserinfo);*/
   // app.post('/service/userinfo/logout');

     //http://localhost:3000/service/dish/create?a=123&&b=123&&c=2131

};