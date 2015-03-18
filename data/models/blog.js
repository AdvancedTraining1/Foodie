/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var BlogSchema = require('../schemas/blog.js');

var Blog = mongoose.model('Blog',BlogSchema);

module.exports = Blog;