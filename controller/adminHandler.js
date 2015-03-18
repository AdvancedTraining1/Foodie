/**
 * Created by huhao on 14-11-06.
 */
var mongoose = require('mongoose');
var userModel = require('../data').user;
var UserDao = require("../dao/UserDao");
var TopicDao = require('../dao/TopicDao');
var UsersModel = require('../data').user;
var querystring = require('querystring');
//var formidable = require('formidable');
//构造
function AdminHandler()
{

}

AdminHandler.addUser = function(req, res)
{
    req.on('data',function(data)
    {
        var obj = JSON.parse(data.toString());
        var str = '插入信息:' + obj.name + ':' + obj.tel + ':' + obj.account + ':' + obj.type + ':' + obj.sex + ':' + obj.password;
	    //(name,account,cellphone,password,type,sex)
	    var user = createUser(obj.name,obj.account,obj.tel,obj.password,obj.type,obj.sex);
	    UserDao.save(user,function (err, data)
	    {
		    if(err)
		    {

			    str = 'Add user error';// + str;
			    res.send(str);
			    console.log(err);

		    }else
		    {
			    str = 'Add success';// + str ;
			    res.send(str);
			    console.log(data);

		    }

	    });
        //res.send(str);
        //res.json(200, {message: "admin/add"});
    });
};

AdminHandler.updateUser = function(req, res)
{
	var account = req.param('account');
	var username = req.param('username');
	var phone = req.param('phone');
	var type = req.param('type');
	var sex = req.param('sex');
	var password = req.param('password');
//	console.log(account);
//	console.log(username);
//	console.log(phone);
//	console.log(type);
//	console.log(sex);
//	console.log(password);

    var conditions = {account : account};
	var update = {$set : {username:username,phone:phone,sex:sex,type:type,password:password}};
	var options = {update : true};

	UserDao.update(conditions,update,options,function (err, data)
	{
	    if(err)
	    {
	        console.log(err);
		    res.json({info:0});
	    }else
	    {

	        console.log(data);
		    res.json({info:1});
	    }

	});

};

AdminHandler.getAllUsers = function(req,res)
{
    UserDao.getAllUsers(function (err, data)
    {
        if(err)
        {
            console.log(err);

        }else
        {

            console.log(data);

        }

    });
    //res.send("admin/getAllUsers");
    res.json(200, {message: "admin/getAllUsers"});
}

AdminHandler.getUsers = function(req,res)
{
	req.setEncoding('utf-8');
	var postData = "";

	req.addListener("data", function (postDataChunk) {
		postData += postDataChunk;
	});
	// 数据接收完毕，执行回调函数
	req.addListener("end", function () {
		console.log('search-user数据接收完毕');
		var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
		var name = params.name;
		var account = params.account;
		var phone = params.phone;

		var pageNo = params.pageNo,
			pageSize = params.pageSize;

		if(name!=null && account!=null && phone!=null)
		{
			var conditions ={name : name,account : account,phone : phone };
			UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
			{
				//console.log(users);
				UserDao.getUserNum(conditions,function(err,num)
				{
					res.json({users:users,total:num});
				});

			});
		}else if(name!=null && account!=null)
		{
			var conditions ={name : name,account : account};
			UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
			{
				//console.log(users);
				UserDao.getUserNum(conditions,function(err,num)
				{
					res.json({users:users,total:num});
				});
			});
		}else if(name!=null && phone!=null)
		{
			var conditions ={name : name,phone : phone };
			UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
			{
				//console.log(users);
				UserDao.getUserNum(conditions,function(err,num)
				{
					res.json({users:users,total:num});
				});
			});
		}else if(account!=null && phone!=null)
		{
			var conditions ={account : account,phone : phone };
			//var users =
			UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
			{
				//console.log(users);
				UserDao.getUserNum(conditions,function(err,num)
				{
					res.json({users:users,total:num});
				});
			});
		}else if(name!=null)
		{
			var conditions ={username : name};
			UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
			{
				//console.log(users);
				UserDao.getUserNum(conditions,function(err,num)
				{
					res.json({users:users,total:num});
				});
			});
		}else if(account!=null)
		{
			var conditions ={account : account};
			UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
			{
				//console.log(users);
				UserDao.getUserNum(conditions,function(err,num)
				{
					res.json({users:users,total:num});
				});
			});
		}else if(phone!=null)
		{
			var conditions ={phone : phone };
			UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
			{
				//console.log(users);
				UserDao.getUserNum(conditions,function(err,num)
				{
					res.json({users:users,total:num});
				});
			});
		}

	});
