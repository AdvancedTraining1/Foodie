/*
 * chenmm
 * 2014/10/31
 * 菜谱Controller
 */

var RecipeDao = require("../dao/RecipeDao"),
    CommentRecipeDao = require("../dao/CommentRecipeDao"),
    CollectDao = require("../dao/CollectDao"),
    ProductDao = require("../dao/ProductDao"),
    UserDao = require("../dao/UserDao"),
    RecipeModel = require("./../data").Recipe,
    CommentModel = require("./../data").CommentRecipe,
    ProductModel = require("./../data").Product,
    CollectModel = require("./../data").CollectRecipe,
    querystring = require('querystring'),
    formidable = require('formidable'),
    fs = require('fs'),
    url = require('url'),
    config=require("../util/config");

exports.a = function(req,res){
    res.redirect("../views/addRecipe.html");
}

exports.listOwn = function(req,res){
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var authorId = req.param('authorId');

    RecipeDao.getOwn(pageNo,pageSize,authorId,function (err1, recipe) {
        RecipeDao.getOwnNum(authorId,function(err2,num){
            if(!(err1 || err2)){
                res.json({root:recipe,total:num});
            }
        });
    });
};

exports.modify = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe-modify数据接收完毕');

        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}

        var updateStr = modifyRecipe(params);

        RecipeDao.update(params.id,updateStr,function (err, recipes) {
            res.writeHead(200, {
                "Content-Type": "text/plain;charset=utf-8"
            });
            res.end("modify recipe success！");
        });
    });

}

exports.deleteRecipe = function(req,res){
    var idStr = req.params.ids.split(",");

    RecipeDao.delete(idStr,function (err, recipe) {
        res.writeHead(200, {
            "Content-Type": "text/plain;charset=utf-8"
        });
        res.end("delete recipe success！");
    });
};

exports.listAll = function (req, res) {
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');

    RecipeDao.getAll(pageNo,pageSize,function (err1, recipe) {
        RecipeDao.getAllNum(function(err2,num){
            if(!(err1 || err2)){
                /*req.session.user_id = '5485bd76a0e572df17e81d70';
                req.session.account = "cmm";
                req.session.head = "/head/defaulthead.jpeg";*/
                res.json({root:recipe,total:num});
            }
        });
    });
};

exports.create = function (req, res){
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
        var recipe = new RecipeModel();
        recipe = params;

        //特殊参数，数组形式，特殊处理，步骤和食材
        var mNum = params['mNum'];
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
        recipe.step = step0;

        //几个默认值设置
        recipe.logTime = logTime();
        recipe.collectNum = 0;
        recipe.commentNum = 0;
        recipe.productNum = 0;
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
        /*recipe.author._id = params.userId;
        recipe.author.account = user.account;
        recipe.author.head = user.head;*/
};

exports.showOne = function (req, res) {
    RecipeDao.getById(req.params.id,function (err, recipe) {
        res.json(recipe);
    });
};

exports.searchRecipe = function(req,res){
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var queryStr = req.param('queryStr');
    RecipeDao.searchRecipe(pageNo,pageSize,queryStr,function (err1, recipe) {
        RecipeDao.searchRecipeNum(queryStr,function(err2,num){
            if(!(err1 || err2)){
                res.json({root:recipe,total:num});
            }
        });
    });
}

exports.listComment = function(req,res){
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var recipeId = req.param('recipeId');
    CommentRecipeDao.listComment(pageNo,pageSize,recipeId,function (err1, commentList) {
        CommentRecipeDao.listCommentNum(recipeId,function(err2,num){
            if(!(err1 || err2)){
                res.json({root:commentList,total:num});
            }
        });
    });
};

