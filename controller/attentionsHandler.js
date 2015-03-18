/**
 * Created by zhaiyuan on 14-11-01.
 */
var db = require('../util/database')

var AttentionsDao = require("../dao/AttentionsDao");
var Attentions = require('../data/models/user');
var CommentDao = require("../dao/CommentDao");
var CommentToBlogDao = require("../dao/CommentToBlogDao");
var RecipeDao = require("../dao/RecipeDao");
var BlogDao = require("../dao/BlogDao");
var TopicDao = require("../dao/TopicDao");
var TopicUploadCommentDao = require("../dao/TopicUploadCommentDao");
var BlogLikeDao = require("../dao/BlogLikeDao");
var TopicUploadLikeDao=require("../dao/TopicUploadLikeDao");

var User = require("./../data").user;
var Blog = require("./../data").Blog;
var Recipe = require("./../data").Recipe;
var Topic = require("./../data").Topic;
var CommentToBlogModel =require("./../data").CommentToBlog;
var TopicUploadCommentModel =require("./../data").TopicUploadComment;
var CommentsModel =require("./../data").Comments;
var BlogLikeModel =require("./../data").BlogLike;
var TopicUploadLikeModel=require("./../data").TopicUploadLike;

var BlogsHandler = require("../controller/blogsHandler");

var querystring = require('querystring');
var fs = require('fs');
var url = require('url');

function AttentionsHandler(){

}

AttentionsHandler.addUser=function(req,res){
    var username = req.param('username');
    var password = req.param('password');

    var user = new Attentions({
        username: username,
        account: "ZHAI",
        password: password,
        type: 0,
        phone: "15201345555",
        sex: 0,
        head:"2.img",
        friends: [{
            _id: "54578976af75277b630cc379",
            account : "zhaiyuan",
            head: "1.img"
        },
        {
            _id: "5457aa1f0233539703192dc9",
            account : "mengchi",
            head: "2.img"
        }],
        fans:[{
            _id: "54578976af75277b630cc379",
            account : "zhaiyuan",
            head: "1.img"
        },
        {
            _id: "5457aa1f0233539703192dc9",
            account : "mengchi",
            head: "2.img"
        }],

        recipe_count: 2,
        topic_count: 2,
        blog_count: 2,
        comment_count: 2,
        friends_count: 2,
        fans_count: 2
    });
    user.save(function(err, newuser) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        console.log(newuser)
        res.json(201, newuser);
        res.render('index');
    });
};


AttentionsHandler.searchAll=function(req,res){
    console.log("搜索关键字用户（目的添加好友）...");

    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var queryStr = req.param('queryStr');

    AttentionsDao.searchAllAttentions(pageNo,pageSize,queryStr,function (err, users) {
        AttentionsDao.searchNum(queryStr,function(err2,num){
            if(!(err || err2)){
                res.json({root:users,total:num});
            }
        });

    });

};

AttentionsHandler.listAll=function(req,res){
    console.log("搜索所有用户（目的添加好友）...");

    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');

    AttentionsDao.getAllAttentions(pageNo,pageSize,function (err, users) {
        AttentionsDao.getNum(function(err2,num){
            if(!(err || err2)){
                res.json({root:users,total:num});
            }
        });

    });

};


AttentionsHandler.checkAttention=function (req, res) {
    var friendId = req.param('friendId');
    var userId = req.session.user_id;
    //var userId = "5464a134462eaef3480abb39";
    AttentionsDao.check(userId,friendId,function (err1, attention) {
        console.log(attention.length);
        if(attention.length != 0){
            res.end("true");
        }
        else{
            res.send("false");
        }
    });
}


AttentionsHandler.addAttentions=function(req,res){
    console.log("关注");
    var friendId = req.param('friendId');
    var friendAccount = req.param('friendAccount');
    var friendHead = req.param('friendHead');

    var friends = {};
    friends._id = friendId;
    friends.account = friendAccount;
    friends.head = friendHead;


    var userId = req.session.user_id;
    var userAccount = req.session.account;
    var userHead = req.session.head;
    var fans={};
    fans._id=userId;
    fans.account = userAccount;
    fans.head = userHead;

    /*
    var friends = {};
    friends._id = "5464a08744ea60084850294a";
    friends.account = "ZHAIYUAN";
    friends.head = "2.img";
     */

    /*var fans = {};
    fans._id = "5464a134462eaef3480abb39";
    fans.account = "ZHAI";
    fans.head = "2.img";*/

    AttentionsDao.check(fans._id,friendId,function (err, attention) {
        console.log(attention.length);
        if(attention.length == 0){
            //res.end("true");
            AttentionsDao.addAttentions(fans._id,friends,function(err,users){
                //res.write(users);
                AttentionsDao.addAttentionsFans(friends._id,fans,function (err, users) {
                    res.writeHead(200, {
                        "Content-Type": "text/plain;charset=utf-8"
                    });
                    res.end("attention success!");
                });
            });
        }
        else{
            res.json("already attention!");
        }
    });

};

