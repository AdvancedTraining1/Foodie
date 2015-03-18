/**
 * Created by mengchi on 14-11-13.
 */
var express = require('express');
var router = express.Router();
var topicHander = require('../controller/topicHandler');

/* GET home page. */
router.get("/",function(req,res){
    console.log("yes");

    /* user.save(function(err, newblog) {
     if (err) {
     message="save failed";
     }else{
     message="save successful";
     }
     });*/
    req.session.user_id = "546770d5a3835df037bcd063";
    req.session.account = "111";

    console.log(req.session.user_id);
    /*var User = require('../data/models/user');
     var db = require('../util/database');
     var mongoose = require('mongoose');
     //var ObjectId = mongoose.Schema.Types.ObjectId;

     User.findOne({_id:req.session.user_id},function(err,user) {
     console.log(user);

     });*/
    //res.redirect("/topic/createTopic");
    //res.render('showTopicUpload', { title: 'Express' ,picture:'haha'});
    res.render('index', { title: 'Express' });
});
router.get('/createTopic', function(req, res) {
    res.render('topic/createTopic');
});
router.get('/createTopic_angular', function(req, res) {
    res.render('common/index');
});
router.get('/topicList', function(req, res) {
    res.render('topic/topicList');
});
router.get('/topicList_angular', function(req, res) {
    res.render('common/index');
});

router.get('/topicDetail', function(req, res) {
    res.render('topic/topicDetail');
});
router.get('/topicDetail_angular/:topic_id', function(req, res) {
    res.render('common/index');
});

router.get('/showTopicDetail/:topic_id',topicHander.getATopic)
router.get('/showTopicList',topicHander.getAlltopics);
router.post('/publishTopic',topicHander.publishTopic);
router.post('/uploadProduct',topicHander.uploadProduct);
router.get('/getUploadToATopic',topicHander.getUploadToATopic);
router.get('/likeTopicUpload/:Upload_id',topicHander.likeTopicUpload);
router.get('/cancelLikeTopicUpload/:Upload_id',topicHander.cancelLikeTopicUpload);
router.post('/addCommentToTopicUpload',topicHander.addCommentToTopicUpload);
router.get('/getAllCommentToTopicUpload/:Upload_id',topicHander.getAllCommentToTopicUpload);
router.get('/deleteCommentToTopicUpload/:comment_id',topicHander.deleteCommentToTopicUpload);
router.post('/upload', topicHander.upload);


module.exports = router;
