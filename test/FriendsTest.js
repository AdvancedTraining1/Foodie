/**
 * Created by mengchi on 15-4-1.
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
                username: "aaa",
                account: "aaa",
                email:"aaa@a.b",
                password: "fake",
                type: 0,
                phone: "15201344444",
                sex: 0,
                head:"/head/defaulthead.jpeg"
            });

            user1.save(function (err) {
                if (err) throw err;
            });

            var user2 = User({
                _id:"551f50c59561511112bde213",
                username: "bbb",
                account: "bbb",
                email:"bbb@a.b",
                password: "fake",
                type: 0,
                phone: "15201344445",
                sex: 0,
                head:"/head/defaulthead.jpeg"
            });

            user2.save(function (err) {
                if (err) throw err;
            });


            var user3 = User({
                _id:"551f50c59561511112bde214",
                username: "ccc",
                account: "ccc",
                email:"ccc@a.b",
                password: "fake",
                type: 0,
                phone: "15201344446",
                sex: 0,
                head:"/head/defaulthead.jpeg"
            });

            user3.save(function (err) {
                if (err) throw err;
            });


            var user4 = User({
                _id:"551f50c59561511112bde215",
                username: "ddd",
                account: "ddd",
                email:"ddd@a.b",
                password: "fake",
                type: 0,
                phone: "15201344447",
                sex: 0,
                head:"/head/defaulthead.jpeg"
            });

            user4.save(function (err) {
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

    it('it should add a friend', function(done){


        var frienduser = {friendId : "551f50c59561511112bde213", friendAccount : "bbb", friendHead:"/head/defaulthead.jpeg"};


        request(url)
            .post('/service/friend/add')
            .type('json')
            .expect(200)
            .send(JSON.stringify(frienduser))
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property("message", "add friends success");
                done();
            });
    });

    it('it should add another friend', function(done){

        var frienduser = {friendId : "551f50c59561511112bde214", friendAccount : "ccc", friendHead:"/head/defaulthead.jpeg"};


        request(url)
            .post('/service/friend/add')
            .type('json')
            .expect(200)
            .send(JSON.stringify(frienduser))
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property("message", "add friends success");
                done();
            });
    });

    it('it should get the friendList', function (done) {
        request(url)
            .get('/service/friend/listFriend?userId=551f50c59561511112bde212')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property("friendList");
                res.body.should.have.property("num", 2);
                done();
            });
    });

    it('it should delete a friend', function(done){

        var frienduser = {friendId : "551f50c59561511112bde214", friendAccount : "ccc", friendHead:"/head/defaulthead.jpeg"};


        request(url)
            .post('/service/friend/delete')
            .type('json')
            .expect(200)
            .send(JSON.stringify(frienduser))
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property("message", "delete friends success");
                done();
            });
    });


    it('it should search a user', function (done) {
        request(url)
            .get('/service/friend/searchFriend?queryStr=a&pageNo=1&pageSize=5')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property("friendList");
                done();
            });
    });


});