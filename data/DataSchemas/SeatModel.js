/**
 * Edit by huhao on 15-4-4
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new mongoose.Schema({
    restaurantName: { type: String, index: true},
    restaurantId: String,
    seatsNum: {type: Number,default: 0},
    peopleNum: {type: Number, default: 0},
    peopleList:[
        {
            _id: String,
            name: String
        }
    ]
});

module.exports = schema;


