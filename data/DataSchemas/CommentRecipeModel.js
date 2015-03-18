/**
 * chenmm
 * 2014/11/01
 * 评论数据类型
 */

var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
    author: {
        _id: String,
        account: String,
        head: String},
    logTime: String,
    content: String,
    replyId: String,
    replyUserId: String

});

//mongoose.model('Comments', CommentSchema);
module.exports = CommentSchema;
