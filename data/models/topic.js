/**
 * Created by mengchi on 14-10-17.
 */

var mongoose = require('mongoose');
var TopicSchema = require('../schemas/topic.js');

var Topic = mongoose.model('Topic',TopicSchema);

module.exports = Topic;
