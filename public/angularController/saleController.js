/**
 * Created by zhangcan on 14-11-28.
 */

'use strict';

function CreateTradePost($scope, $http, $location){
    $scope.sale = {};

    $scope.publishTradePost = function () {
        var content = $('#editor').html();
        $scope.sale.content = content;
        $.post('/sale/create',$scope.sale,function(data){
            alert(data);

        });
        $location.path('/sale/listTradePost_angular/');
    }
}

function ListTradePost($scope, $http, $location){
    $scope.sales = {}
    $scope.collect = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 10,
        pageSize : 5
    };

    $(function(){
        pageing();
    });

    $scope.list = function () {
        pageing();
    };

    function pageing(){
        var api = "/sale/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize=' + $scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.sales = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }

    $scope.searchTradePost = function () {

    }
}

function ShowTradePost($scope, $routeParams, $http, $location){
    $scope.id = $routeParams.saleId;
    console.log($scope.id);
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

    function paging(){
        var saleApi = "/sale/getOne";
        $http({
            method: 'GET',
            url: saleApi + '/' + $scope.id
        }).success(function(data, status) {
            $scope.sale = data;
            document.getElementById("post_content").innerHTML = data.content;
        }).error(function(data, status) {

        });

        commentPage();
        checkCollection();
    }

    $(function(){
        paging();
    });

    $scope.list = function () {
        commentPage();
    };

    function commentPage(){
        var commentApi = "/sale/showCommentList";
        $http({
            method: 'GET',
            url: commentApi + '?pageNo=' + $scope.commentPaging.pageNo + '&pageSize=' + $scope.commentPaging.pageSize + '&saleId=' + $scope.id
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

        var checkApi = '/sale/checkCollection/' + $scope.id;

        $http({
            method: 'GET',
            url: checkApi
        }).success(function(data,status){
            console.log("data-------"+data);
            if(data == "false")
            {
                $scope.seeCollect = true;
            }
            else
            {
                $scope.seeCollect = false;
            }
        });

    }

    $scope.addComment = function () {

        $scope.comment.blog_id = $routeParams.saleId;

        //alert(JSON.stringify($scope.comment));
        $.post("/sale/addSaleComment", $scope.comment, function (data) {
            alert("success");
            commentPage();
            $scope.comment.content = null;
            $scope.sale.commentNum += 1;
        });
    };

    $scope.addCollect = function(){

        var checkApi = '/sale/addSaleCollection/' + $routeParams.saleId;

        $.get(checkApi,function(data) {

            if(data.status){

                alert(data.message);
                $scope.seeCollect = false;
                paging();
                //   $scope.blog.collect_count += 1;


            }else{
                alert(data.message);
            }


        })

    };

    $scope.cancelCollect = function(){

        var checkApi = '/sale/cancelSaleCollection/' + $routeParams.saleId;

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
}