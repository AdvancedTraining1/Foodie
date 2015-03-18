/**
 * Created by mengchi on 14-11-9.
 */
var DaoBase = require('./DaoBase'),
    Blog = require('./../data').Blog;

var BlogDao = new DaoBase(Blog);

module.exports = BlogDao;

BlogDao.getOwn = function (authorId,callback) {
    Blog.find({"author.id":authorId}).sort({'create_at':-1}).exec(function(error,blog){
        if(error) return callback(error,null);

        return callback(null, blog);
    });
}

BlogDao.update = function( conditions, update ,options, callback) {
    Blog.update(conditions, update, options, function (error,doc) {
        if(error) return callback(error);
        return callback(null,doc);
    });

};

BlogDao.create = function(blogNew,callback){
    blogNew.save(function (error, newblog){
        if(error) return callback(error,null);

        return callback(null, newblog);
    });
}

BlogDao.delete = function (list,callback) {
    Blog.remove({_id:{$in:list}}).exec(function(error,blog){
        if(error) return callback(error,null);

        return callback(null, blog);
    });
}

BlogDao.getAll = function (pageNo,pageSize,callback) {
    Blog.find({}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'create_at':-1}).exec(function(error,blogs){
        if(error) return callback(error,null);
        return callback(null, blogs);
    });
};
BlogDao.getUserBlogs = function (pageNo,pageSize,user_id,callback) {
    Blog.find({ 'author.id':user_id}).skip((pageNo-1)*pageSize).limit(pageSize).sort({'create_at':-1}).exec(function(error,blogs){
        if(error) return callback(error,null);
        return callback(null, blogs);
    });
};
BlogDao.getUserBlogNum = function (user_id,callback) {
    Blog.count({ 'author.id':user_id}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};
BlogDao.getAllNum = function (callback) {
    Blog.count({}).exec(function(error,num){
        if(error)
            return callback(error,null);
        return callback(null, num);
    });
};

BlogDao.getOne = function (id,callback) {
    Blog.findOne({_id:id}).exec(function(error,blog){
        if(error) return callback(error,null);
        return callback(null, blog);
    });
};

BlogDao.searchBlog = function (query,callback) {
    var str = ""+query+".*";
    //{ $regex: str} 第一种使用正则表达式的方式
    //var str1 = new RegExp(query); 第二种使用正则表达式的方式
    Blog.find({blogName:{ $regex: str}}).sort({'create_at':-1}).limit(10).exec(function(error,blog){
        if(error) return callback(error,null);

        return callback(null, blog);
    });
}
