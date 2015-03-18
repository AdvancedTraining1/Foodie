/**
 * Created by zhaiyuan on 12/6/14.
 */

'use strict';


function ToListFriendStatusRecipe($scope, $http, $location){
    $scope.recipes = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 3,
        pageSize :5
    };

    $(function(){
        paging();
    });

    $scope.list = function () {
        paging();
    };

    function paging(){
        var api = "/service/attention/lookFriendStatusRecipe";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.recipes = data.root;console.log("root=="+data.root);
            $scope.pageing.itemsCount = data.total;console.log("total=="+data.total);
        }).error(function(data, status) {

        });
    }

    $scope.toRecipe = function() {
        $location.path('/attention/friendStatusListRecipe');
    };


    $scope.toBlog = function() {
        $location.path('/attention/friendStatusListBlog');
    };

    $scope.toTopic = function() {
        $location.path('/attention/friendStatusListTopic');
    };
}


function ToListFriendStatusBlog($scope, $http, $location){
    $scope.blogs = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 3,
        pageSize :5
    };

    $(function(){
        paging();
    });

    $scope.list = function () {
        paging();
    };

    function paging(){
        var api = "/service/attention/lookFriendStatusBlog";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.blogs = data.root;console.log("root=="+data.root);
            $scope.pageing.itemsCount = data.total;console.log("total=="+data.total);
        }).error(function(data, status) {

        });
    }

    $scope.toRecipe = function() {
        $location.path('/attention/friendStatusListRecipe');
    };


    $scope.toBlog = function() {
        $location.path('/attention/friendStatusListBlog');
    };

    $scope.toTopic = function() {
        $location.path('/attention/friendStatusListTopic');
    };
}


function ToListFriendStatusTopic($scope, $http, $location){
    $scope.topics = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 3,
        pageSize :5
    };

    $(function(){
        paging();
    });

    $scope.list = function () {
        paging();
    };

    function paging(){
        var api = "/service/attention/lookFriendStatusTopic";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.topics = data.root;console.log("root=="+data.root);
            $scope.pageing.itemsCount = data.total;console.log("total=="+data.total);
        }).error(function(data, status) {

        });
    }

    $scope.toRecipe = function() {
        $location.path('/attention/friendStatusListRecipe');
    };


    $scope.toBlog = function() {
        $location.path('/attention/friendStatusListBlog');
    };

    $scope.toTopic = function() {
        $location.path('/attention/friendStatusListTopic');
    };
}



function ToListAllAttention($scope,$routeParams, $http, $location){
    //$scope.search = $routeParams.search;
    //alert($routeParams.search);

    $scope.seeAttention = true;

    $scope.users = {};
    $scope.pageing={
        pageNo : 1,  //页码
        itemsCount : 3,  //总共
        pageSize :9  //每页有几个
    };

    $(function(){
        paging();
    });

    $scope.list = function () { //下一页
        pagingSearch();
    };

    function pagingSearch(){
        var api = "/service/attention/searchAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $routeParams.search
        }).success(function(data, status) {
            $scope.users = data.root;
            $scope.pageing.itemsCount = data.total;
            /*for(var i in $scope.users){
                var friendId=$scope.users[i]._id;

                checkAttention(friendId);
            }*/
        }).error(function(data, status) {

        });
    }

    function paging(){
        var api = "/service/attention/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.users = data.root;
            $scope.pageing.itemsCount = data.total;
            /*for(var i in $scope.users){
                var friendId=$scope.users[i]._id;

                checkAttention(friendId);
            }*/
        }).error(function(data, status) {

        });

    }

    $(function(){
        //alert($routeParams.search);
        var api = "/service/attention/searchAll";
        if($routeParams.search == ""){
            paging();
        }else{
            $http({
                method: 'GET',
                url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $routeParams.search
            }).success(function(data, status) {
                $scope.users = data.root;
                $scope.pageing.itemsCount = data.total;
                /*for(var i in $scope.users){
                    var friendId=$scope.users[i]._id;

                    checkAttention(friendId);
                }*/
            }).error(function(data, status) {

            });

        }
    });


    function checkAttention(friendId){

        var checkApi = '/service/attention/check/' + friendId;

        $http({
            method: 'GET',
            url: checkApi
        }).success(function(data){
            if(data == "false"){

                $scope.seeAttention = true;//show attention

            }else{

                $scope.seeAttention = false;//show cancel attention
            }
        });

    };

    $scope.addAttention = function(friendId,friendAccount,friendHead){

        var checkApi = '/service/attention/addAttentions/' + '?friendId='+friendId+'&friendAccount='+friendAccount+'&friendHead='+friendHead;

        $.get(checkApi,function(data) {
            alert(data);
            /*if(data){
                alert(data);
                *//*$("#at"+friendId).hide();
                $("#att"+friendId).show();*//*
                //pagingSearch();
                //$scope.seeAttention = false;

            }else{
                alert(data);
                //pagingSearch();
                //$scope.seeAttention = false;

            }
*/

        })

    };

    $scope.deleteAttention = function(friendId,friendAccount,friendHead){

        var checkApi = '/service/attention/deleteAttentions/'  + '?friendId='+friendId+'&friendAccount='+friendAccount+'&friendHead='+friendHead;

        $.get(checkApi,function(data) {

            if(data){
                alert(data);
                $scope.seeAttention = true;
                pagingSearch();

            }else{
                alert("already cancel!");
                $scope.seeAttention = true;
                pagingSearch();

            }
        })

    };
}



