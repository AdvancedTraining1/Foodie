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
    content:String,
    date: String,
    momentId:String,
    reply: {
        _id:String,
        account:String},
    flag: Boolean
});

module.exports = schema;