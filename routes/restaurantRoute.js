/**
 * Created by liuhanxu on 15-3-20.
 */

var RestaurantHandler = require('../controller/restaurantHandler');
module.exports = function (app) {

    app.get('/service/restaurant/add',RestaurantHandler.addRestaurant);
    app.get('/service/restaurant/getRestByID',RestaurantHandler.getRestaurantByID);
    app.get('/service/restaurant/getRestListByName',RestaurantHandler.getRestaurantListByName);
    app.get('/service/restaurant/testRestaurantName',RestaurantHandler.testName);  //测试当前饭馆名称数据库有没有,如果没有就insert

    app.post('/service/restaurant/insert',RestaurantHandler.insertRestaurant);




};
