/**
 * Created by zhaiyuan on 4-5-15.
 */

var app = require('../app')
var assert = require("assert")
// , www = require('../bin/www')
//    , http = require('http')
var request = require('request')
    ,webServer="http://localhost:3000";

describe('User API',function(){

    /*before(function(){
        app.set('port', process.env.PORT || 3000);

        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
        });
    });*/

    describe('/service/userinfo/addUser', function () {
        it('Get /service/userinfo/addUser should return 200', function (done) {
            request(webServer+"/service/userinfo/addUser", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });


    describe('/service/userinfo/getUserInfo', function () {
        it('Get /service/userinfo/getUserInfo should return 200', function (done) {
            request(webServer+"/service/userinfo/getUserInfo", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });


    describe('/service/userinfo/modifyInfo', function () {
        it('Get /service/userinfo/modifyInfo should return 200', function (done) {
            request(webServer+"/service/userinfo/modifyInfo", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });

});