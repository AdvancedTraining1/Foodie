/**
 * Created by mengchi on 5/15/15.
 */
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    from: {
        _id: String,
        head: String,
        account: String },
    to: {
        _id: String,
        head: String,
        account: String },
    date: String,
    message:String,

    status:String

});

module.exports = schema;