/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var SeasonFoodSchema = require('../schemas/seasonFood.js');

var SeasonFood = mongoose.model('Recipe',SeasonFoodSchema);

module.exports = SeasonFood;
