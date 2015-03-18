/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var BlogCommentSchema = new mongoose.Schema({
    author: {
        id: ObjectId,
        account: String },
    time: { type: Date, default: Date.now },
    content: String,
    replyid: { type: ObjectId }
});
module.exports = BlogCommentSchema;