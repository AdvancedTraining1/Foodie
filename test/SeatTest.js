
/**
 * hh
 * 2015-4-4
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var seat = require("./../data").Seat;

describe('Test the Seat functions', function () {
    var url = 'http://localhost:3000';
    before(function (done) {
        mongoose.connect('mongodb://localhost/test', function () {
            mongoose.connection.db.dropCollection("seats");
            var restaurantId = 5201314;
            var person = {
                _id: 5211314,
                name: 'hh'
            };
            var seatNum = 40;
            var peopleNum = 40;
            var restaurantName = 'HH';
            var temp = new seat({
                restaurantName: restaurantName,
                restaurantId: restaurantId,
                seatsNum: seatNum,
                peopleNum:peopleNum,
                peopleList:[
                    person
                ]
            });
            temp.save(function (err) {
                if (err) throw err;
                done();
            });
            //done();
        });
    });

    after(function (done) {
        mongoose.connect('mongodb://localhost/test', function () {
            mongoose.connection.db.dropCollection("seats");
        });
        mongoose.connection.close(done)
    });

    it('it should create a seat', function (done) {
        //post req.body.dishName;
        var person = {
            _id: 5211314,
            name: 'YY'
        };
        var temp = {
            restaurantId: "110",
            restaurantName: "Fuck you",
            seatsNum: 10,
            peopleNum: 11,
            peopleList:[
                person
            ]
        };
        request(url)
            .post('/service/seat/add')
            .type('json')
            .expect(200)
            .send(JSON.stringify(temp))
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("Seat add Successful！");
                done();
            });
    });

    it('it should set seat number', function (done) {
        //console.log("DishDao Add 成功!!！");
        var temp = {
            restaurantId: "110",
            seatsNum: 33
        };
        request(url)
            .post('/service/seat/setseatnum')
            .type('json')
            .expect(200)
            .send(JSON.stringify(temp))
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("setSeatNum！");
                done();
            });
    });

    it('it should get seat number', function (done) {
        request(url)
            .get('/service/seat/getseatnum?restaurantId=110')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //res.body.should.have.property("root");
                res.body.should.have.property("num", 33);
                done();
            });
    });

    it('it should insert a people', function (done) {
        request(url)
            .get('/service/seat/insertPeople?restaurantId=110&Id=12345&Name=QQ')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //res.body.should.have.property("root");
                //res.body.should.have.property("num", 11);
                res.text.should.eql("insertPeople！");
                done();
            });
    });

    it('it should get people number', function (done) {
        request(url)
            .get('/service/seat/getPeopleNum?restaurantId=110')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //res.body.should.have.property("root");
                res.body.should.have.property("num", 12);
                done();
            });
    });

    it('it should get a list', function (done) {
        request(url)
            .get('/service/seat/getList?restaurantId=110')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //res.body.should.have.property("root");
                //res.body.should.have.property("num", 11);
                res.body.should.have.property("peopleList");
                done();
            });
    });

    it('it should delete a people', function (done) {
        request(url)
            .get('/service/seat/deletePeople?restaurantId=110&Id=12345&Name=QQ')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //res.body.should.have.property("root");
                //res.body.should.have.property("num", 11);
                res.text.should.eql("deletePeople！");
                done();
            });
    });



    it('it should delete a record', function (done) {
        request(url)
            .get('/service/seat/deleteById?restaurantId=110')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                //res.body.should.have.property("root");
                //res.body.should.have.property("num", 11);
                res.text.should.eql("delete seat success！");
                done();
            });
    });

});
