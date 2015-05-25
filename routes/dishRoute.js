/**
 * Created by liuhanxu on 15-3-20.
 * Edit by huhao on 15-4-4
 */

var DishHandler = require('../controller/dishHandler');
module.exports = function (app) {

    app.post('/service/dish/create',DishHandler.addDish);
    app.get('/service/dish/getalldishs',DishHandler.getAllDishs);
    app.get('/service/dish/getDishesNum',DishHandler.getDishesNum);
    app.get('/service/dish/getRestaurantDishes',DishHandler.getByRestaurantId);
    app.get('/service/dish/getRestaurantDishesNum',DishHandler.getRestaurantDishesNum);
    app.get('/service/dish/deleteDishById',DishHandler.deleteDishById);
    app.get('/service/dish/deleteDishByName',DishHandler.deleteDishByName);
    app.get('/service/dish/updatePraiseNum',DishHandler.updatePraiseNum);
    app.get('/service/dish/updateLoverNum',DishHandler.updateLoverNum);
    app.post('/service/dish/updateTotalStarsNum',DishHandler.updateTotalStarsNum);
    /*
     deleteDishById
    app.post('/service/userinfo/isLogin',UserinfoHandler.isLogin);
    app.get('/service/userinfo/logout',UserinfoHandler.logout);

    app.post('/showuserinfo',UserinfoHandler.viewUserinfo);*/
   // app.post('/service/userinfo/logout');

     //http://localhost:3000/service/dish/create?a=123&&b=123&&c=2131

};