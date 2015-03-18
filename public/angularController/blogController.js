/**
 * Created by mengchi on 12/5/14.
 */
'use strict';

function ToCreateBlog($scope, $http,$location) {
    $scope.id = {}

    $scope.createBlog = function () {
        $scope.blog={}

        var title =  $scope.blogtitle;

        var content=$('#editor').html();
        $scope.blog.title =title;
        $scope.blog.content = content;
        $scope.blog.tags=$scope.blogtag;


        $.post('/blog/publishBlog',$scope.blog,function(data){
            $location.path("/blog/blogDetail_angular/"+data.newId);
            $scope.$apply();
        });

    }

}

function ToListBlog($scope, $http, $location){
    $scope.blogs = {};
    $scope.collect = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 10,
        pageSize :5
    };

    $(function(){
        pageing();
    });

    $scope.list = function () {
        pageing();
    };

    function pageing(){
        var api = "/blog/showBlogList";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.blogs = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }

   /* $scope.searchRecipe = function(){
        var api = "/service/recipe/search";
        if($scope.search == ""){
            pageing();
        }else{
            $http({
                method: 'GET',
                url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $scope.search
            }).success(function(data, status) {
                $scope.recipes = data.root;
                $scope.pageing.itemsCount = data.total;
            }).error(function(data, status) {

            });
        }
    };*/


}

function BlogDetail($scope, $routeParams,$http, $location,$upload) {
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

            commentPage();
            $scope.comment.content = null;

        });
    };

    $scope.addCollect = function(){

        var checkApi = '/blog/collectionBlog/' + $routeParams.blog_id;

        $.get(checkApi,function(data) {


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



}
