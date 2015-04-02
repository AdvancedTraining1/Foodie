/**
 * Created by liuhanxu on 14-10-20.
 */

var DaoBase = require('./DaoBase');
var UsersModel = require('../data').User;

var UserDao = new DaoBase(UsersModel);

module.exports = UserDao;

UserDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            console.log("userdao add user成功！");
            callback(null,'UserDao.prototype.save success');
        }
    });

};

UserDao.getAllUsers = function (callback)
{
    UsersModel.find({},function(err,users) {
        if (err) {
            callback(err,null);
            return;
        }
        if (!users) {
           callback(null,"UserDao.getAllUsers no users");
            return;
        }
        callback(null,users);

    });

};

UserDao.delete = function (list,callback) {
    UsersModel.remove({account:{$in:list}}).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
        //return callback(null, 'RecipeDao.delete success');
    });
}

UserDao.update = function (conditions,update,options,callback) {
    UsersModel.update(conditions,update,options).exec(function(error,user){
        if(error) return callback(error,null);
        return callback(null, user);
    });
}

UserDao.getUserByAccount = function (account,callback) {
    UsersModel.find({account:account}).exec(function(err,user){
        if (err){
            console.log("err"+err);
            callback(err,null);
        }
        else{
            callback(null,user);
        }
    });
}
UserDao.getUserByAccountAndPass=function (username,password,callback) {
    UsersModel.findOne({account:username,password:password}).exec(function(error,user){
        if(error)
            return callback(error,null);
        return callback(null, user);
    });
}



module.exports = UserDao;
