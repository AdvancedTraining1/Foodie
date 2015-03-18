/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var AdvertisementSchema = require('../schemas/advertisement.js');

var Advertisement = mongoose.model('Advertisement',AdvertisementSchema);

module.exports = Advertisement;