/**
 * Created by mengchi on 4/3/15.
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

    describe('/service/friend/adduser', function () {
        it('Get /service/friend/adduser should return 200', function (done) {
            request(webServer+"/service/friend/adduser", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                done();
            });
        });
    });



   /* describe('/service/friend/add', function () {
        it('Post /service/friend/add should return 200', function (done) {
            var options = {
                host: host,
                port: 3000,
                path: '/service/friend/add',
                method: 'POST'
            };
            var data=require("querystring").stringify({friendId:"551d70c8bd26a9e018081ebe",friendAccount:"bbb",friendHead:"/head/defaulthead.jpeg"})
            var req=http.request(options, function(res) {
                assert.equal(200, res.statusCode);
            });
            req.write(data);
            req.end();
            done();
        });
    });

    describe('/service/friend/add', function () {
        it('Post /service/friend/add should return 200', function (done) {
            var options = {
                host: host,
                port: 3000,
                path: '/service/friend/add',
                method: 'POST'
            };
            var data=require("querystring").stringify({friendId:"551d70dafdbaa2f11862ba7f",friendAccount:"ccc",friendHead:"/head/defaulthead.jpeg"})
            var req=http.request(options, function(res) {
                assert.equal(200, res.statusCode);
            });
            req.write(data);
            req.end();
            done();
        });
    });
*/


});
