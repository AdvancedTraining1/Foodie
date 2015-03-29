/**
 * Created by zhaiyuan on 3/29/15.
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new mongoose.Schema({
    userId: { type: String },
    //phone: { type: String },
    restaurantId: { type: String },
    dateTitle: { type: String },
    dateContent: { type: String },
    dateTime: { type: Date },   //date time of the date
    logTime: { type: Date },  //publish time of the date
    dateUsers: [{
        _id: ObjectId,
        account : String,
        head: String
    }],

    dateUsers_count: { type: Number, default: 0 },
    dateStatus: { type: Number, default: 1 }     //1 is on or 0 is cancel

});

module.exports = schema;