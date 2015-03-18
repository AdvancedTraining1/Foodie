/**
 * Created by liuhanxu on 14-11-15.
 */
var app = require('../app')
var assert = require("assert");
// , www = require('../bin/www')
// , http = require('http')
var request = require('request')
var webServer="http://localhost:3000";

describe('测试Userinfo',function(){

    /*before(function(){
        app.set('port', process.env.PORT || 3000);

        var server = app.listen(app.get('port'), function() {
            console.log('Express server listening on port ' + server.address().port);
        });
    });*/

    describe('测试testuserinfo.jade', function () {
        it('should return html content', function (done) {
            request(webServer+"/userinfo/testinterface", function (error, response,body) {
                if (error) throw error;

                var status = response.statusCode;
                assert.equal(200, status);
                ///response.should.status(200).html;

                done();
            });
        });
    });



    /*it('GET /blog/ should return 200',function(done){
     done;
     });*/
    /*it('GET /blog/ should return 200',function(done){
     var requset = request(webServer+"/blog/")
     requset.get('/blog')
     requset.expect(200,done);
     });

     /* it('POST /users should return 200',function(done){
     request()
     .post('/users')
     .set('Content-Type','application/json')
     .write(JSON.stringify({ username: 'test', password: 'pass' }))
     .expect(200,done);
     });*/
});