/**
 * Created by cmm on 4/2/15.
 */
var MomentDao = require("../dao/MomentDao"),
    MomentCommentDao = require("../dao/MomentCommentDao"),
    UserDao = require("../dao/UserDao"),
    MomentModel = require("./../data").Moment,
    MomentCommentModel = require("./../data").MomentComment,
    querystring = require('querystring'),
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
                MomentDao.getAllNum(function(err2,num){
                    if(!(err1 || err2)){
                        res.json({root:moment,total:num});
                    }
                });
            });
        });
    });
};

exports.listByUser = function(req,res){
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var authorId = req.param('authorId');

    MomentDao.getByUserId(pageNo,pageSize,authorId,function (err1, moment) {
        MomentDao.getNumByUserId(authorId,function(err2,num){
            if(!(err1 || err2)){
                res.json({root:moment,total:num});
            }
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
    var user = {
        _id: "111",
        head: "3.jpg",
        account: "cmm1"
    };
    var moment = new MomentModel({
        _id:"551ff89554177cfd188158e9",
        author: {
            _id: user._id,
            head: user.head,
            account: user.account },
        pictures:req.body.pictures,
        content:req.body.content,
        date: logTime(),
        likeNum: 0,
        showComment:[],
        likeList:[],
        commentList:[],
        commentNum: 0,
        flag: true
    });

    MomentDao.create(moment,function (err, moments){
        if(err){
            res.writeHead(500, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("发布moment出现内部错误！");
        }else {
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("create moment success！");
        }
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
    var user = {
        _id: "111",
        head: "3.jpg",
        account: "cmm1"
    };
    var comment = new MomentCommentModel({
        _id:"551feb07c0d9b51a11266c31",
        author: {
            _id: user._id,
            head: user.head,
            account: user.account },
        content:req.body.content,
        date: logTime(),
        momentId:req.body.momentId,
        reply: {
            _id:req.body.reply.id,
            account:req.body.reply.account},
        flag: true
    });
    MomentCommentDao.create(comment,function (err, momentComment) {
        console.log(comment._id);
        if(err){
            res.writeHead(500, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("评论菜谱出现内部错误！");
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
    var momentId = req.body.momentId;
    var user = {
        _id: "111",
        head: "3.jpg",
        account: "cmm1"
    };
    var like = {
        _id: user._id,
        head: user.head,
        account: user.account
    };
    MomentDao.likeMoment(momentId,like,function(err,moment){
        if(!err){
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("like moment success！");
        }
    });
};

exports.upload = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./../upload/temp/";//改变临时目录
    form.parse(req, function(error, fields, files){
        for(var key in files){
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