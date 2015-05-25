/**
 * Created by administrator on 5/9/15.
 */

var request = require('supertest');
var mongoose = require('mongoose');
//var Moment = require("./../../../data").Moment;
var User = require("./../../../data").User;

describe('Add a user', function () {
    var url = 'http://localhost:3000';
    /*before(function (done) {
        mongoose.connect('mongodb://localhost/test', function () {
            mongoose.connection.db.dropCollection("moments");
            var commentList = MomentComment({

            });

            Moment({
                author:{
                    head:"1.jpg",
                    account:"cmm"
                },
                pictures: [
                    {path:"2.jpg"},
                    {path:"3.jpg"}
                ],
                content: "I have a good diner",
                date: "2015-04-03 20:00:00",
                likeNum: 0,
                likeList: [
                ],
                commentNum:0,
                commentList:[
                ],
                flag:true
            }).save(function (err) {
                if (err) throw err;
                done();
            });
        });
    });

    after(function (done) {
        mongoose.connect('mongodb://localhost/test', function () {
            mongoose.connection.db.dropCollection("moments");
        });
        mongoose.connection.close(done)
    });*/

    /*it('it should connect properly and get the moment', function (done) {
        request(url)
            .get('/service/moment/listAll')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property("root");
                res.body.should.have.property("total", 1);
                done();
            });
    });*/

    it('it should create a comment', function (done) {
        var user = User({
            username:"cmm",
            account:"cmm",
            password:"cmm",
            email:"cmm@bjtu.com"
        });

        request(url)
            .post('/service/userinfo/register')
            .type('json')
            .expect(200)
            .send(JSON.stringify(user))
            .end(function (err, res) {
                /*if (err) {
                    throw err;
                }
                res.text.should.eql("comment success！");*/
                done();
            });
    });

    it('it should create a comment', function (done) {
        var user = User({
            username:"cmm",
            account:"cmm",
            password:"cmm",
            email:"cmm@bjtu.com"
        });

        request(url)
            .post('/service/userinfo/login')
            .type('json')
            .expect(200)
            .send(JSON.stringify(user))
            .end(function (err, res) {
                /*if (err) {
                 throw err;
                 }
                 res.text.should.eql("comment success！");*/
                done();
            });
    });
});