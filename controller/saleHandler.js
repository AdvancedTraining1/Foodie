/**
 * Created by zhangcan on 14-11-11.
 * wtf
 */
var mongoose = require('mongoose');
var SaleModel = require('../data').sale;
var SaleDao = require("../dao/SaleDao");
var UserDao = require("../dao/UserDao");
var SaleCommentModel = require('../data').CommentToBlog;
var SaleCommentDao = require("../dao/SaleCommentDao");
var SaleCollectModel = require('../data').CollectBlog;
var SaleCollectDao = require("../dao/SaleCollectDao");

var querystring = require('querystring'),
    formidable = require('formidable');

function SaleHandler(){

}

SaleHandler.getAll = function(req, res){
    SaleDao.getAll(1,100,function(err, sale){
        if(err)
        {
            res.json(500, {message: err.toString()});
            return;
        }
        res.json(sale);
    });
}

SaleHandler.getOne = function(req, res){
    var id = req.params.saleId;
    SaleDao.getOne(id,function(err, sale){
        if(err)
        {
            res.json(500, {message: err.toString()});
            return;
        }
        res.json(sale);
    });

//    SaleDao.getById(id,function(err,sale){
//        if(err)
//        {
//            res.json(500, {message: err.toString()});
//            return;
//        }
//        res.json(sale);
//    });
}

/*SaleHandler.getAllByLast = function(req,res){
    SaleDao.getAllByLast(function(err, sale){
        if(err)
        {
            res.json(500, {message: err.toString()});
            return;
        }
        if(!sale)
        {
            res.json(400, {message:"No Sale"});
            return;
        }
        res.json(sale);
    });
}*/

SaleHandler.getOwn = function(req, res){
    SaleDao.getOwn(req.params.authorId, function (err, sale){
        if(err)
        {
            res.json(500, {message: err.toString()});
            return;
        }
        res.json(sale);
    });
}

SaleHandler.listAll = function(req,res){
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');

    SaleDao.getAll(pageNo,pageSize,function (err1, sale) {
        SaleDao.getSaleNum(function(err2,num){
            if(!(err1 || err2)){
                res.json({root:sale,total:num});
            }
        });
    });
}

SaleHandler.edit = function(req, res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);//GET & POST
        console.log(params);

        var sale = params;
        sale.update_at = logTime();
        console.log(sale);

        SaleDao.edit(id,sale,function (err, sale) {
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("编辑成功！");
        });
    });
}

SaleHandler.create = function(req, res){
    req.setEncoding("utf-8");
    var postData = "";
    req.addListener("data", function(postDataChunk){
        postData += postDataChunk;
    });

    req.addListener("end",function(){
        console.log('post数据接收完毕');

        var params = querystring.parse(postData);//GET & POST
        console.log(params);
        var sale = params;
        sale.create_at = logTime();
        sale.update_at = logTime();

        //var sale = createSale()

        SaleDao.create(sale,function (err, sale) {
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("发布成功！");
        });
    });
}

SaleHandler.delete = function(req, res){
    //var idStr = req.params.ids.split(",");
    var idStr = ["01"];
    SaleDao.delete(idStr,function (err, sale) {
        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("删除成功！");
    });
}

SaleHandler.search = function(req, res){
    var keyword = "A"

    SaleDao.search(keyword, function(err, sale){
        if(err)
        {
            res.json(500, {message: err.toString()});
            return;
        }
        if(!sale)
        {
            res.json(404, "Not Found");
            return;
        }
        res.json(sale);
    })
}

SaleHandler.createSaleComment = function(req, res){

    req.setEncoding("utf-8");
    var postData = "";
    req.addListener("data", function(postDataChunk){
        postData += postDataChunk;
    });

    req.addListener("end",function(){
        var params = querystring.parse(postData);//GET & POST

        var content = params.content;
        var user_id = req.session.user_id;
        var account = req.session.account;
        var sale_id = params.blog_id;
        var time = logTime();

        console.log('数据接收完毕');
        //var sale = createSale()
        console.log("--------------"+sale_id);

        var saleComment = new SaleCommentModel({
            author: {
                id: user_id,
                account: account },
            content: content,
            //reply_id: reply_id,
            blog_id: sale_id,
            time:time
        });

        SaleDao.getOne(sale_id, function(err, sale){
            SaleCommentDao.create(saleComment, function(err, newSaleComment){
                if(err)
                {
                    res.json(500, {message: err.toString()});
                    return;
                }
                else
                {
                    var message = "save successful";
                    console.log(message);
                    var conditions = {_id: sale_id};
                    console.log(sale);
                    console.log(sale.commentNum);
                    var comment_count = sale.commentNum + 1;
                    var update = {$set: { commentNum: comment_count} }
                    var options = { upsert: true};
                    SaleDao.update(conditions, update, options, function (error, docs) {
                        if (error) {
                            console.log(error);
                            var message = "update failed";
                            res.json(500, {message: message, status:false});
                            return;
                        } else {
                            console.log("comment successful");
                            res.json(200, {message: "comment successful",status:true});
                        }
                    });
                }
            });
        });
    });
}

