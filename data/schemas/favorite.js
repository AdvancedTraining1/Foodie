/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var FavoriteSchema = new mongoose.Schema({
    user_id: { type: ObjectId },
    type:{ type:Number },
    add_at: { type: Date, default: Date.now },
    recipe:{ type: ObjectId },
    Blog:{ type: ObjectId }

});

module.exports = FavoriteSchema;