AttentionsHandler.deleteAttentions=function(req,res){
    console.log("取消关注");
    var friendId = req.param('friendId');
    var friendAccount = req.param('friendAccount');
    var friendHead = req.param('friendHead');

    var friends = {};
    friends._id = friendId;
    friends.account = friendAccount;
    friends.head = friendHead;

    var userId = req.session.user_id;
    var userAccount = req.session.account;
    var userHead = req.session.head;
    var fans={};
    fans._id=userId;
    fans.account = userAccount;
    fans.head = userHead;


    /* var friends = {};
     friends._id = "5464a08744ea60084850294a";
     friends.account = "ZHAIYUAN";
     friends.head = "2.img";
     */
/*
    var fans = {};
    fans._id = "5464a134462eaef3480abb39";
    fans.account = "ZHAI";
    fans.head = "2.img";*/

    AttentionsDao.check(fans._id,friendId,function (err, attention) {
        console.log(attention.length);
        if(attention.length != 0){
            //res.end("true");
            AttentionsDao.deleteAttentions(fans._id,friends,function(err,users){
                AttentionsDao.deleteAttentionsFans(friends._id,fans,function (err, users) {
                    res.writeHead(200, {
                        "Content-Type": "text/plain;charset=utf-8"
                    });
                    res.end("cancel attention!");
                });

            });
        }
        else{
            res.json("already cancel!");
        }
    });
};


AttentionsHandler.lookFriendStatusRecipe=function(req,res){
    console.log("查看好友动态---菜谱");

    //var sessionId="5464a134462eaef3480abb39";//ZHAI id
    var sessionId=req.session.user_id;
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');

    AttentionsDao.lookFriendStatusRecipe(sessionId,pageNo,pageSize,function (err, recipes) {
         console.log(recipes);
         AttentionsDao.getFriendStatusRecipeNum(sessionId,function(err2,num){
              if(!(err || err2)){
                   res.json({root:recipes,total:num});
              }
         });

    });

};


AttentionsHandler.lookFriendStatusBlog=function(req,res){
    console.log("查看好友动态---博客");

    //var sessionId="5464a134462eaef3480abb39";//ZHAI id
    var sessionId=req.session.user_id;
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');

    AttentionsDao.lookFriendStatusBlog(sessionId,pageNo,pageSize,function (err, blogs) {
        console.log(blogs);
        AttentionsDao.getFriendStatusBlogNum(sessionId,function(err2,num){
            if(!(err || err2)){
                res.json({root:blogs,total:num});
            }
        });

    });


};


AttentionsHandler.lookFriendStatusTopic=function(req,res){
    console.log("查看好友动态---话题");

    //var sessionId="5464a134462eaef3480abb39";//ZHAI id
    var sessionId=req.session.user_id;
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');

    AttentionsDao.lookFriendStatusTopic(sessionId,pageNo,pageSize,function (err, topics) {
        console.log(topics);
        AttentionsDao.getFriendStatusTopicNum(sessionId,function(err2,num){
            if(!(err || err2)){
                res.json({root:topics,total:num});
            }
        });

    });


};


AttentionsHandler.lookOneFriendStatusRecipe=function(req,res) {
    console.log("查看具体好友动态---菜谱");                   //a little problem to do more

    //var statusId = "5464f96cf6596eda34c8f7ca";//blog,topic or recipe id
    var recipeId=req.param('queryStr');
    Recipe.find({_id: recipeId}, function (err, recipe) {
        //res.write(recipe);

        CommentDao.listComment(recipeId,function (err, commentList) {
            res.json(commentList);
        });

    });

};


AttentionsHandler.lookOneFriendStatusBlog=function(req,res) {
    console.log("查看具体好友动态---博客");                   //a little problem to do more

    //var statusId = "5464f96cf6596eda34c8f7ca";//blog,topic or recipe id
    var blogId=req.param('queryStr');
    Blog.find({_id: blogId}, function (err, blog) {
        //res.json(blog);
        CommentToBlogDao.getAllCommentToBlog = function (blogId,callback) {
            CommentToBlogModel.find({blog_id:blogId}).sort({'create_at':-1}).exec(function(error,comments){
                if(error) return callback(error,null);
                return callback(null, comments);
            });
        };

     });

};


