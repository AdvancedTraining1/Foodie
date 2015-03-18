/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var BlogSchema = new mongoose.Schema({
    title: { type: String, index: true },
    content:{ type: String},
    type:{type:String},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    author: {
        id: ObjectId,
        account: String },

    praiseList:{
        id: ObjectId,
        account: String
    },

    comment_list: { type:ObjectId},

    praise_count: { type: Number, default: 0 },
    favorite_count:{ type: Number, default: 0 },
    comment_count: { type: Number, default: 0 }

});

module.exports = BlogSchema;