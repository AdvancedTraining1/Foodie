/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment.js');

var Comment = mongoose.model('Blog',CommentSchema);

module.exports = Comment;