exports.comment = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe数据接收完毕');
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
        var comment = new CommentModel();
        comment = params;
        comment.logTime = logTime();
        //设置用户信息
        comment.author = {
            _id : req.session.user_id,
            account : req.session.account,
            head : req.session.head
        };

        console.log(comment);

        CommentRecipeDao.create(comment,function (err, recipes) {
            if(err){
                res.writeHead(500, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("评论菜谱出现内部错误！");
            }else {
                RecipeDao.updateCommentNum(comment.replyId,function(err1,recNew){
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

exports.collect = function (req,res) {
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('collect数据接收完毕');
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
        var collect = new CollectModel();
        collect = params;
        collect.logTime = logTime();
        collect.userId = req.session.user_id;

        CollectDao.create(collect,function (err, collect) {
            if(!err){
                RecipeDao.updateCollectNum(collect.recipeId,function(err2,recNew){
                    if(!err2){
                        res.writeHead(200, {
                            "Content-Type": "text/plain;charset=utf-8"
                        });
                        res.end("collect success！");
                    }
                });
            }
        });
    });
};

exports.createProduct = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('product数据接收完毕');
        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}

        var product = new ProductModel();
        product = params;
        product.logTime = logTime();
        //product.logTime = Date.now;

        product.author = {
            _id : req.session.user_id,
            account : req.session.account,
            head : req.session.head
        };

        console.log(product);

        ProductDao.create(product,function (err, product) {
            if(err){
                res.writeHead(500, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("product菜谱出现内部错误！");
            }else {
                RecipeDao.updateProductNum(product.recipeId,function(err1,recNew){
                    if(!err1){
                        res.writeHead(200, {
                            "Content-Type": "text/plain;charset=utf-8"
                        });
                        res.end("product success！");
                    }
                });
            }
        });
    });
};


exports.listProduct = function(req,res){
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var recipeId = req.param('recipeId');

    ProductDao.listProduct(pageNo,pageSize,recipeId,function (err1, products) {
        ProductDao.listProductNum(recipeId,function(err2,num){
            if(!(err1 || err2)){
                res.json({root:products,total:num});
            }
        });
    });
};

exports.checkCollect = function(req,res){
    var recipeId = req.param('recipeId');
    var userId = req.session.user_id;
    CollectDao.check(userId,recipeId,function (err1, collect) {
        console.log(collect.length);
        if(collect.length != 0){
            res.end("true");
        }
        else{
            res.send("false");
        }
    });
};

/*exports.likeProduct = function(req,res){
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });

    // 数据接收完毕，执行回调函数
    req.addListener("end", function () {
        console.log('recipe数据接收完毕');

        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}

        var like = createLike(params);

        ProductDao.getById(params.id,function(err,product){
            var num = product.likeNum + 1;
            ProductDao.likeProduct(params.id,like,num,function (err, recipes) {
                res.writeHead(200, {
                    "Content-Type": "text/plain;charset=utf-8"
                });
                res.end("like成功！");s
            });
        });

    });
};*/

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

/*function createRecipe(){
    var recipe = new RecipeModel();
    recipe.recipeName="recipeName1";
    recipe.logTime = new Date();
    recipe.description="description1";
    var material0 =[];
    material0[0] = {materialName:"name1",amount:"amount1"};
    material0[1] = {materialName:"name2",amount:"amount2"};
    recipe.material = material0;
    recipe.difficult = "difficult1";
    recipe.cookTime = "time1";
    var step0 = [];
    step0[0]={stepNum: 1, stepExplain: "explain1", stepPhoto: "photo1"};
    step0[1]={stepNum: 2, stepExplain: "explain2", stepPhoto: "photo2"};
    recipe.step=step0;
    recipe.collectNum=0;
    recipe.commentNum=0;
    recipe.productNum=0;
    recipe.flag = true;
    recipe.author={_id:"001",head:"headPath",account:"user1"};

    return recipe;
}*/

/*function modifyRecipe(recipes,params){
    var recipe = {};

    recipe.recipeName="recipeName1";
    recipe.logTime = new Date();
    recipe.description="description1";
    var material0 =[];
    material0[0] = {materialName:"name1",amount:"amount1"};
    material0[1] = {materialName:"name2",amount:"amount2"};
    recipe.material = material0;
    recipe.difficult = "difficult1";
    recipe.cookTime = "time1";
    var step0 = [];
    step0[0]={stepNum: 1, stepExplain: "explain1", stepPhoto: "photo1"};
    step0[1]={stepNum: 2, stepExplain: "explain2", stepPhoto: "photo2"};
    recipe.step=step0;
    recipe.collectNum=2;
    recipe.commentNum=2;
    recipe.productNum=2;
    recipe.flag = true;
    recipe.author={_id:"001",head:"headPath",account:"user1"};

    return recipe;
}*/

/*function createComment(params,user){
    var comment = new CommentModel();
    comment.author._id = "001";
    comment.author.head = "head1";
    comment.author.account = "account";
    comment.logTime = new Date();
    comment.content = "content1";
    comment.replyId = "01";
    comment.replyUserId = "02";
    return comment;
}*/

/*function createCollect(params){
    var collect = new CollectModel();
    collect.user._id = "001";
    collect.user.account = "account1";
    collect.user.head = "head1";
    collect.logTime = new Date();
    collect.recipeId = "01";
    return collect;
}*/

/*function createProduct(params){
    var product = new ProductModel();
    product.author._id = "001";
    product.author.account = "account1";
    product.author.head = "head1";
    product.logTime = new Date();
    product.picture = "picture1";
    product.content = "content1";
    product.likeNum = 0;
    product.likeList = [];
    product.recipeId = "11";
    return product;
}*/

/*
function createLike(params){
    var like = {};
    like._id = "002";
    like.account = "account2";
    like.head = "head2"
    return like;
}
*/

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
}

function logTime(){
    var data =new Date().format('yyyy-MM-dd hh:mm:ss');
    console.log(data);
    return data;
}

