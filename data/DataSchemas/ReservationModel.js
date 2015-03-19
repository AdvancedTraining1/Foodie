/**
 * Created by liuhanxu on 15-3-19.
 */
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new mongoose.Schema({        //预约信息
    restaurantId: { type: String, index: true },
    userId: String,
    reservationTime: String,
    isChecked: Boolean   //餐厅是否已经放出已经预约座位
});

module.exports = schema;