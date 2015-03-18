/**
 * Created by mengchi on 14-11-13.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var BlogLikeSchema = new Schema({
    user: {
        account: String,
        head: String
    },
    create_at: { type: Date, default: Date.now },
    blog_id: { type: ObjectId },
    user_id: { type: ObjectId }
});

module.exports = BlogLikeSchema;
