/**
 * Created by zhaiyuan on 3/29/15.
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new mongoose.Schema({
    //userId: { type: String },
    author:{
        _id:String,
        account:String,
        head:String
    },
    //phone: { type: String },
    //restaurantId: { type: String },
    //dateTitle: { type: String },
    dateContent: { type: String },//restaurant address
    dateTime: { type: String },   //date time of the date
    logTime: { type: String },  //publish time of the date
    dateUsers: [{
        _id: String,
        account : String,
        head: String,
        status:{ type:String, default:0}
    }],

    dateUsers_count: { type: Number, default: 0 }
    //dateStatus: { type: Number, default: 1 }     //1 is on or 0 is cancel

});

module.exports = schema;