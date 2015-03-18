/**
 * Created by mengchi on 14-11-13.
 */
var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var CommentToBlogSchema = new mongoose.Schema({
    author: {
        id: ObjectId,
        account: String,
        head:String
    },
    time: { type: String },
    content: String,
    reply_id: { type: ObjectId },
    blog_id:{type:ObjectId}

});

module.exports = CommentToBlogSchema;
