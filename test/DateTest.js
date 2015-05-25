/**
 * Created by zhaiyuan on 4-5-15.
 */

var app = require('../app')
var assert = require("assert")
// , www = require('../bin/www')
//    , http = require('http')
var request = require('request')
    ,webServer="http://localhost:3000";

describe('Date API',function(){

   /* before(function(){
        app.set('port', process.env.PORT || 3000);

        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
        });
    });
*/
    describe('/service/date/create', function () {
        it('Get /service/date/create should return 200', function (done) {
            request(webServer+"/service/date/create", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });


    describe('/service/date/look', function () {
        it('Get /service/date/look should return 200', function (done) {
            request(webServer+"/service/date/look", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });


    describe('/service/date/delete', function () {
        it('Get /service/date/delete should return 200', function (done) {
            request(webServer+"/service/date/delete", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });


    describe('/service/date/join', function () {
        it('Get /service/date/join should return 200', function (done) {
            request(webServer+"/service/date/join", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

});