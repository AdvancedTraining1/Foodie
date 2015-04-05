/**
 * Created by zhangcan on 15-4-5.
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var User = require("./../data").User;

describe('Test the functions', function () {
    var url = 'http://localhost:3000';
    before(function (done) {
        mongoose.connect('mongodb://localhost/test', function () {
            mongoose.connection.db.dropCollection("users");
            var user1 = User({
                _id:"551f50c59561511112bde212",
                username: "fake",
                account: "fake",
                email:"hehe",
                password: "fake",
                type: 0,
                phone: "15201344444",
                sex: 0,
                head:"2.img"
            });

            user1.save(function (err) {
                if (err) throw err;
                done();
            });
        });
    });

    after(function (done) {
        mongoose.connect('mongodb://localhost/test', function () {
            mongoose.connection.db.dropCollection("users");
        });
        mongoose.connection.close(done)
    });

    it('it should register a new user', function(done){

        var user = User({
            _id:"551f50c59561511112bde456",
            username: "fake2",
            account: "fake2",
            password: "fake2",
            type: 0,
            phone: "13854389438",
            sex: 0,
            head:"2.img"
        });

        request(url)
            .post('/service/userinfo/register')
            .type('json')
            .expect(200)
            .send(JSON.stringify(user))
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("Register Successful！");
                done();
            });
    });

    it('it should modify the users password', function(done){
        var newbeeuser = User({
            _id:"551f50c59561511112bde456",
            password:"bigyellow"
        });
        request(url)
            .post('/service/userinfo/modifyPass')
            .type('json')
            .expect(200)
            .send(JSON.stringify(newbeeuser))
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("Modify password successful!");
                done();
            });
    });
});