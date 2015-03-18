/**
 * chenmm
 * 2014/11/01
 * 菜谱数据类型
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    recipeName: String,
    description: String,
    photo: String,
    author: {
        _id: String,
        head: String,
        account: String },
    material: [{
        materialName: String,
        amount: String
    }],
    difficult: String,
    cookTime: String,
    step: [{
        stepNum: String,
        stepExplain: String,
        stepPhoto: String
    }],
    logTime: String,
    collectNum: Number,
    commentNum: Number,
    productNum: Number,
    flag: Boolean
});

//mongoose.model('Recipe', schema);
module.exports = schema;
