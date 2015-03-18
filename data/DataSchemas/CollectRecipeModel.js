/**
 * chenmm
 * 2014/11/01
 * 收藏数据类型
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;;

var schema = new Schema({
    userId:String,
    logTime: String,
    recipeId: String
});

//mongoose.model('Collect', schema);
module.exports = schema;
