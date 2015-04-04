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
            var comment1 = MomentComment({
                _id:"551f50c59561511112bde121",
                author: {
                    _id: "110011",
                    head: "1.jpg",
                    account:"cmm"
                },
                content:"Zan!",
                date: "2015-04-03 20:00:04",
                momentId:"551f4d3a582104f00ef48953",
                reply: {
                    _id:null,
                    account:null},
                flag: true
            });
            comment1.save(function (err) {
                if (err) throw err;
                //done();
            });

            var comment2 = MomentComment({
                _id:"551f509c077910e111eb017e",
                author: {
                    _id: "110011",
                    head: "1.jpg",
                    account:"cmm"
                },
                content:"Zan!",
                date: "2015-04-03 20:00:04",
                momentId:"551f4d3a582104f00ef48953",
                reply: {
                    _id:null,
                    account:null},
                flag: true
            });
            comment2.save(function (err) {
                if (err) throw err;
                //done();
            });

            Moment({
                _id:"551f4d3a582104f00ef48953",
                author:{
                    _id:110011,
                    head:"1.jpg",
                    account:"cmm"
                },
                pictures: ["2.jpg","3.jpg"
                ],
                content: "I have a good diner",
                date: "2015-04-03 20:00:00",
                likeNum: 0,
                likeList: [
                ],
                showComment:[],
                commentNum:0,
                commentList:
                    ["551f50c59561511112bde121","551f509c077910e111eb017e"]
                ,
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
            mongoose.connection.db.dropCollection("momentcomments");
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

    it('it should get the moment comment by moment_Id ', function (done) {
        request(url)
            .get('/service/moment/getCommentById?id=551f4d3a582104f00ef48953')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property("root");
                res.body.should.have.property("total", 2);
                done();
            });
    });

    it('it should create a comment', function (done) {
        var comment = MomentComment({
            author: {
                _id: "110011",
                head: "1.jpg",
                account:"cmm"
            },
            content:"ZanZan!",
            momentId:"551f4d3a582104f00ef48953",
            reply: {
                _id:null,
                account:null}
        });

        request(url)
            .post('/service/moment/addComment')
            .type('json')
            .expect(200)
            .send(JSON.stringify(comment))
            .end(function (err, res) {
                if (err) {
                    throw err;
                    done();
                }
                res.text.should.eql("comment success！");
                done();
            });
    });

    it('it should delete the comment', function (done) {
        request(url)
            .get('/service/moment/deleteComment?commentId=551feb07c0d9b51a11266c31&momendId=551f4d3a582104f00ef48953')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("delete comment success！");
                //res.body.should.have.property("total", 2);
                done();
            });
    });
});