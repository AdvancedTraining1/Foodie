/**
 * Created by cmm on 4/3/15.
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var Moment = require("./../../../data").Moment;
var MomentComment = require("./../../../data").MomentComment;

describe('Test the get functions', function () {
    var url = 'http://localhost:3000';
    before(function (done) {
        mongoose.connect('mongodb://localhost/test', function () {
            mongoose.connection.db.dropCollection("moments");
            var commentList = MomentComment({

            });

            Moment({
                author:{
                    _id:110011,
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
    });

    it('it should get all the moments', function (done) {
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
    });

    it('it should get the moment by 110011', function (done) {
        request(url)
            .get('/service/moment/listOwn?authorId=110011')
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
    });
});