SaleHandler.getAllSaleComment = function(req , res){
//    var sale_id = req.params.saleId;
//    SaleCommentDao.getAll(sale_id, function(err,comments){
//        if(err)
//        {
//            res.json(500, {message: err.toString()});
//            return;
//        }
//        res.json(200, comments);
//
//    });
    console.log("hehehaha");
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var blog_id = req.param('saleId');
    console.log("+++++")
    SaleCommentDao.getAllCommentToBlog(pageNo,pageSize,blog_id,function(err,comments){
        SaleCommentDao.listCommentNum(blog_id,function(err2,num){
            if(err || err2){
                res.json(500, {message: err.toString()});
                return;

            }
            if (!comments) {
                res.json(404, {message: "Not found."});
                return;
            }
            res.json({root:comments,total:num});
        });

    })
}

SaleHandler.createSaleCollect = function(req, res){
    var sale_id = req.params.saleId;
    var user_id = req.session.user_id;

    /*var saleCollect = new SaleCollectModel({
        user: {
            account: req.session.account,
            head:""
        },
        blog_id: sale_id,
        user_id: user_id
    });*/


    SaleDao.getOne(sale_id, function(err, sale){
        console.log("find one");
        var saleCollect = new SaleCollectModel({
            user: {
                account: req.session.account,
                head:""
            },
            blog_id: sale_id,
            user_id: req.session.user_id
        });

        console.log("======"+saleCollect);
        SaleCollectDao.create(saleCollect,function (err,newCollectBlog){
            if (err) {
                var message = "save failed";
                res.json(500, {message: message});
                return;
            } else {
                var message = "save successful";
                console.log(message);
                var conditions = {_id: sale_id}
                console.log( sale.collectNum);
                var collect_count =sale.collectNum+1;
                var update = {$set: { collectNum:collect_count} }
                var options = { upsert: true};
                SaleDao.update(conditions, update, options, function (error,docs) {
                    if (error) {
                        console.log(error);
                        var message = "update failed";
                        res.json(500, {message: message,status:false});
                        return;
                    } else {
                        console.log("collection successful");
                        res.json(200, {message: "collection successful",status:true});
                    }
                });

            }
        })
    });
}

SaleHandler.cancelSaleCollection = function (req, res) {
    var sale_id = req.params.saleId;
    var user_id = req.session.user_id;
    var message = ""
    SaleDao.getOne(sale_id, function (err, sale) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!sale) {
            res.json(404, {message: "Not found."});
            return;
        }
        console.log("find one");

        var collect_count = sale.collectNum - 1;
        var update = {$set: { collectNum: collect_count} }
        var options = { upsert: true};
        SaleDao.update({_id: sale_id}, update, options, function (error) {
            if (error) {
                var message = "update failed";
                res.json(500, {message: message,status:false});
                return;
            } else {
                console.log("update successful");
                var conditions = {blog_id: sale_id, user_id: user_id};

                SaleCollectDao.delete(conditions, function (error) {
                    if (error) {
                        console.log("cancel fail!");
                        var message = "cancel fail!"
                        res.json(500, {message: message,status:false});
                        return;
                    } else {
                        console.log('cancel successful!');
                        var message = "cancel successful!"

                        res.json(200, {message: message,status:true});
                    }
                })

            }
        });

    });

}

SaleHandler.checkCollection=function (req, res) {
    console.log("check--------")
    var saleId = req.param('saleId');
    console.log(saleId);
    var userId = req.session.user_id;
    SaleCollectDao.check(userId,saleId,function (err1, collect) {
        console.log(collect.length);
        if(collect.length != 0){
            res.end("true");
        }
        else{
            res.send("false");
        }
    });
}

function logTime(){
    var data =new Date().format('yyyy-MM-dd hh:mm:ss');
    console.log(data);
    return data;
}

function createSale(){
    var sale = new SaleModel();
    sale.title = "SellingThings";
    sale.author = {_id:"01",head:"headPath",account:"idiot"};
    sale.content = "What`s the content";
    sale.create_at = new Date();
    sale.update_at = new Date();
    sale.collectNum = 5;
    sale.commentNum = 10;

    return sale;
}

function editSale(id){
    var sale = {};
    sale.title = "A little change on SellingThings";
    sale.author = {_id:"03",head:"headPath",account:"noob"};
    sale.content = "There`s no content";

    return sale;
}

module.exports = SaleHandler;