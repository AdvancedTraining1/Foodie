/**
 * Created by zhangcan on 14-11-11.
 * Today is my day
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    title: String,
    author: {
        _id: String,
        head: String,
        account: String },
    content: String,

    create_at: { type: String},
    update_at: { type: String},

    collectNum: { type: Number, default: 0 },
    commentNum: { type: Number, default: 0 }
});

module.exports = schema;