/**
 * Created by mengchi on 14-11-8.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;;


var ObjectId = mongoose.Schema.Types.ObjectId;

var BlogSchema = new Schema({
    title: { type: String, index: true },
    content:{ type: String },
    tag:{type:String},
    type:{ type:String },//type 1 publish, type 2 save to draft
    create_at: { type: String},
    update_at: { type: String},
    author: {
        id: String,
        account: String,
        head:String},

    like_count: { type: Number, default: 0 },
    collect_count:{ type: Number, default: 0 },
    comment_count: { type: Number, default: 0 }

});

module.exports = BlogSchema;