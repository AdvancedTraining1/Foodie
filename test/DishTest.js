/**
 * hh
 * 2015-4-4
 */

var should = require('should');
var assert = require('assert');
var request = require('supertest');
var mongoose = require('mongoose');
var dish = require("./../data").Dish;

describe('Test the create functions', function () {
    var url = 'http://localhost:3000';
    before(function (done) {
        mongoose.connect('mongodb://localhost/test', function () {
            mongoose.connection.db.dropCollection("dishes");
            var temp = dish({
                _id:"551f50c59561511112bde121",
                dishName: "Fish",
                description: "Big fish",
                photo: "/head/defaulthead.jpeg",
                restaurantId: "1001",
                logTime: "20150404",
                praiseNum: 0,
                loverNum: 0,
                totalStars: 0
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
            mongoose.connection.db.dropCollection("dishes");
        });
        mongoose.connection.close(done)
    });

    it('it should create a dish', function (done) {
        //console.log("DishDao Add 成功!!！");
        var m_dish = dish({
            dishName: "huhao",
            description: "huhao is a fish"
        });
        request(url)
            .post('/service/dish/create')
            .type('json')
            .expect(200)
            .send(JSON.stringify(m_dish))
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("Dish add Successful！");
                done();
            });
    });

    it('it should get all the dishes', function (done) {
        request(url)
            .get('/service/dish/getalldishs?pageNo=1&pageSize=2')
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

    it('it should get all the dishes number', function (done) {
        request(url)
            .get('/service/dish/getDishesNum')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property("total", 2);
                done();
            });
    });

    it('it should get all the restaurant dishes', function (done) {
        request(url)
            .get('/service/dish/getRestaurantDishes?pageNo=1&pageSize=2&restaurantId=1001')
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

    it('it should get all the restaurant dishes number', function (done) {
        request(url)
            .get('/service/dish/getRestaurantDishesNum?restaurantId=1001')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.body.should.have.property("total", 1);
                done();
            });
    });

    it('it should update PraiseNum by id', function (done) {
        request(url)
            .get('/service/dish/updatePraiseNum?id=551f50c59561511112bde121')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("update dish praise num！");
                done();
            });
    });

    it('it should update LoverNum by id', function (done) {
        request(url)
            .get('/service/dish/updateLoverNum?id=551f50c59561511112bde121')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("update dish lover num！");
                done();
            });
    });

    it('it should update total stars num', function (done) {
        //console.log("DishDao Add 成功！");
//        var temp = dish({
//            id: "huhao",
//            num: "huhao is a fish"
//        });
        var temp = {id : "551f50c59561511112bde121", num : 3};
        request(url)
            .post('/service/dish/updateTotalStarsNum')
            .type('json')
            .expect(200)
            .send(JSON.stringify(temp))
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("update dish update total stars num！");
                done();
            });
    });

    it('it should delete dishes by name', function (done) {
        request(url)
            .get('/service/dish/deleteDishById?DishId=551f50c59561511112bde121')
            .type('json')
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    throw err;
                }
                res.text.should.eql("delete dish success！");
                done();
            });
    });
});