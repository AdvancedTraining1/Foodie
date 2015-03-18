/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var TopicSchema = new mongoose.Schema({
    topicName:{ type: String, unique: true },
    content: String,
    author: {
        id: ObjectId,
        account: String },
    time: { type: Date, default: Date.now },

    upload: {
        author: {
            id: ObjectId,
            account: String },
        picture : String,
        upload_time: { type: Date, default: Date.now },
        like_count: { type: Number, default: 0 }
    },

    upload_count: { type: Number, default: 0 }
});
module.exports = TopicSchema;