AttentionsHandler.lookOneFriendStatusTopic=function(req,res) {
    console.log("查看具体好友动态---话题");                   //a little problem to do more

    //var statusId = "5464f96cf6596eda34c8f7ca";//blog,topic or recipe id
    var topicId=req.param('queryStr');
    Topic.find({_id: topicId}, function (err, topic) {
        res.json(topic);
    });

};


AttentionsHandler.commentStatus=function(req,res) {
    console.log("评论状态");

    var statusId = "5464fcf129b38dda3894efdc";
    //  blog  5464d32def0a5efc057c384f
    // topic  5464fcf129b38dda3894efdc
    // or recipe id   5464f8be636edfe9339fe0b1

    Blog.findOne({_id: statusId}, function (err, blog) {
        if(blog!=null){
            console.log(blog);
            var commentToBlog = new CommentToBlogModel({
                author: {
                    id: "5464a134462eaef3480abb39",
                    account: "ZHAI" },
                content: "1",
                reply_id: null,
                blog_id:statusId
            });

            BlogDao.getOne(statusId, function (err, blog) {

                CommentToBlogDao.create(commentToBlog, function (err, newCommentToBlog) {
                    if (err) {
                        console.log(err);
                        var message = "comment blog failed";
                        res.json(500, {message: message});
                        return;
                    } else {
                        var message = "comment blog successful";
                        console.log(message);
                        var conditions = {_id: statusId}
                        console.log(blog.comment_count);
                        var comment_count = blog.comment_count + 1;
                        var update = {$set: { comment_count: comment_count} }
                        var options = { upsert: true};
                        BlogDao.update(conditions, update, options, function (error, docs) {
                            if (error) {
                                console.log(error);
                                var message = "comment blog failed";
                                res.json(500, {message: message});
                                return;
                            } else {
                                console.log("comment blog successful");
                                res.json(200, {message: "comment blog successful"});
                            }
                        });

                    }
                })
            })
        }
    });

    Topic.findOne({_id: statusId}, function (err, topic) {
        if(topic!=null){
            var TopicUploadComment = new TopicUploadCommentModel({
                author: {
                    id: "5464a134462eaef3480abb39",
                    account: "ZHAI" },
                content: "1",
                reply_id: null,
                topicUpload_id:statusId
            });

            TopicDao.getOne(statusId, function (err, topic) {

                TopicUploadCommentDao.create(TopicUploadComment, function (err, newTopicUploadComment) {
                    if (err) {
                        console.log(err);
                        var message = "comment topic failed";
                        res.json(500, {message: message});
                        return;
                    } else {
                        var message = "comment topic successful";
                        console.log(message);
                        res.json(200, {message: message});
                    }
                })
            })
        }
    });

    Recipe.findOne({_id: statusId}, function (err, recipe) {//??????probelm
        if(recipe!=null){
            var RecipeComment = new CommentsModel({
                author: {
                    _id: "5464a134462eaef3480abb39",
                    account: "ZHAI" ,
                    head:"2.img"},
                content: "1",
                reply_id: statusId,
                logTime:2014-11-15
                //recipe_id:statusId
            });

            Recipe.findOne({_id: statusId}, function (err, recipe) {

                CommentDao.create(RecipeComment, function (err, newRecipeComment) {
                    if (err) {
                        console.log(err);
                        var message = "comment recipe failed";
                        res.json(500, {message: message});
                        return;
                    } else {
                        var message = "comment recipe successful";
                        console.log(message);
                        res.json(200, {message: "comment recipe successful"});

                    }
                })
            })
        }
    });
};


AttentionsHandler.likeStatus=function(req,res) {
    console.log("点赞");

    var statusId = "5464d32def0a5efc057c384f";
    //  blog  5464d32def0a5efc057c384f
    // topic  5464fcf129b38dda3894efdc
    // or recipe id   5464f8be636edfe9339fe0b1

    Blog.findOne({_id: statusId}, function (err, blog) {
        if (blog != null) {
            //BlogsHandler.likeBlog()
                var blogLike = new BlogLikeModel({
                    user: {
                        account: "ZHAI",
                        head:""
                    },
                    blog_id: statusId,
                    user_id: "5464a134462eaef3480abb39"
                });

                BlogLikeDao.create(blogLike,function (err,newBlogLike){
                    if (err) {
                        var message = "like blog failed";
                        res.json(500, {message: message});
                        return;
                    } else {
                        var message = "like blog successful";
                        console.log(message);
                        var conditions = {_id: statusId}
                        console.log( blog.like_count);
                        var like_count =blog.like_count+1;
                        var update = { $set: { like_count:like_count} }
                        var options = { upsert: true};
                        BlogDao.update(conditions, update, options, function (error,docs) {
                            if (error) {
                                console.log(error);
                                var message = "like blog failed";
                                res.json(500, {message: message});
                                return;
                            } else {
                                console.log("like blog successful");
                                res.json(200, {message: "like blog successful"});
                            }
                        });

                    }
                })

        }
    });

    Topic.findOne({_id: statusId}, function (err, topic){
       if(topic!=null) {
               var topicUploadLike = new TopicUploadLikeModel({
                   user: {
                       account: "ZHAI",
                       head:""
                   },
                   topicUpload_id: statusId,
                   user_id: "5464a134462eaef3480abb39"
               });

               TopicUploadLikeDao.create(topicUploadLike,function (err,newTopicUploadLike){
                   if (err) {
                       var message = "like topic failed";
                       res.json(500, {message: message});
                       return;
                   } else {
                       var message = "like topic successful";
                       console.log(message);
                       res.json(200, {message: "like topic successful"});

                   }
               })

       }
    });


    //recipe like? product like
};

