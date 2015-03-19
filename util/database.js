/**
 * Created by zhaiyuan on 14-11-01.
 */

var mongoose = require('mongoose');

var dbURL = 'mongodb://localhost/test';

mongoose.connect(dbURL);
// reference to the database connection 为这个连接创建一个引用
var db = mongoose.connection;

// expose to modules that require database.js 把这个引用暴露给引用 database 模块的其他模块
module.exports = db;
