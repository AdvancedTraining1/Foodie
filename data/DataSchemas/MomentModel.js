/**
 * Created by cmm on 4/2/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    author: {
        _id: String,
        head: String,
        account: String },
    picture:String,
    content:String,
    date: String,
    position: String,
    likeNum: Number,
    showComment:[],
    likeList:[
        {
            _id: String,
            head: String,
            account: String
        }
    ],
    commentList:[mongoose.Schema.Types.ObjectId],
    commentNum: Number,
    flag: Boolean
});

module.exports = schema;