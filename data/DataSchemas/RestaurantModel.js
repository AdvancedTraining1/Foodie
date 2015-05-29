/**
 * Created by liuhanxu on 15-3-19.
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new mongoose.Schema({
    restaurantName: { type: String, index: true },
    description: String,
    cuisine: String,
    address: String,
    phone: String,
    photo: String,
    logTime: String,
    ownerId: String,
    tableNumber: { type: Number, default: 0 },
    tableRemain: { type: Number, default: 0},
    dishList:[mongoose.Schema.Types.ObjectId]


});

module.exports = schema;