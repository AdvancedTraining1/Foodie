/**
 * Created by zhaiyuan on 14-11-9.
 */

var DaoBase = require('./DaoBase');
var User = require('./../data').user;
var Blog = require('./../data').Blog;
var Topic = require('./../data').Topic;
var Attentions = require('../data/models/user');
var Recipe = require('./../data').Recipe;


var AttentionsDao = new DaoBase(User);

module.exports = AttentionsDao;

AttentionsDao.getAllAttentions = function (pageNo,pageSize,callback) {

    User.find({flag:true}).sort({'fans_count':-1}).skip((pageNo-1)*pageSize).limit(pageSize).exec(function(error,users){
        if(error)
            return callback(error,null);
        return callback(null, users);
    });

}

AttentionsDao.searchAllAttentions = function (pageNo,pageSize,queryStr,callback) {

    var str = ""+queryStr+".*";

    User.find({username:{ $regex: str}}).sort({'fans_count':-1}).skip((pageNo-1)*pageSize).limit(pageSize).exec(function(error,users){
        if(error) return callback(error,null);

        return callback(null, users);
    });
}

AttentionsDao.getNum = function (callback) {
    User.count({flag:true}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};


AttentionsDao.searchNum = function (query,callback) {
    var str = ""+query+".*";
    //{ $regex: str} 第一种使用正则表达式的方式
    //*var str1 = new RegExp(query); //第二种使用正则表达式的方式

    User.count({username:{ $regex: str}}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};
//---------------------------------------------------------------------------------------------------------------------------

AttentionsDao.check = function (userId,friendId,callback) {
    User.find({_id:userId,"friends._id":friendId},function(error,attention){
        if(error)
            return callback(error,null);
        return callback(null, attention);
    }); //db.blogs.find({"comment":{"$elemMatch":{"author":"joe", "score":{"$gte":5}}}});
};

AttentionsDao.addAttentions = function (id,friends,callback) {
    User.findByIdAndUpdate(id,{$push:{friends:friends},$inc:{friends_count:1}},function(error,users){
    //User.findByIdAndUpdate(id,{$push:{"friends._id":friendId},$inc:{friends_count:1}},function(error,users){
        return callback(null,users);
    });

}

AttentionsDao.addAttentionsFans = function (id,fans,callback) {
    User.findByIdAndUpdate(id,{$push:{fans:fans},$inc:{fans_count:1}},function(error,users){
        if(error) return callback(error,null);

        return callback(null, users);
    });

}


AttentionsDao.deleteAttentions = function (id,friends,callback) {
    User.findByIdAndUpdate(id,{$pull:{friends:friends},$inc:{friends_count:-1}},function(error,users){
        return callback(null,users);
    });

}

AttentionsDao.deleteAttentionsFans = function (id,fans,callback) {
    User.findByIdAndUpdate(id,{$pull:{fans:fans},$inc:{fans_count:-1}},function(error,users){
        if(error) return callback(error,null);

        return callback(null, users);
    });

}
//---------------------------------------------------------------------------------------------------------------------------

AttentionsDao.lookFriendStatusRecipe = function (sessionId,pageNo,pageSize,callback) {
    var friendIdList=[];
    //var sessionId="5464a134462eaef3480abb39";//ZHAI id

    User.find({_id:sessionId},function(err,user) {
      if(err) return callback(err,null);
      else {
          for (var i = 0, len = user[0].friends.length; i < len; i++) {
              friendIdList = friendIdList + user[0].friends[i]._id + ",";
          }
          console.log("friendIdList==" + friendIdList);
          Recipe.find({"author._id": {$in: friendIdList.split(",")}}).sort({'logTime': -1}).skip((pageNo - 1) * pageSize).limit(pageSize).exec(function (err, recipes) {
              if (err) return callback(err, null);

              return callback(null, recipes);
          });
      }
    });

}

AttentionsDao.getFriendStatusRecipeNum = function (sessionId,callback) {
    var friendIdList=[];
    //var sessionId="5464a134462eaef3480abb39";//ZHAI id

    User.find({_id:sessionId},function(err,user) {
      if(err) return callback(err,null);
      else {
          for (var i = 0, len = user[0].friends.length; i < len; i++) {
              friendIdList = friendIdList + user[0].friends[i]._id + ",";
          }
          Recipe.count({"author._id": {$in: friendIdList.split(",")}}).exec(function (err, num) {
              console.log("num==" + num);
              if (err) return callback(err, null);

              return callback(null, num);
          });
      }
    });

};


AttentionsDao.lookFriendStatusBlog = function (sessionId,pageNo,pageSize,callback) {
    var friendIdList=[];
    //var sessionId="5464a134462eaef3480abb39";//ZHAI id

    User.find({_id:sessionId},function(err,user) {
      if(err) return callback(err,null);
      else {
          for (var i = 0, len = user[0].friends.length; i < len; i++) {
              friendIdList = friendIdList + user[0].friends[i]._id + ",";
          }
          console.log("friendIdList==" + friendIdList);
          Blog.find({"author.id": {$in: friendIdList.split(",")}}).sort({'create_at': -1}).skip((pageNo - 1) * pageSize).limit(pageSize).exec(function (err, blogs) {
              if (err) return callback(err, null);

              return callback(null, blogs);
          });
      }
    });

}

AttentionsDao.getFriendStatusBlogNum = function (sessionId,callback) {
    var friendIdList=[];
    //var sessionId="5464a134462eaef3480abb39";//ZHAI id

    User.find({_id:sessionId},function(err,user) {
      if(err) return callback(err,null);
      else {
          for (var i = 0, len = user[0].friends.length; i < len; i++) {
              friendIdList = friendIdList + user[0].friends[i]._id + ",";
          }
          Blog.count({"author.id": {$in: friendIdList.split(",")}}).exec(function (err, num) {
              console.log("num==" + num);
              if (err) return callback(err, null);

              return callback(null, num);
          });
      }
    });

};



AttentionsDao.lookFriendStatusTopic = function (sessionId,pageNo,pageSize,callback) {
    var friendIdList=[];
    //var sessionId="5464a134462eaef3480abb39";//ZHAI id

    User.find({_id:sessionId},function(err,user) {
      if(err) return callback(err,null);
      else {
          for (var i = 0, len = user[0].friends.length; i < len; i++) {
              friendIdList = friendIdList + user[0].friends[i]._id + ",";
          }
          console.log("friendIdList==" + friendIdList);
          Topic.find({"author.id": {$in: friendIdList.split(",")}}).sort({'time': -1}).skip((pageNo - 1) * pageSize).limit(pageSize).exec(function (err, topics) {
              if (err) return callback(err, null);

              return callback(null, topics);
          });
      }
    });

}

AttentionsDao.getFriendStatusTopicNum = function (sessionId,callback) {
    var friendIdList=[];
    //var sessionId="5464a134462eaef3480abb39";//ZHAI id

    User.find({_id:sessionId},function(err,user) {
      if(err) return callback(err,null);
      else {
          for (var i = 0, len = user[0].friends.length; i < len; i++) {
              friendIdList = friendIdList + user[0].friends[i]._id + ",";
          }
          Topic.count({"author.id": {$in: friendIdList.split(",")}}).exec(function (err, num) {
              console.log("num==" + num);
              if (err) return callback(err, null);

              return callback(null, num);
          });
      }
    });

};


AttentionsDao.addRecipe = function (newrecipe,callback){//recipe -----test
    newrecipe.save(function (error,newrec) {
        if(error) return callback(error,null);
        return callback(null,newrec);
    });
};

AttentionsDao.addBlog = function (newblog,callback){//blog -----test
    newblog.save(function (error,newblog) {
        if(error) return callback(error,null);
        return callback(null,newblog);
    });
};

AttentionsDao.addTopic = function (newtopic,callback){//topic -----test
    newtopic.save(function (error,newtoc) {
        if(error) return callback(error,null);
        return callback(null,newtoc);
    });
};