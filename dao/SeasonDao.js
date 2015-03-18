/**
 * this is edited by huhao
 * 2014.11.06
 * chenmm push me to do this i don't understand until now
 */

var DaoBase = require('./DaoBase');
var seasonModel = require('../data').season;

var SeasonDao = new DaoBase(seasonModel);

module.exports = SeasonDao;

SeasonDao.save = function (obj,callback)
{
    obj.save(function (err) {
        if (err)
            callback(err,null);
        else
            callback(null,'SeasonDao.save success');
    });
};

SeasonDao.getAllSeasonFood = function (callback)
{
    seasonModel.find({},function(err,ads) {
        if (err) {
            callback(err,null);
            return;
        }
        if (!ads) {
            callback(null,"SeasonDao.getAllSeasonFood none");
            return;
        }
        callback(null,ads);

    });

};

SeasonDao.delete = function (conditions,callback) {
    seasonModel.remove(conditions).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
        //return callback(null, 'RecipeDao.delete success');
    });
}

SeasonDao.update = function (conditions,update,options,callback) {
    seasonModel.update(conditions,update,options).exec(function(error,data){
        if(error) return callback(error,null);

        return callback(null, 'UserDao.update success');
        //return callback(null, 'RecipeDao.delete success');
    });
}

SeasonDao.searchSeasonFood = function (pageNo,pageSize,name,callback) {
    seasonModel.find({"name":name}).skip((pageNo-1)*pageSize).limit(pageSize).exec(function(error,user){
        if(error) return callback(error,null);

        return callback(null, user);
    });
}

SeasonDao.getNum = function (conditions,callback) {
	seasonModel.count(conditions).exec(function(error,num){
		if(error)
			return callback(error,null);
		return callback(null, num);
	});
}

module.exports = SeasonDao;
