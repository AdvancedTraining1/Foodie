/**
 * Created by liuhanxu on 15-3-20.
 */

var DaoBase = require('./DaoBase');
var ReservationModel = require('../data').Reservation;

var ReservationDao = new DaoBase(ReservationModel);


ReservationDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            console.log("ReservationDao Add 成功！");
            callback(null,'ReservationDao.prototype.save success');
        }
    });

};

ReservationDao.getAllReservation = function (callback)
{
    ReservationModel.find({},function(err,reservations) {
        if (err) {
            callback(err,null);
            return;
        }
        if (!reservations) {
            callback(null,"ReservationDao.getAllReservation no reservations");
            return;
        }
        callback(null,reservations);

    });

};

ReservationDao.delete = function (list,callback) {
    ReservationModel.remove({_id:{$in:list}}).exec(function(error,reservation){
        if(error) return callback(error,null);
        return callback(null, reservation);
    });
}

ReservationDao.update = function (conditions,update,options,callback) {
    ReservationModel.update(conditions,update,options).exec(function(error,reservation){
        if(error) return callback(error,null);
        return callback(null, reservation);
    });
}

ReservationDao.getReservationByUserId = function (userId,callback) {
    ReservationModel.find({userId:userId}).exec(function(err,reservations){
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            callback(null,reservations);
        }
    });
}



module.exports = ReservationDao;
