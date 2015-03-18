/**
 * Created by mengchi on 14-10-30.
 */

var BlogModel = require('../data').Blog;
var BlogDao = require('../dao/BlogDao');
var CollectBlogDao = require('../dao/CollectBlogDao');
var CollectBlogModel = require('./../data').CollectBlog;
var CommentToBlogDao = require('../dao/CommentToBlogDao');
var CommentToBlogModel = require('./../data').CommentToBlog;
var BlogLikeModel = require('./../data').BlogLike;
var BlogLikeDao = require('../dao/BlogLikeDao');
var UserDao = require('../dao/UserDao');
var querystring=require('querystring');

function BlogHander() {

}

BlogHander.getAllBlogs = function (req, res) {
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    console.log("查询全部博客...");
    BlogDao.getAll(pageNo,pageSize,function(err,blogs){
        BlogDao.getAllNum(function(err2,num){
            if(err || err2){
                res.json(500, {message: err.toString()});
                return;

            }
            if (!blogs) {
                res.json(404, {message: "Not found."});
                return;
            }

            console.log("num"+num)
            res.json({root:blogs,total:num});
        });
    })
};


BlogHander.getABlogs = function (req, res) {
    console.log("查询一条博客...");
    var blog_id = req.params.blog_id;
    console.log(blog_id);
    BlogDao.getOne(blog_id,function(err,blog){
        console.log(blog);
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        res.json(200, {blog:blog});

    })
};


BlogHander.publishABlog = function (req, res) {
    req.setEncoding('utf-8');
    var postData = "";
    console.log("ok");

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log(postDataChunk);
    });

    req.addListener("end", function () {

        var params = querystring.parse(postData);
        //var title = req.param('title');
        //var content = req.param('content');
        var user_id = req.session.user_id;
        var title = params.title;
        var content = params.content;
        var tag = params.tags;
        var time = getTime();
        console.log(time);
        console.log(title);
        var blog = new BlogModel({
            title: title,
            content: content,
            tag:tag,
            type: "1",
            create_at:time,
            author: {
                id: req.session.user_id,
                account: req.session.account,
                head : req.session.head
            }

        });
        var message = ""
        BlogDao.create(blog,function (err, newblog) {
            if (err) {
                message = "publish failed";
                res.json(500, {message:message});
            } else {
                message = "publish successful";
                console.log(newblog._id);
                var id = newblog._id;
                res.json(200, {message:message,newId:id});

            }



        });

    });


};

BlogHander.saveABlog = function (req, res) {
    //var title = req.param('title');
    //var content = req.param('content');

    req.setEncoding('utf-8');
    var postData = "";
    console.log("ok");

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log(postDataChunk);
    });

    req.addListener("end", function () {

        var params = querystring.parse(postData);
        var title = params.title;
        var content = params.content;

        var user_id = req.session.user_id;
        var account = req.session.account;
        var head = req.session.head;

        if(user_id&&account){
            var blog = new BlogModel({
                title: title,
                content: content,
                type: "2",
                author: {
                    id: user_id,
                    account: account,
                    head:head}
            });
        }else{
            var blog = new BlogModel({
                title: title,
                content: content,
                type: "2"
            });

        }

        var message = "";
        BlogDao.create(blog,function (err, newblog) {
            if (err) {
                message = "save failed";
            } else {
                message = "save successful";
            }
            console.log("3newBlog" + newblog)

            res.render('showBlog', {title: title, content: content, message: message})

        });

    })


};

BlogHander.modifyBlog = function (req, res) {
    var blog_id = req.params.blog_id;
    BlogDao.getOne(blog_id,function(err,blog){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        res.render('modifyBlog', {_id:blog._id,title: blog.title, content: blog.content})

    })
};

BlogHander.saveModifyBlog = function (req, res) {


//    var title = req.body.title;
//    var content = req.body.content;
    req.setEncoding('utf-8');
    var postData = "";

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log(postDataChunk);
    });

    req.addListener("end", function () {

        var params = querystring.parse(postData);
        var title = params.title;
        var content = params.content;
        var id = params._id

       // var conditions = {_id: req.param('_id')}
        var conditions = {_id: id}
        var update = {$set: { title: title, content: content, update_at: new Date()}}
        var options = {upsert: true};
        var message = "";
        BlogDao.update(conditions,update,options,function(error,docs){
            if (error) {
                console.log(error);
                message = "update failed";
            } else {
                console.log(docs);
                message = "update successful";
                res.render('showBlog', {title: title, content: content, message: message})
            }
        });
    })


};

BlogHander.deleteBlog = function (req, res) {


    var deleteList = [req.params.blog_id];
    BlogDao.delete(deleteList,function(error,blog){
        if (error) {
            console.log(error);
        } else {
            console.log('delete ok!');
            res.json(200, {message: "delete ok!"});
        }
    });

}

