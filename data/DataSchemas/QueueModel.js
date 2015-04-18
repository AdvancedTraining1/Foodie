/*
 * Created by liuhanxu on 15-3-19.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new mongoose.Schema({        //排队等号信息
    restaurantId: { type: String, index: true },
    userId: String,
    queueNumber: Number,
    isChecked: Boolean   //餐厅是否已经被叫号进入餐厅
});

module.exports = schema;