function ToLookOneRecipe($scope,$routeParams, $http, $location,$upload){
    //$scope.search = $routeParams.friendId;
    /*$(function(){
        var api = "/service/attention/lookOneFriendStatusRecipe";

        $http({
            method: 'GET',
            url: api +'&queryStr=' + $routeParams.recipeId
        }).success(function(data, status) {
            $scope.recipe = data.root;
        }).error(function(data, status) {

        });

    });

*/

    $scope.id = $routeParams.recipeId;
    $scope.noComment = true;
    $scope.noProduct = true;
    $scope.comments = {};
    $scope.comment = {};
    $scope.product = {};
    $scope.collect = {};
    $scope.productSee = false;
    $scope.seeCollect = true;
    $scope.commentPaging={
        pageNo : 1,
        itemsCount : 10,
        pageSize :5
    };
    $scope.productPaging={
        pageNo : 1,
        itemsCount : 10,
        pageSize :6
    };

    $(function(){
        var recipeApi = "/service/recipe/showOne";
        $http({
            method: 'GET',
            url: recipeApi + '/'+$scope.id     //注意与 url: api +'&queryStr=' + $routeParams.recipeId一样
        }).success(function(data, status) {
            $scope.recipe = data;
        }).error(function(data, status) {

        });

        commentPage();
        productPage();
    });

    $scope.list = function () {
        commentPage();
    };

    function commentPage(){
        var commentApi = "/service/recipe/listComment";
        $http({
            method: 'GET',
            url: commentApi + '?pageNo=' + $scope.commentPaging.pageNo + '&pageSize='+$scope.commentPaging.pageSize + '&recipeId='+$scope.id
        }).success(function(data, status) {
            $scope.commentPaging.itemsCount = data.total;
            $scope.comments = data.root;
            if(data.total != 0){
                $scope.noComment = false;
            }
        }).error(function(data, status) {

        });
    }

    $scope.addComment = function(replyUserId){
        var api = "/service/recipe/comment";
        $scope.comment.authorId = 11;
        $scope.comment.replyId = $scope.id;
        $scope.comment.replyUserId = replyUserId;

        $.post(api,$scope.comment,function(data){
            alert(data);
            commentPage();
            $scope.comment.content = null;
            $scope.recipe.commentNum += 1;
        });
    };

    $scope.listProduct = function () {
        productPage();
    };

    function productPage(){
        var commentApi = "/service/recipe/listProduct";
        $http({
            method: 'GET',
            url: commentApi + '?pageNo=' + $scope.productPaging.pageNo + '&pageSize='+$scope.productPaging.pageSize + '&recipeId='+$scope.id
        }).success(function(data, status) {
            $scope.productPaging.itemsCount = data.total;
            $scope.products = data.root;
            if(data.total != 0){
                $scope.noProduct = false;
            }
        }).error(function(data, status) {

        });
    }

    $scope.onFileSelect = function ($files) {               //file upload????????????
        if($files != null){
            $scope.upload = $upload.upload({
                url: '/service/recipe/upload',
                file: $files
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {        // file is uploaded successfully
                console.log(data);
                alert("Product image upload success!");
                $scope.product.picture = data;
                $scope.productSee = true;
            });
        }
    };

    $scope.addProduct = function(){
        var api = "/service/recipe/createProduct";
        $scope.product.authorId = 11;
        $scope.product.recipeId = $scope.id;

        $.post(api,$scope.product,function(data){
            alert(data);
            productPage();//ci chu qing hu lue
            $scope.product.content = null;
            $scope.recipe.productNum += 1;
        });
    };

    $scope.addCollect = function(){
        var api = "/service/recipe/collect";
        $scope.collect.userId = 11;
        $scope.collect.recipeId = $scope.id;

        var checkApi = '/service/recipe/checkCollect' + '?&recipeId='+$scope.collect.recipeId;

        $.get(checkApi,function(data){
            if(data == "false"){
                $.post(api,$scope.collect,function(data){
                    alert(data);
                    productPage();
                    $scope.seeCollect = false;
                    $scope.recipe.collectNum += 1;
                });
            }else{
                alert("Already collected");
                productPage();
                $scope.seeCollect = false;
            }
        });
    };

    $scope.toRecipe = function() {
        $location.path('/attention/friendStatusListRecipe');
    };

    $scope.toBlog = function() {
        $location.path('/attention/friendStatusListBlog');
    };

    $scope.toTopic = function() {
        $location.path('/attention/friendStatusListTopic');
    };
}



function ToLookOneBlog($scope,$routeParams, $http, $location,$upload){
    //$scope.search = $routeParams.friendId;
    /*$(function(){
        var api = "/service/attention/lookOneFriendStatusBlog";

        $http({
            method: 'GET',
            url: api +'&queryStr=' + $routeParams.blogId
        }).success(function(data, status) {
            $scope.blog = data.root;
        }).error(function(data, status) {

        });

    });*/


    $scope.id = $routeParams.blog_id;
    $scope.seeCollect = true;

    console.log("id------",$scope.id);
    $scope.noComment = true;
    $scope.comments = {};
    $scope.comment = {};
    $scope.collect = {};
    $scope.blog = {};
    $scope.content = {};

    $scope.commentPaging = {
        pageNo: 1,
        itemsCount: 10,
        pageSize: 5
    };

    $(function () {
        paging();
    });

    $scope.list = function () {
        commentPage();
    };

    function paging(){
        $http({
            method: 'GET',
            url: "blog/showBlogDetail/" + $scope.id
        }).success(function (data, status) {
            $scope.blog = data.blog;

            document.getElementById("post_content").innerHTML = data.blog.content;

        }).error(function (data, status) {

        });

        commentPage();
        checkCollection();
    }

    function commentPage() {
        var commentApi = "/blog/showCommentListToBlog";
        $http({
            method: 'GET',
            url: commentApi + '?pageNo=' + $scope.commentPaging.pageNo + '&pageSize=' + $scope.commentPaging.pageSize + '&blog_id=' + $scope.id
        }).success(function (data, status) {
            $scope.commentPaging.itemsCount = data.total;
            $scope.comments = data.root;

            console.log($scope.comments);
            if (data.total != 0) {
                $scope.noComment = false;
            }
        }).error(function (data, status) {

        });
    }

    function checkCollection(){

        var checkApi = '/blog/checkCollection/' + $scope.id;

        $http({
            method: 'GET',
            url: checkApi
        }).success(function(data,status){
            console.log("data-------"+data);
            if(data == "false"){

                $scope.seeCollect = true;


            }else{

                $scope.seeCollect = false;
            }
        });

    };

    $scope.addComment = function () {

        $scope.comment.blog_id = $routeParams.blog_id;


        $.post("/blog/addCommentToBlog", $scope.comment, function (data) {
            alert(data);
            commentPage();
            $scope.comment.content = null;
            $scope.blog.comment_count += 1;
        });
    };

    $scope.addCollect = function(){

        var checkApi = '/blog/collectionBlog/' + $routeParams.blog_id;

        $.get(checkApi,function(data) {
            alert(data.status);

            if(data.status){

                alert(data.message);
                paging();
                //   $scope.blog.collect_count += 1;
                $scope.seeCollect = false;

            }else{
                alert(data.message);
            }


        })

    };

    $scope.deleteCollect = function(){

        var checkApi = '/blog/cancellationBlog/' + $routeParams.blog_id;

        $.get(checkApi,function(data) {

            if(data.status){

                alert(data.message);
                paging();
                //       $scope.blog.collect_count -= 1;
                $scope.seeCollect = true;

            }else{
                alert(data.message);
            }
        })

    };

    $scope.addLike = function(){

        var checkApi = '/blog/likeBlog/' + $routeParams.blog_id;

        $.get(checkApi,function(data) {


            if(data.status){

                alert(data.message);
                paging();


            }else{
                alert(data.message);
            }


        })

    };



    $scope.toRecipe = function() {
        $location.path('/attention/friendStatusListRecipe');
    };

    $scope.toBlog = function() {
        $location.path('/attention/friendStatusListBlog');
    };

    $scope.toTopic = function() {
        $location.path('/attention/friendStatusListTopic');
    };

}



function ToLookOneTopic($scope,$routeParams, $http, $location,$upload){
    //$scope.search = $routeParams.friendId;
    /*$(function(){
        var api = "/service/attention/lookOneFriendStatusTopic";

        $http({
            method: 'GET',
            url: api +'&queryStr=' + $routeParams.search
        }).success(function(data, status) {
            $scope.users = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });

    });*/


    $scope.id = $routeParams.topic_id;
    $scope.topic={}
    $scope.noupload = true;
    $scope.uploads = {};
    $scope.upload = {};
    $scope.picture={};
    $scope.topicUpload={};

    $scope.uploadPaging = {
        pageNo: 1,
        itemsCount: 10,
        pageSize: 5
    };

    $(function () {
        paging();
    });

    $scope.list = function () {
        uploadPage();
    };

    function paging(){
        $http({
            method: 'GET',
            url: "topic/showTopicDetail/" + $scope.id
        }).success(function (data, status) {
            console.log(data);
            $scope.topic = data.topic;

        }).error(function (data, status) {

        });

        uploadPage();

    }

    function uploadPage() {
        var commentApi = "/topic/getUploadToATopic";
        $http({
            method: 'GET',
            url: commentApi + '?pageNo=' + $scope.uploadPaging.pageNo + '&pageSize=' + $scope.uploadPaging.pageSize + '&topic_id=' + $scope.id
        }).success(function (data, status) {
            $scope.uploadPaging.itemsCount = data.total;
            $scope.uploads = data.uploads;

            console.log($scope.uploads);
            if (data.total != 0) {
                $scope.noupload = false;
            }
        }).error(function (data, status) {

        });
    }



    $scope.uploadProduct = function () {

        $scope.topicUpload.topic_id = $scope.id;
        $scope.topicUpload.picture = $scope.picture;


        $.post("/topic/uploadProduct", $scope.topicUpload, function (data) {
            if(data.status){
                alert("upload successful");
                paging();
                document.getElementById("close").click();

            }

        });
    };

    $scope.onFileSelect = function ($files) {
        console.log("yes");
        console.log($files);
        if($files != null){
            $scope.upload = $upload.upload({
                url: '/topic/upload',
                file: $files
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {        // file is uploaded successfully
                $scope.picture=data;
                alert("upload success!");

            });
        }
    };




    $scope.toRecipe = function() {
        $location.path('/attention/friendStatusListRecipe');
    };

    $scope.toBlog = function() {
        $location.path('/attention/friendStatusListBlog');
    };

    $scope.toTopic = function() {
        $location.path('/attention/friendStatusListTopic');
    };
}