BlogHander.collectionBlog = function (req, res) {
    var blog_id = req.params.blog_id;
    var user_id = req.session.user_id;
    BlogDao.getOne(blog_id,function (err, blog){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        console.log("find one");
        var collectBlog = new CollectBlogModel({
            user: {
                account: req.session.account,
                head:""
            },
            blog_id: blog_id,
            user_id:req.session.user_id
        });

        CollectBlogDao.create(collectBlog,function (err,newCollectBlog){
            if (err) {
                var message = "save failed";
                res.json(500, {message: message});
                return;
            } else {
                var message = "save successful";
                console.log(message);
                var conditions = {_id: blog_id}
                console.log( blog.collect_count);
                var collect_count =blog.collect_count+1;
                var update = {$set: { collect_count:collect_count} }
                var options = { upsert: true};
                BlogDao.update(conditions, update, options, function (error,docs) {
                    if (error) {comment
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


BlogHander.cancellationBlog = function (req, res) {
    var blog_id = req.params.blog_id;
    var user_id = req.session.user_id;
    var message = ""
    BlogDao.getOne(blog_id, function (err, blog) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        console.log("find one");

        var collect_count = blog.collect_count - 1;
        var update = {$set: { collect_count: collect_count} }
        var options = { upsert: true};
        BlogDao.update({_id: blog_id}, update, options, function (error) {
            if (error) {
                var message = "update failed";
                res.json(500, {message: message,status:false});
                return;
            } else {
                console.log("update successful");
                var conditions = {blog_id: blog_id, user_id: user_id};

                CollectBlogDao.delete(conditions, function (error) {
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

BlogHander.likeBlog = function (req, res) {
    var blog_id = req.params.blog_id;
    var user_id = req.session.user_id;
    BlogDao.getOne(blog_id,function (err, blog){
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        console.log("find one");
        var blogLike = new BlogLikeModel({
            user: {
                account: req.session.account,
                head:""
            },
            blog_id: blog_id,
            user_id: user_id
        });

        BlogLikeDao.create(blogLike,function (err,newBlogLike){
            if (err) {
                var message = "save failed";
                res.json(500, {message: message});
                return;
            } else {
                var message = "save successful";
                console.log(message);
                var conditions = {_id: blog_id}
                console.log( blog.like_count);
                var like_count =blog.like_count+1;
                var update = { $set: { like_count:like_count} }
                var options = { upsert: true};
                BlogDao.update(conditions, update, options, function (error,docs) {
                    if (error) {
                        console.log(error);
                        var message = "update failed";
                        res.json(500, {message: message,status:false});
                        return;
                    } else {
                        console.log("like successful");
                        res.json(200, {message: "like successful",status:true});
                    }
                });

            }
        })
    });

}


BlogHander.cancelLikeBlog = function (req, res) {
    var blog_id = req.params.blog_id;
    var user_id = req.session.user_id;
    var message = ""
    BlogDao.getOne(blog_id, function (err, blog) {
        if (err) {
            res.json(500, {message: err.toString()});
            return;
        }
        if (!blog) {
            res.json(404, {message: "Not found."});
            return;
        }
        console.log("find one");

        var like_count = blog.like_count - 1;
        var update = {$set: { like_count: like_count} }
        var options = { upsert: true};
        BlogDao.update({_id: blog_id}, update, options, function (error) {
            if (error) {
                var message = "update failed";
                res.json(500, {message: message});
                return;
            } else {
                console.log("update successful");

            }
        });

    });
    var conditions = {blog_id: blog_id, user_id: user_id};

    BlogLikeDao.delete(conditions, function (error) {
        if (error) {
            console.log(error);
            res.json(500, {message: error});
            return;
        } else {
            console.log('delete ok!');
            var message = "delete ok!"

            res.json(200, {message: message});
        }
    })
}

BlogHander.addCommentToBlog=function(req, res){

    req.setEncoding('utf-8');
    var postData = "";
    console.log("ok");

    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
        console.log(postDataChunk);
    });

    req.addListener("end", function () {

        var params = querystring.parse(postData);

        var content = params.content;
        var user_id = req.session.user_id;
        var account = req.session.account;
        var blog_id = params.blog_id;
        var time = getTime();
        console.log("blog_id----"+blog_id)
        //var reply_id = params.comment_id;

        console.log(user_id);
        var commentToBlog = new CommentToBlogModel({
            author: {
                id: user_id,
                account: account },
            content: content,
         //   reply_id: reply_id,
            blog_id:blog_id,
            time:time
        });

        BlogDao.getOne(blog_id, function (err, blog) {

            CommentToBlogDao.create(commentToBlog, function (err, newCommentToBlog) {
                if (err) {
                    console.log(err);
                    var message = "save failed";
                    res.json(500, {message: message});
                    return;
                } else {
                    var message = "save successful";
                    console.log(message);
                    var conditions = {_id: blog_id}
                    console.log(blog.comment_count);
                    var comment_count = blog.comment_count + 1;
                    var update = {$set: { comment_count: comment_count} }
                    var options = { upsert: true};
                    BlogDao.update(conditions, update, options, function (error, docs) {
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
            })
        })
    });

}

BlogHander.getAllCommentToBlog = function (req, res) {
    var pageNo = req.param('pageNo');
    var pageSize = req.param('pageSize');
    var blog_id = req.param('blog_id');
    console.log("+++++")
    CommentToBlogDao.getAllCommentToBlog(pageNo,pageSize,blog_id,function(err,comments){
        CommentToBlogDao.listCommentNum(blog_id,function(err2,num){
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
};


BlogHander.deleteCommentToBlog = function (req, res) {

    var conditions = {_id:req.params.comment_id};
    CommentToBlogDao.delete(conditions,function(error){
        if (error) {
            console.log(error);
        } else {
            console.log('delete ok!');
            res.json(200, {message: "delete ok!"});
        }
    });

}

BlogHander.checkCollction=function (req, res) {
    console.log("check--------")
    var blogId = req.param('blog_id');
    var userId = req.session.user_id;
    CollectBlogDao.check(userId,blogId,function (err1, collect) {
        console.log(collect.length);
        if(collect.length != 0){
            res.end("true");
        }
        else{
            res.send("false");
        }
    });
}

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

function getTime(){

    var data =new Date().format('yyyy-MM-dd hh:mm:ss');
    console.log(data);
    return data;
}



module.exports = BlogHander;