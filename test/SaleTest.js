/**
 * Created by zhangcan on 14-11-15.
 * OMG
 */
var app = require('../app')
var assert = require("assert");
// , www = require('../bin/www')
// , http = require('http')
var request = require('request')
    ,webServer="http://localhost:3000";

describe('Sale API',function(){

    /*before(function(){
        app.set('port', process.env.PORT || 3000);

        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
        });
    });*/

    describe('/sale', function () {
        it('should return html content', function (done) {
            request(webServer+"/sale/", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                ///response.should.status(200).html;

                done();
            });
        });
    });

    describe('/sale/getAll', function () {
        it('should return html content', function (done) {
            request(webServer+"/sale/getAll", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                ///response.should.status(200).html;

                done();
            });
        });
    });

    describe('/sale/getOne', function () {
        it('should return html content', function (done) {
            request(webServer+"/sale/getOne", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                ///response.should.status(200).html;

                done();
            });
        });
    });

    describe('/sale/getOwn', function () {
        it('should return html content', function (done) {
            request(webServer+"/sale/getOwn", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                ///response.should.status(200).html;

                done();
            });
        });
    });

    describe('/sale/create', function () {
        it('should return html content', function (done) {
            request(webServer+"/sale/create", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                //assert.equal(200, status);
                assert.equal("发布成功！", body);
                ///response.should.status(200).html;

                done();
            });
        });
    });

    describe('/sale/delete', function () {
        it('should return html content', function (done) {
            request(webServer+"/sale/delete", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                //assert.equal(200, status);
                assert.equal("删除成功！", body);
                ///response.should.status(200).html;

                done();
            });
        });
    });

    describe('/sale/edit', function () {
        it('should return html content', function (done) {
            request(webServer+"/sale/edit", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                //assert.equal(200, status);
                assert.equal("编辑成功！", body);
                ///response.should.status(200).html;

                done();
            });
        });
    });

    describe('/sale/search', function () {
        it('should return html content', function (done) {
            request(webServer+"/sale/search", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                ///response.should.status(200).html;

                done();
            });
        });
    });

});