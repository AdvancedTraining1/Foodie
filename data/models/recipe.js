/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var RecipeSchema = require('../schemas/recipe.js');

var Recipe = mongoose.model('Recipe',RecipeSchema);

module.exports = Recipe;
