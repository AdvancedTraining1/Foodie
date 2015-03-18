/**
 * hh
 * 2014-11-15
 */
var app = require('../app')
var assert = require("assert");
var request = require('request')
    ,webServer="http://localhost:3000";

describe('Admin API',function(){

    /*before(function(){
        app.set('port', process.env.PORT || 3000);

        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
        });
    });*/

//    describe('/admin/add', function () {
//        it('should return html content, status should be 200',function(done){
//            request.post(webServer+"/admin/add", function (error, response,body) {
//                if (error) throw error;
//
//                var status = response.statusCode;
//                assert.equal(200, status);
//
//                done();
//            });
//        });
//    });

    describe('/admin/getAllUsers', function () {
        it('should return html content, status should be 200', function (done) {
            request.get(webServer+"/admin/getAllUsers", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);

                done();
            });
        });
    });
//
//
//    describe('/admin/delete', function () {
//        it('should return html content, status should be 200',function(done){
//            request.post(webServer+"/admin/delete", function (error, response,body) {
//                if (error) throw error;
//
//                var status = response.statusCode;
//                assert.equal(200, status);
//
//                done();
//            });
//        });
//    });
//
//    describe('/admin/getUserById', function () {
//        it('should return html content, status should be 200',function(done){
//            request.post(webServer+"/admin/getUserById", function (error, response,body) {
//                if (error) throw error;
//
//                var status = response.statusCode;
//                assert.equal(200, status);
//
//                done();
//            });
//        });
//    });
//
//    describe('/admin/updateUser', function () {
//        it('should return html content, status should be 200',function(done){
//            request.post(webServer+"/admin/updateUser", function (error, response,body) {
//                if (error) throw error;
//
//                var status = response.statusCode;
//                assert.equal(200, status);
//
//                done();
//            });
//        });
//    });
//
//    describe('/admin/getAllTopic', function () {
//        it('should return html content, status should be 200',function(done){
//            request.post(webServer+"/admin/getAllTopic", function (error, response,body) {
//                if (error) throw error;
//
//                var status = response.statusCode;
//                assert.equal(200, status);
//
//                done();
//            });
//        });
//    });
//
//    describe('/admin/addSeason', function () {
//        it('should return html content, status should be 200',function(done){
//            request.post(webServer+"/admin/addSeason", function (error, response,body) {
//                if (error) throw error;
//
//                var status = response.statusCode;
//                assert.equal(200, status);
//
//                done();
//            });
//        });
//    });
//
//    describe('/admin/getAllSeason', function () {
//        it('should return html content, status should be 200',function(done){
//            request.post(webServer+"/admin/getAllSeason", function (error, response,body) {
//                if (error) throw error;
//
//                var status = response.statusCode;
//                assert.equal(200, status);
//
//                done();
//            });
//        });
//    });


});
