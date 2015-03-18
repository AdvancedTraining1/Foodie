/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var TopicSchema = new mongoose.Schema({
    topicName:{ type: String, unique: true },
    content: String,
    author: {
        id: String,
        account: String },
    time: { type: String },

    upload_count: { type: Number, default: 0 }
});
module.exports = TopicSchema;