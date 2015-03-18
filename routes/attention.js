/**
 * Created by zhaiyuan on 2014-11-01.
 */
//var express = require('express');
//var router = express.Router();
var AttentionsHandler = require('../controller/attentionsHandler');
//var BlogsHander = require('../controller/blogsHandler');

module.exports = function(app){

    app.get('/attention/friendStatusListRecipe',function(req,res){
        //console.log("+++++");
        res.render("attention/friendStatusListRecipe");  //views
    });
    app.get('/service/attention/lookFriendStatusRecipe',AttentionsHandler.lookFriendStatusRecipe);


    app.get('/attention/friendStatusListBlog',function(req,res){
        //console.log("+++++");
        res.render("attention/friendStatusListBlog");  //views
    });
    app.get('/service/attention/lookFriendStatusBlog',AttentionsHandler.lookFriendStatusBlog);


    app.get('/attention/friendStatusListTopic',function(req,res){
        //console.log("+++++");
        res.render("attention/friendStatusListTopic");  //views
    });
    app.get('/service/attention/lookFriendStatusTopic',AttentionsHandler.lookFriendStatusTopic);



    app.get('/attention/getAllAttention',function(req,res){
        res.render("attention/getAllAttention");  //views
    });
    app.get('/service/attention/searchAll',AttentionsHandler.searchAll);
    app.get('/service/attention/listAll',AttentionsHandler.listAll);

    app.get('/service/attention/check/:friendId',AttentionsHandler.checkAttention);
    app.get('/service/attention/addAttentions',AttentionsHandler.addAttentions);
    app.get('/service/attention/deleteAttentions',AttentionsHandler.deleteAttentions);



    app.get('/attention/oneRecipe',function(req,res){
        res.render("attention/oneRecipe");  //views
    });
    app.get('/service/attention/lookOneFriendStatusRecipe',AttentionsHandler.lookOneFriendStatusRecipe);  //enter



    app.get('/attention/oneBlog',function(req,res){
        res.render("attention/oneBlog");  //views
    });
    app.get('/service/attention/lookOneFriendStatusBlog',AttentionsHandler.lookOneFriendStatusBlog);  //enter



    app.get('/attention/oneTopic',function(req,res){
        res.render("attention/oneTopic");  //views
    });
    app.get('/service/attention/lookOneFriendStatusTopic',AttentionsHandler.lookOneFriendStatusTopic);  //enter

};

/*
router.get("/",function(req,res){
    req.session.user_id="54578976af75277b630cc379";
    req.session.account="zhaiyuan";
})

router.get('/register',function(req,res){
    res.render('register');
});
router.post('/addUser',AttentionsHandler.addUser);



router.get('/addRecipe/',AttentionsHandler.addRecipe);
router.get('/addTopic/',AttentionsHandler.addTopic);
router.get('/addBlog/',AttentionsHandler.addBlog);


router.get('/commentStatus/',AttentionsHandler.commentStatus);
router.get('/deleteComment/:comment_id',BlogsHander.deleteCommentToBlog);
router.get('/likeStatus/',AttentionsHandler.likeStatus);
router.get('/cancelLike/',AttentionsHandler.cancelLike);
*/



//module.exports = router;