//    req.on('data',function(data)
//    {
//        var obj = JSON.parse(data.toString());
//	    var m_account = obj.account;
//	    var m_tel = obj.tel;
//	    var m_name = obj.name;
//	    if(m_account !=  "用户账户" && m_tel != "电话" && m_name !="姓名")
//	    {
//		    var conditions ={name : m_name,account : m_account,phone : m_tel };
//		    var list = UsersModel.find(conditions);
//          UserDao.getUsers(conditions,function (err, users)
//		    {
//			    if(err)
//			    {
//				    console.log(err);
//				    return 0;
//
//			    }else
//			    {
//				    //user = users;
//				    console.log(users);
//				    return users;
//			    }

		    //});

		    //res.send(JSON.stringify(list));
//		    while(list.hasNext())
//		    {
//			    r = list.next();
//		        console.log(r["name"]);
//		    }

//		    cursor.references.forEach
//		    (
//			    function(ref)
//			    {
//				    var str = '信息为:' + user.name + ':' + user.tel + ':' + user.account + ':' + user.type + ':' + user.sex + ':' + user.password;
//				    res.send(str);
//			    }
//		    );
//
//
//		    return 0;
//
//	    }
//
//	    //var str = '信息为:' + obj.name + ':'
//
//
//
//        res.json(200, {message: "admin/getUserById"});
//    });
}


AdminHandler.getUsers1 = function(req,res)
{
	var pageNo = req.param('pageNo');
	var pageSize = req.param('pageSize');
	var name = req.param('name');
	var account = req.param('account');
	var phone = req.param('phone');

	//console.log(111111);
	if(name!='' && account!='' && phone!='')
	{
		var conditions ={name : name,account : account,phone : phone };
		UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
		{
			//console.log(users);
			UserDao.getUserNum(conditions,function(err,num)
			{
				res.json({users:users,total:num});
			});

		});
	}else if(name!='' && account!='')
	{
		var conditions ={name : name,account : account};
		UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
		{
			//console.log(users);
			UserDao.getUserNum(conditions,function(err,num)
			{
				res.json({users:users,total:num});
			});
		});
	}else if(name!='' && phone!='')
	{
		var conditions ={name : name,phone : phone };
		UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
		{
			//console.log(users);
			UserDao.getUserNum(conditions,function(err,num)
			{
				res.json({users:users,total:num});
			});
		});
	}else if(account!='' && phone!='')
	{
		var conditions ={account : account,phone : phone };
		//var users =
		UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
		{
			//console.log(users);
			UserDao.getUserNum(conditions,function(err,num)
			{
				res.json({users:users,total:num});
			});
		});
	}else if(name!='')
	{
		var conditions ={username : name};
		UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
		{
			//console.log(users);
			UserDao.getUserNum(conditions,function(err,num)
			{
				res.json({users:users,total:num});
			});
		});
	}else if(account!='')
	{
		var conditions ={account : account};
		UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
		{
			//console.log(users);
			UserDao.getUserNum(conditions,function(err,num)
			{
				res.json({users:users,total:num});
			});
		});
	}else if(phone!='')
	{
		var conditions ={phone : phone };
		UserDao.getUsers(pageNo,pageSize,conditions,function(err,users)
		{
			//console.log(users);
			UserDao.getUserNum(conditions,function(err,num)
			{
				res.json({users:users,total:num});
			});
		});
	}
}

AdminHandler.deleteUser = function(req,res)
{
	var userAccount = req.param('userAccount');
	var conditions ={account : userAccount};
	UserDao.delete(conditions,function(err,data)
	{
		if(err)
		{
			console.log(err);
			res.json({info:err});

		}else
		{

			console.log(data);
			res.json({info:data});
		}

	});

}

AdminHandler.getUserByAccount = function(req,res)
{
	var account = req.param('account');

	UserDao.getUserByAccount(account,function(err,user)
	{
		if(err)
		{
			console.log(err);
			res.json({user:err});

		}else
		{

			console.log(user);
			res.json({user:user});
		}
	});
}

function createUser(name,account,cellphone,password,type,sex)
{

    var user = new userModel();
    user.username = name;
    user.account= account;
    user.password= password;
    user.type = type;
    user.phone = cellphone;
    user.sex = sex;
//    user.head = "headIconPath";
//    var friends0 =[];
//    friends0[0] = {id:120,account:"amount1"};
//    friends0[1] = {id:121,account:"amount2"};
//    user.friends = friends0;
//    var fan0 =[];
//    fan0[0] = {id:120,account:"amount1"};
//    fan0[1] = {id:121,account:"amount2"};
//    user.fans = fan0;
//    user.recipe_count = 0;
//    user.topic_count = 0;
//    user.blog_count = 0;
//   user.comment_count = 0;
//    user.friends_count = 0;
//    user.fans_count = 0;

    return user;
};


module.exports = AdminHandler;
