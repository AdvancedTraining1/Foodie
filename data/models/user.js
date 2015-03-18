/**
 * Created by mengchi on 14-10-17.
 */


var mongoose = require('mongoose');
var UserSchema = require('../schemas/user.js');

var User = mongoose.model('User',UserSchema);

module.exports = User;
