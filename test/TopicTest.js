/**
 * Created by mengchi on 14-11-15.
 */
var app = require('../app')
var assert = require("assert")
// , www = require('../bin/www')
    , http = require('http')
var request = require('request')
    ,webServer="http://localhost:3000"
    ,host='localhost'
describe('Topic API',function(){
    describe('/topic', function () {
        it('Get /topic should return 200', function (done) {
            request(webServer+"/topic/", function (error, response,body) {
                if (error) throw error;
                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });
    describe('/createTopic', function () {
        it('Get /createTopic should return 200', function (done) {
            request(webServer+"/topic/createTopic", function (error, response,body) {
                if (error) throw error;
                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });
    describe('/showTopicDetail', function () {
        it('Get /showTopicDetail/:topic_id should return 200', function (done) {
            request(webServer+"/topic/showTopicDetail/546846f7f7b059281a6dfd17", function (error, response,body) {
                if (error) throw error;
                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });
    describe('/showTopicList', function () {
        it('Get /showTopicList should return 200', function (done) {
            request(webServer+"/topic/showTopicList", function (error, response,body) {
                if (error) throw error;
                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });
    /*describe('/publishTopic', function () {
     it('Post /publishTopic should return 200', function (done) {
     var options = {
     host: host,
     port: 3000,
     path: '/topic/publishTopic',
     method: 'POST'
     };
     var data=require("querystring").stringify({topicName:"topic123",content:"world"})
     var req=http.request(options, function(res) {
     assert.equal(200, res.statusCode);
     });
     req.write(data);
     req.end();
     done();
     });
     });
     describe('/joinTopic', function () {
     it('Post /joinTopic should return 200', function (done) {
     var options = {
     host: host,
     port: 3000,
     path: '/topic/joinTopic',
     method: 'POST'
     };
     var data=require("querystring").stringify({title:"hello",picture:"world",topic_id:"5464d48ae4cba45620c676bc"})
     var req=http.request(options, function(res) {
     assert.equal(200, res.statusCode);
     });
     req.write(data);
     req.end();
     done();
     });
     });*/
    describe('/likeTopicUpload', function () {
        it('Get /likeTopicUpload/:Upload_id should return 200', function (done) {
            request(webServer+"/topic/likeTopicUpload/546848e2f5a516af1a90ca3a", function (error, response,body) {
                if (error) throw error;
                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });
    describe('/cancelLikeTopicUpload', function () {
        it('Get /cancelLikeTopicUpload/:Upload_id should return 200', function (done) {
            request(webServer+"/topic/cancelLikeTopicUpload/546848e2f5a516af1a90ca3a", function (error, response,body) {
                if (error) throw error;
                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });
    /*describe('/addCommentToTopicUpload', function () {
     it('Post /addCommentToTopicUpload should return 200', function (done) {
     var options = {
     host: host,
     port: 3000,
     path: '/topic/addCommentToTopicUpload',
     method: 'POST'
     };
     var data=require("querystring").stringify({comment:"comment123", _id:"5464ee4caae0ec19272d59e9"})
     var req=http.request(options, function(res) {
     assert.equal(200, res.statusCode);
     });
     req.write(data);
     req.end();
     done();
     });
     });*/
    describe('/getAllCommentToTopicUpload', function () {
        it('Get /getAllCommentToTopicUpload/:Upload_id should return 200', function (done) {
            request(webServer+"/topic/getAllCommentToTopicUpload/546848e2f5a516af1a90ca3a", function (error, response,body) {
                if (error) throw error;
                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });
   /* describe('/deleteCommentToTopicUpload', function () {
        it('Get /deleteCommentToTopicUpload/:comment_id should return 200', function (done) {
            request(webServer+"/topic/deleteCommentToTopicUpload/5464f5ba7ce21f062986dad8", function (error, response,body) {
                if (error) throw error;
                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });*/
});