/**
 * Created by cmm on 4/2/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    _id: String,
    head: String,
    account: String
});

module.exports = schema;