/**
 * Created by huhao on 14-11-06.
 */

var advertiseModel = require('../data').advertise;
var AdvertiseDao = require("../dao/AdvertiseDao");

//构造
function AdvertiseHandler()
{

}

AdvertiseHandler.addAd = function(req, res)
{
    req.on('data',function(data)
    {
        //var obj = JSON.parse(data.toString());
        //var str = '信息为:' + obj.name + obj.tel + obj.account + obj.type;

        var ad = createAd();
        AdvertiseDao.save(ad,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);

            }

        });
        //res.send(str);
        res.send("advertise/add");

    });
};

AdvertiseHandler.updateAd = function(req, res)
{
    req.on('data',function(data)
    {
        //var obj = JSON.parse(data.toString());
       // var str = '信息为:' + obj.name + obj.tel + obj.account + obj.type;

        var conditions = {author : {id:111,account:"amount111"}};
        var update = {$set : {link : "www.qq.com"}};
        var options = {update : true};
        AdvertiseDao.update(conditions,update,options,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);

            }

        });
        res.send("advertise/add");


    });
};

AdvertiseHandler.getAllAds = function(req,res)
{
    AdvertiseDao.getAllAds(function (err, data)
    {
        if(err)
        {
            console.log(err);

        }else
        {

            console.log(data);

        }



    });

    res.send("advertise/getAllAds");
}

//AdvertiseHandler.getUserById = function(req,res)
//{
//    req.on('data',function(data)
//    {
//        var obj = JSON.parse(data.toString());
//        var id = obj.userid;
//        UserDao.getUserById(12221,function (err, data)
//        {
//            if(err)
//            {
//                console.log(err);
//
//            }else
//            {
//                //console.log('3432');
//                console.log(data);
//            }
//
//        });
//        res.send(obj.userid);
//
//    });
//}


AdvertiseHandler.deleteAd = function(req,res)
{
    req.on('data',function(data)
    {
        var conditions ={author : {account:"111"}};
        //var obj = JSON.parse(data.toString());
        AdvertiseDao.delete(conditions,function (err, data)
        {
            if(err)
            {
                console.log(err);

            }else
            {

                console.log(data);
            }

        });
        res.send("advertise/delete");

    });

}

function createAd()
{
    var ad = new advertiseModel();
    var author = [];
    author[0] = {id:120,account:"amount111"};
    ad.author = author;
    ad.describe = "advertise";
    ad.create_at = new Date();
    ad.update_at = new Date();
    ad.link="www.baidu.com";

    return ad;
};

module.exports = AdvertiseHandler;
