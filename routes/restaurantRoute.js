/**
 * Created by liuhanxu on 15-3-20.
 */

var RestaurantHandler = require('../controller/restaurantHandler');
module.exports = function (app) {

    app.get('/service/restaurant/create',RestaurantHandler.addRestaurant);
};