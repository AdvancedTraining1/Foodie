/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var UserSchema = new mongoose.Schema({
    username: { type: String, index: true },
    account: { type: String, unique: true },
    email: { type: String },
    password: { type: String },
    type: { type: Number },
    phone: { type: String},
    sex: { type: Number },
    head:{ type: String , default:'/head/defaulthead.jpeg' },
    friends: [{
        _id: ObjectId,
        account : String,
        head: String
    }],
    fans:[{
        _id: ObjectId,
        account : String,
        head: String
    }],

    recipe_count: { type: Number, default: 0 },
    topic_count: { type: Number, default: 0 },
    blog_count: { type: Number, default: 0 },
    comment_count: { type: Number, default: 0 },
    friends_count: { type: Number, default: 0 },
    fans_count: { type: Number, default: 0 },

});

module.exports = UserSchema;