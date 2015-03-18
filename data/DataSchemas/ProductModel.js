/**
 * chenmm
 * 2014/11/01
 * 作品数据类型
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    author:{
        _id: String,
        head: String,
        account: String
    },
    logTime: String,
    picture:String,
    content: String,
    /*likeNum: Number,
    likeList:[{
        _id: String,
        head: String,
        account: String
    }],*/
    recipeId:String
});

//mongoose.model('Product', schema);
module.exports = schema;
