/**
 * Created by liuhanxu on 15-3-19.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new mongoose.Schema({
    dishName: { type: String, index: true },
    description: String,
    photo: String,
    restaurantId: String,
    logTime: String,
    tableNumber: { type: Number, default: 0 }

});

module.exports = schema;


