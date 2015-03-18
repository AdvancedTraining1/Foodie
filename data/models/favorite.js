/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var FavoriteSchema = require('../schemas/favorite.js');

var Favorite = mongoose.model('Favorite',FavoriteSchema);

module.exports = Favorite;

