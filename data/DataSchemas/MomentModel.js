/**
 * Created by cmm on 4/2/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var MomentComment = require("./../data").MomentCommnet;
var MomentLike = require("./../data").MomentLike;

var schema = new Schema({
    author: {
        _id: String,
        head: String,
        account: String },
    pictures:[{path:String}],
    content:String,
    date: String,
    likeNum: Number,
    likeList:[MomentLike],
    commentList:[MomentComment],
    commentNum: Number,
    flag: Boolean
});

module.exports = schema;