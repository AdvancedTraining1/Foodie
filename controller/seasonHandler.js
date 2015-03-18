/**
 * Created by huhao on 14-11-06.
 */

var seasonModel = require('../data').season;
var SeasonDao = require("../dao/SeasonDao");
var formidable = require('formidable'),
	fs = require('fs'),
	url = require('url');
var querystring = require('querystring');
//构造
function SeasonHandler()
{

}

SeasonHandler.add = function(req, res)
{
	var name = req.param('name');
	var description = req.param('description');
	var type = req.param('type');
	var mounth = req.param('mounth');
	var path = req.param('path');

	var season = createSeason(name,description,type,mounth,path);

    SeasonDao.save(season,function (err, data)
	{
		if(err)
		{

			str = 'Add season food error';// + str;
			res.send(str);
			console.log(err);

		}else
		{
			str = 'Add season food success';// + str ;
			res.send(str);
			console.log(data);
		}

	});
};

SeasonHandler.upload = function(req,res){
	var form = new formidable.IncomingForm();
	form.uploadDir = "./../upload/temp/";//改变临时目录
	form.parse(req, function(error, fields, files){
		for(var key in files){
			var file = files[key];
			console.log(file.type);
			var fName = (new Date()).getTime();

			switch (file.type){
				case "image/jpeg":
					fName = fName + ".jpg";
					break;
				case "image/png":
					fName = fName + ".png";
					break;
				default :
					fName =fName + ".png";
					break;
			}
			console.log(file.size);
			var uploadDir = "./../public/upload/" + fName;
			fs.rename(file.path, uploadDir, function(err) {
				if (err) {
					res.write(err+"\n");
					res.end();
				}
				res.end("upload/"+fName);
			});
		}
	});
};

SeasonHandler.update = function(req, res)
{
    req.on('data',function(data)
    {
        //var obj = JSON.parse(data.toString());
        //var str = '信息为:' + obj.name + obj.tel + obj.account + obj.type;

        var conditions = {name : "seasonname"};
        var update = {$set : {picture : "www.qq.com"}};
        var options = {update : true};
        SeasonDao.update(conditions,update,options,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);

            }

        });
       // res.send("season/update");
        res.json(200, {message: "season/update"});

    });
};

SeasonHandler.getAll = function(req,res)
{
    SeasonDao.getAllSeasonFood(function (err, data)
    {
        if(err)
        {
            console.log(err);

        }else
        {

            console.log(data);

        }



    });

    //res.send("season/getAll");
    res.json(200, {message: "season/getAll"});
}


SeasonHandler.delete = function(req,res)
{
    req.on('data',function(data)
    {
        var conditions ={name : "seasonname"};
        //var obj = JSON.parse(data.toString());
        SeasonDao.delete(conditions,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);
            }

        });
        //res.send("season/delete");
        res.json(200, {message: "season/delete"});
    });

}

SeasonHandler.searchSeasonFood = function(req,res)
{
	var pageNo = req.param('pageNo');
	var pageSize = req.param('pageSize');
	var name = req.param('seasonName');


	var conditions ={name : name};
	SeasonDao.searchSeasonFood(pageNo,pageSize,name,function(err,seasons)
	{
		//console.log(users);
		SeasonDao.getNum(conditions,function(err,num)
		{
			res.json({seasons:seasons,total:num});
		});

	});

}

function createSeason(name,description,type,mounth,path)
{
    var season = new seasonModel();
    season.name = name;
    season.month = mounth;
    season.picture = path;
    season.type = type;
	season.describe = description;
    season.time = new Date();
    season.create_at = new Date();
    season.update_at = new Date();

    return season;
};

module.exports = SeasonHandler;
