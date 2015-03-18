/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var MaterialsSchema = require('../schemas/materials.js');

var Materials = mongoose.model('Materials',MaterialsSchema);

module.exports = Materials;
