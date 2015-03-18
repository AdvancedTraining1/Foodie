/**
 * Created by mengchi on 14-11-14.
 */
var app = require('../app')
var assert = require("assert")
   // , www = require('../bin/www')
    , http = require('http')
var request = require('request')
    ,webServer="http://localhost:3000"
    ,host='localhost'

describe('Blog API',function(){

    before(function(){
        app.set('port', process.env.PORT || 3000);

        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
        });
    });

    describe('/blog', function () {
        it('Get /blog should return 200', function (done) {
            request(webServer+"/blog/", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/createBlog', function () {
        it('Get /createBlog should return 200', function (done) {
            request(webServer+"/blog/createBlog", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/showBlogDetail', function () {
        it('Get /showBlogDetail/:blog_id should return 200', function (done) {
            request(webServer+"/blog/showBlogDetail/54684574a41aa6224bec8147", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/showBlogList', function () {
        it('Get /showBlogList should return 200', function (done) {
            request(webServer+"/blog/showBlogList", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/publishBlog', function () {
        it('Post /publishBlog should return 200', function (done) {
            var options = {
                host: host,
                port: 3000,
                path: '/blog/publishBlog',
                method: 'POST'
            };
            var data=require("querystring").stringify({title:"hello",content:"world"})
            var req=http.request(options, function(res) {
                assert.equal(200, res.statusCode);
            });
            req.write(data);
            req.end();
            done();
        });
    });

    describe('/saveBlog', function () {
        it('Post /saveBlog should return 200', function (done) {
            var options = {
                host: host,
                port: 3000,
                path: '/blog/saveBlog',
                method: 'POST'
            };
            var data=require("querystring").stringify({title:"hello",content:"world"})
            var req=http.request(options, function(res) {
                assert.equal(200, res.statusCode);
            });
            req.write(data);
            req.end();
            done();
        });
    });

    describe('/modifyBlog', function () {
        it('Get /modifyBlog/:blog_id should return 200', function (done) {
            request(webServer+"/blog/modifyBlog/54684574a41aa6224bec8147", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/saveModifyBlog', function () {
        it('Post /saveModifyBlog should return 200', function (done) {
            var options = {
                host: host,
                port: 3000,
                path: '/blog/saveModifyBlog',
                method: 'POST'
            };
            var data=require("querystring").stringify({title:"hello",content:"world",_id:"5467065ba97474a6177176dd"})
            var req=http.request(options, function(res) {
                assert.equal(200, res.statusCode);
            });
            req.write(data);
            req.end();
            done();
        });
    });

    describe('/deleteBlog', function () {
        it('Get /deleteBlog/:blog_id should return 200', function (done) {
            request(webServer+"/blog/deleteBlog/54684574a41aa6224bec8148", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/collectionBlog', function () {
        it('Get /collectionBlog/:blog_id should return 200', function (done) {
            request(webServer+"/blog/collectionBlog/5467065ba97474a6177176dd", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/cancellationBlog', function () {
        it('Get /cancellationBlog/:blog_id should return 200', function (done) {
            request(webServer+"/blog/cancellationBlog/5467065ba97474a6177176dd", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/likeBlog', function () {
        it('Get /likeBlog/:blog_id should return 200', function (done) {
            request(webServer+"/blog/likeBlog/5467065ba97474a6177176dd", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/cancelLikeBlog', function () {
        it('Get /cancelLikeBlog/:blog_id should return 200', function (done) {
            request(webServer+"/blog/cancelLikeBlog/5467065ba97474a6177176dd", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/addCommentToBlog', function () {
        it('Post /addCommentToBlog should return 200', function (done) {
            var options = {
                host: host,
                port: 3000,
                path: '/blog/addCommentToBlog',
                method: 'POST'
            };
            var data=require("querystring").stringify({comment:"comment123", _id:"5467065ba97474a6177176dd"})
            var req=http.request(options, function(res) {
                assert.equal(200, res.statusCode);
            });
            req.write(data);
            req.end();
            done();
        });
    });

    describe('/showCommentListToBlog', function () {
        it('Get /showCommentListToBlog/:blog_id should return 200', function (done) {
            request(webServer+"/blog/showCommentListToBlog/5467065ba97474a6177176dd", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

    describe('/deleteCommentToBlog', function () {
        it('Get /deleteCommentToBlog/:blog_id should return 200', function (done) {
            request(webServer+"/blog/deleteCommentToBlog/54684574a41aa6224bec814b", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

});