AttentionsHandler.cancelLike=function(req,res) {
    console.log("取消点赞");

    var statusId = "5464d32def0a5efc057c384f";
    //  blog  5464d32def0a5efc057c384f
    // topic  5464fcf129b38dda3894efdc
    // or recipe id   5464f8be636edfe9339fe0b1

    Blog.findOne({_id: statusId}, function (err, blog){
        if(blog!=null){
            var like_count = blog.like_count - 1;
            var update = {$set: { like_count: like_count} }
            var options = { upsert: true};
            BlogDao.update({_id: statusId}, update, options, function (error) {
                if (error) {
                    var message = "cancel like blog failed";
                    res.json(500, {message: message});
                    return;
                } else {
                    console.log("cancel like blog successful");

                }
            });

            var conditions = {blog_id: statusId, user_id: "5464a134462eaef3480abb39"};
            BlogLikeDao.delete(conditions, function (error) {
                if (error) {
                    console.log(error);
                    res.json(500, {message: error});
                    return;
                } else {
                    console.log('cancel like blog ok!');
                    var message = "cancel like blog ok!"

                    res.json(200, {message: message});
                }
            })
        }
    });

    Topic.findOne({_id: statusId}, function (err, topic){
        if(topic!=null){

            var conditions = {topicUpload_id: statusId, user_id: "5464a134462eaef3480abb39"};
            TopicUploadLikeDao.delete(conditions, function (error) {
                if (error) {
                    console.log(error);
                    res.json(500, {message: error});
                    return;
                } else {
                    console.log('cancel like topic ok!');
                    var message = "cancel like topic ok!"

                    res.json(200, {message: message});
                }
            })
        }
    });

};

AttentionsHandler.addRecipe=function(req,res){
    console.log("发布菜谱--test");

    var recipe = new Recipe({
        recipeName: "2",
        description: "2",
        author: {
            _id: "5457aa1f0233539703192dc9",
            head: "2.img",
            account: "mengchi" },
        material: [{
            materialName: "2",
            amount: "2"
        }],
        difficult: "2",
        cookTime: "2",
        step: [{
            stepNum: "2",
            stepExplain: "2",
            stepPhoto: "2"
        }],
        logTime: 2014-11-14,
        collectNum: 2,
        commentNum: 2,
        productNum: 2,
        flag: true

    });

        AttentionsDao.addRecipe(recipe,function(err,newrecipe){
            res.json(201, newrecipe);
            res.render('index');

        });

};

AttentionsHandler.addBlog=function(req,res){
    console.log("发布博客--test");

    var blog = new Blog({
        title:"1210hhh",
        content: "1210hhh",
        author: {
            id: "5457aa1f0233539703192dc9",
            account: "mengchi" },
        create_at: 2014-12-10,
/*
        upload: {
            author: {
                id: "54578976af75277b630cc379",
                account:  "zhaiyuan" },
            picture : "3.img",
            upload_time:2014-11-14,
            like_count: 4
        },*/

        like_count: 2,
        collect_count:5,
        comment_count: 1

    });

    AttentionsDao.addBlog(blog,function(err,newblog){
        res.json(201, newblog);
        res.render('index');

    });

};

AttentionsHandler.addTopic=function(req,res){
    console.log("发布话题--test");

    var topic = new Topic({
        topicName:"20141",
        content: "20141",
        author: {
            id: "5457aa1f0233539703192dc9",
            account: "mengchi" },
        time: 2014-12-10,
        /*
         upload: {
         author: {
         id: "54578976af75277b630cc379",
         account:  "zhaiyuan" },
         picture : "3.img",
         upload_time:2014-11-14,
         like_count: 4
         },*/

        upload_count: 4

    });

    AttentionsDao.addTopic(topic,function(err,newtopic){
        res.json(201, newtopic);
        res.render('index');

    });

};


module.exports = AttentionsHandler;