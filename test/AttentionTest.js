/**
 * Created by zhaiyuan on 14-11-15.
 */
var app = require('../app')
var assert = require("assert");
// , www = require('../bin/www')
// , http = require('http')
var request = require('request')
    ,webServer="http://localhost:3000";

describe('Attention API',function(){

    /*before(function(){
        app.set('port', process.env.PORT || 3000);

        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
        });
    });*/

    /*describe('/attentions', function () {
        it('should return html content', function (done) {
            request(webServer+"/attentions/", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                ///response.should.status(200).html;

                done();
            });
        });
    });
*/
    describe('/attentions/getAllAttentions/:queryStr', function () {
        it('should return html content', function (done) {
            request(webServer+"/attentions/getAllAttentions/:queryStr", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                ///response.should.status(200).html;

                done();
            });
        });
    });

    describe('/attentions/addAttentions', function () {
        it('should return html content', function (done) {
            request(webServer+"/attentions/addAttentions", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                //assert.equal(200, status);
                assert.equal("已关注！", body);

                done();
            });
        });
    });

    describe('/attentions/deleteAttentions', function () {
        it('should return html content', function (done) {
            request(webServer+"/attentions/deleteAttentions", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                //assert.equal(200, status);
                assert.equal("已取消关注！", body);

                done();
            });
        });
    });

    describe('/attentions/lookFriendStatus', function () {     //need to modify
        it('should return html content', function (done) {
            request(webServer+"/attentions/lookFriendStatus", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);

                done();
            });
        });
    });

    describe('/attentions/commentStatus', function () {
        it('should return html content', function (done) {
            request(webServer+"/attentions/commentStatus", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);

                done();
            });
        });
    });

    /*describe('/attentions/deleteComment/:comment_id', function () {
        it('should return html content', function (done) {
            request(webServer+"/attentions/deleteComment/:comment_id", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal('{message: "delete ok!"}', body);

                done();
            });
        });
    });*/

    describe('/attentions/likeStatus', function () {
        it('should return html content', function (done) {
            request(webServer+"/attentions/likeStatus", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);

                done();
            });
        });
    });

    describe('/attentions/cancelLike', function () {
        it('should return html content', function (done) {
            request(webServer+"/attentions/cancelLike", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);

                done();
            });
        });
    });

});
