/**
 * Created by zhaiyuan on 3/29/15.
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new mongoose.Schema({
    username: { type: String, index: true },
    account: { type: String, unique: true },
    email: { type: String },
    password: { type: String },
    type: { type: Number },  //分为顾客和餐厅拥有者
    phone: { type: String},
    sex: { type: Number },
    head:{ type: String , default:'/head/defaulthead.jpeg' },
    tag:{ type: String},
    friends: [{
        _id: ObjectId,
        account : String,
        head: String
    }],
    flag:{ type: Boolean , default:false },


    friends_count: { type: Number, default: 0 }
    //date_count: { type: Number, default: 0 }

});

module.exports = schema;