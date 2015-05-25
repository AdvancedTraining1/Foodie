/**
 * Created by cmm on 4/2/15.
 */
var MomentDao = require("../dao/MomentDao"),
    MomentCommentDao = require("../dao/MomentCommentDao"),
    UserDao = require("../dao/UserDao"),
    MomentModel = require("./../data").Moment,
    MomentCommentModel = require("./../data").MomentComment,
    querystring = require('querystring'),
    formidable = require('formidable'),
    AccessToken = require("../auth/ControllerAccessToken.js"),
    fs = require('fs'),
    url = require('url'),
    config=require("../util/config");

exports.listAll = function(req,res){
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');

    MomentDao.getAll(pageNo,pageSize,function (err1, moment) {
        moment.forEach(function(file) {
            file.commentNum = 3;
            var commentList = file.commentList;
            MomentCommentDao.getByIdList(commentList,function(err2,comment){
                if(!err2){
                    file.showComment.push(comment);
                }
            });
        });
        MomentDao.getAllNum(function(err3,num){
            if(!err3){
                res.json({root:moment,total:num});
            }
        });
    });
};

exports.listByUser = function(req,res){
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var token = req.param('token');
    console.log("----------"+token);
    var authorId = req.param('authorId');

    AccessToken.userActionWithToken(token, res, function (user) {
        if (!pageNo)
            return res.status(400).end("pageNo missing.");
        if (!pageSize)
            return res.status(400).end("pageSize missing.");

        MomentDao.getByUserId(pageNo,pageSize,user._id,function (err1, moment) {
            MomentDao.getNumByUserId(user._id,function(err2,num){
                if(!(err1 || err2)){
                    res.json({root:moment,total:num});
                }
            });
        });
    });
};

exports.getCommentById = function(req,res){
    var id = req.param('id');
    MomentDao.getById(id,function (err1, moment) {
        var commentList = moment.commentList;
        if(!err1){
            MomentCommentDao.getByIdList(commentList,function(err2,comment){
                if(!err2){
                    res.json({root:comment,total:commentList.length});
                }
            });
        }
    });
};

//暂时有点问题
exports.addMoment = function(req,res){
    //console.log("0:"+req.body.content.name);
    req.setEncoding('utf-8');
    var postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
    // 数据块接收中
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
        console.log(params["token"]);
        AccessToken.userActionWithToken(params["token"], res, function (user) {
            var moment = new MomentModel({
                //_id:"551ff89554177cfd188158e9",
                author: {
                    _id: user._id,
                    head: user.head,
                    account: user.account
                },
                picture: params["picture"],
                content: params.content,
                location:params.location,
                date: logTime(),
                likeNum: 0,
                showComment: [],
                likeList: [],
                commentList: [],
                commentNum: 0,
                flag: true
            });

            MomentDao.create(moment, function (err, moments) {
                if (err) {
                    res.writeHead(500, {
                        "Content-Type": "text/plain;charset=utf-8"
                    });
                    res.end("发布moment出现内部错误！");
                } else {
                    res.writeHead(200, {
                        "Content-Type": "text/plain;charset=utf-8"
                    });
                    res.end("create moment success！");
                }
            });
        });
    });


};

exports.deleteMoment = function(req,res){
    var id = req.param('id');

    MomentDao.delete(id,function (err, moment) {
        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("delete moment success！");
    });
};

exports.commentMoment = function(req,res){

    req.setEncoding('utf-8');
    var postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
    // 数据块接收中
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
        console.log(params["token"]);

        AccessToken.userActionWithToken(params["token"], res, function (user) {
            if (!params.content)
                return res.status(400).end("content missing.");

            var comment = new MomentCommentModel({
                //_id:"551feb07c0d9b51a11266c31",
                author: {
                    _id: user._id,
                    head: user.head,
                    account: user.account },
                content:params.content,
                date: logTime(),
                momentId:params.momentId,
                reply: {
                    _id:params["reply._id"],
                    account:params["reply.account"]},
                flag: true
            });
            MomentCommentDao.create(comment,function (err, momentComment) {
                console.log(comment._id);
                if(err){
                    res.writeHead(500, {
                        "Content-Type": "text/plain;charset=utf-8"
                    });
                    res.end("评论朋友圈出现内部错误！");
                }else {
                    MomentDao.updateComment(comment.momentId,momentComment._id,function(err1,moment){
                        if(!err1){
                            res.writeHead(200, {
                                "Content-Type": "text/plain;charset=utf-8"
                            });
                            res.end("comment success！");
                        }
                    });
                }
            });
        });
    });



};

exports.deleteComment = function (req,res) {
    var commentId = req.param('commentId');
    var momentId = req.param('momentId');
    MomentDao.deleteComment(commentId,momentId,function(err,moment){
        if(!err){
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("delete comment success！");
        }
    });
};

exports.likeMoment = function (req,res) {
    req.setEncoding('utf-8');
    var postData = ""; //POST & GET ： name=zzl&email=zzl@sina.com
    // 数据块接收中
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('数据接收完毕');
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
        console.log(params["token"]);
        console.log(params["momentId"]);

        var momentId = params["momentId"];
        AccessToken.userActionWithToken(params["token"], res, function (user) {
            var like = {
                _id: user._id,
                head: user.head,
                account: user.account
            };
            MomentDao.checkLike(momentId,user._id,function(err1,moment){
                if(err1){
                    console.log("wrong find function");
                }else if(moment){
                    console.log("already liked");
                }else{
                    MomentDao.likeMoment(momentId,like,function(err,moment){
                        if(!err){
                            res.writeHead(200, {
                                "Content-Type": "text/plain;charset=utf-8"
                            });
                            res.end("like moment success！");
                        }
                    });
                }
            });
        });
    });


};

exports.upload = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./../upload/temp/";//改变临时目录
    console.log("~~~~~~~~~~~~~~  1"+form.uploadDir);
    form.parse(req, function(error, fields, files){
        console.log("~~~~~~~~~~~~~~  2");
        for(var key in files){
            console.log("~~~~~~~~~~~~~~  3");
            var file = files[key];

            console.log(file.type);
            var fName = (new Date()).getTime();

            switch (file.type){
                case "image/jpeg":
                    fName = fName + ".jpg";
                    break;
                case "image/png":
                    fName = fName + ".png";
                    break;
                default :
                    fName =fName + ".png";
                    break;
            }
            console.log(file.size);
            var uploadDir = "./../public/upload/" + fName;
            fs.rename(file.path, uploadDir, function(err) {
                if (err) {
                    res.write(err+"\n");
                    res.end();
                }
                res.end("upload/"+fName);
            });
        }
    });
};

Date.prototype.format =function(format)
{
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
        (this.getFullYear()+"").substr(4- RegExp.$1.length));
    for(var k in o)if(new RegExp("("+ k +")").test(format))
        format = format.replace(RegExp.$1,
            RegExp.$1.length==1? o[k] :
                ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
};

function logTime(){
    var data =new Date().format('yyyy-MM-dd hh:mm:ss');
    console.log(data);
    return data;
}