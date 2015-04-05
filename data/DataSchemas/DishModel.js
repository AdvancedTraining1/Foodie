/**
 * Created by liuhanxu on 15-3-19.
 * Edit by huhao on 15-4-4
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new mongoose.Schema({
    dishName: { type: String, index: true},
    description: String,
    photo: { type: String, default:'/head/defaulthead.jpeg'},
    restaurantId: String,
    logTime: String,
    praiseNum: {type: Number,default: 0},
    loverNum: {type: Number, default: 0},
    totalStars: {type: Number, default: 0}

});

module.exports = schema;


