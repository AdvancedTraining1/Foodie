/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var MaterialsSchema = new mongoose.Schema({
    name: { type: String, index: true },
    description:{ type: String},
    picture:{ type: String},
    type:{ type:Number },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now }

});

module.exports = MaterialsSchema;