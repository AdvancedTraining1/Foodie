/**
 * Created by mengchi on 14-11-14.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var TopicUploadLikeSchema = new Schema({
    user: {
        account: String,
        head: String
    },
    create_at: { type: Date, default: Date.now },
    topicUpload_id: { type: ObjectId },
    user_id: { type: ObjectId }
});

module.exports = TopicUploadLikeSchema;
