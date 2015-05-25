
/**
 * hh
 * 2015-4-4
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');


describe('Test the push message functions', function () {
    var url = 'http://localhost:3000';
    before(function (done) {
        done();
    });

    after(function (done) {
        done();
    });

    it('it should push a message', function (done) {
        //console.log("DishDao Add 成功!!！");
        var temp = {
            msg: "做时训",
            head: "翟媛"
        };
        request(url)
            .post('/service/pushmsg')
            .type('json')
            .expect(200)
            .send(JSON.stringify(temp))
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("Push Successful！");
                done();
            });
    });

});
