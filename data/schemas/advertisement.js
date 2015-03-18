/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var AdvertisementSchema = new mongoose.Schema({
    author: {
        id: ObjectId,
        account: String },
    description:{ type: String },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
    link:{ type: String }


});

module.exports = AdvertisementSchema;