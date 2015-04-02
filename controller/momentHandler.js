/**
 * Created by cmm on 4/2/15.
 */

//listAll
//listByUser
//getById
//deleteMoment
//addMoment
//commentMoment
//deleteComment
//likeMoment
//deleteLike




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
        MomentDao.getAllNum(function(err2,num){
            if(!(err1 || err2)){
                res.json({root:moment,total:num});
            }
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
        res.json({root:moment.commentList});
    });
};

//暂时有点问题
exports.addMoment = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe数据接收完毕');
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
        console.log(params);
        var moment = new MomentModel();
        moment = params;

        //特殊参数，数组形式，特殊处理，步骤和食材
        /*var mNum = params['mNum'];
        var sNum = params['sNum'];
        var material0 = [];
        var step0 = [];
        for (var i = 0; i < mNum; i++) {
            var mName = "material[" + i + "][materialName]";
            var mAmount = "material[" + i + "][amount]";
            material0[i] = {materialName: params[mName], amount: params[mAmount]};
        }
        for (var i = 0; i < sNum; i++) {
            var sPhote = "step[" + i + "][stepPhoto]";
            var sExplain = "step[" + i + "][stepExplain]";
            step0[i] = {stepNum: i + 1, stepExplain: params[sExplain], stepPhoto: params[sPhote]};
        }
        recipe.material = material0;
        recipe.step = step0;*/

        //几个默认值设置
        recipe.logTime = logTime();
        recipe.collectNum = 0;
        recipe.likeNum = 0;
        recipe.flag = true;

        //设置用户信息
        console.log("-------"+req.session);
        console.log("-------"+JSON.stringify(req.session));

        recipe.author = {
            _id : req.session.user_id,
            account : req.session.account,
            head : req.session.head
        };

        RecipeDao.create(recipe,function (err, recipes) {
            if(err){
                res.writeHead(500, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("发布菜谱出现内部错误！");
            }else {
                res.writeHead(200, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("create recipe success！");
            }
        });
    });
};

exports.deleteMoment = function(req,res){
    //var idStr = req.params.ids.split(",");
    var idStr = req.param('id');

    MomentDao.delete(idStr,function (err, recipe) {
        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("delete moment success！");
    });
};

exports.commentMoment = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe数据接收完毕');
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
        var comment = new MomentCommentModel();
        comment = params;
        comment.date = logTime();
        //设置用户信息
        comment.author = {
            _id : req.session.user_id,
            account : req.session.account,
            head : req.session.head
        };

        console.log(comment);

        MomentCommentDao.create(comment,function (err, recipes) {
            if(err){
                res.writeHead(500, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("评论菜谱出现内部错误！");
            }else {
                MomentDao.updateCommentNum(comment.replyId,function(err1,recNew){
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
};

exports.deleteComment = function (req,res) {
    var commentId = req.param('commentId');
    var momentId = req.param('momentId');

    MomentDao.deleteComment(commentId,momentId,function(err,moment){
        if(!err1){
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("delete success！");
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