/*
 这个JS文件是用来操作SCHEMA数据模型的
 用来生成具体的model
 看起来很好用的样子，不用每次都去model文件夹里面再弄文件
 调用下面的代码可以直接在数据库里面生成model
 * */
var mongoose = require('mongoose');
var db = require('../util/database');
//读schema文件
var fs = require('fs');
//监听事件
db.on('error', function(err){
    console.log('connect to db error!',err);
    process.exit(1);
});
db.once('open', function () {
    console.log("connect!!!");
});
//替换名字来完成转换model
var models_path = __dirname + '/../data/DataSchemas'
fs.readdirSync(models_path).forEach(function (file) {
    var schema = require(models_path + '/' + file);
    var modelName = file.replace('Model.js', '');
    exports[modelName] = mongoose.model(modelName,schema);
});