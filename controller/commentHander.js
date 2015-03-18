/**
 * Created by mengchi on 14-11-6.
 */
var Comment = require('../data/models/comment');

var db = require('../util/database');

function CommentHander(){

}

CommentHander.addComment=function(comment,callback){

    comment.save(function (err, newComment) {
        if (err) {
            var message = "save comment failed"+err;
            callback(message);
        } else {
            message = "save comment successful";
            callback(null,newComment);
        }
    });
}

CommentHander.deleteComment=function(comment_id,callback){
    var conditions={_id:comment_id}
    Comment.remove(conditions, function (error,info) {
        if (error) {
            console.log(error);
            var message = "delete comment failed"+err;
            callback(message);
        } else {
            console.log('delete ok!');
            message= "delete ok!"
            callback(null,message)
        }
    });
}