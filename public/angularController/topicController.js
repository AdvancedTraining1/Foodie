/**
 * Created by mengchi on 12/10/14.
 */

'use strict';

function ToCreateTopic($scope, $http,$location) {


    $scope.createTopic = function () {
        $scope.topic={}

        var topicname =  $scope.topicname;

        var content=$scope.content;
        $scope.topic.topicName =topicname;
        $scope.topic.content = content;


        $.post('/topic/publishTopic',$scope.topic,function(data){
            alert(data.message);
            $location.path("/topic/topicList_angular");
            $scope.$apply();
          //  $location.path("/blog/blogDetail_angular/"+data.newId);
          //  $scope.$apply();
        });

    }

}

function ToListTopic($scope, $http, $location){
    $scope.topics = {};
    $scope.collect = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 10,
        pageSize :6
    };
    $(function(){
        pageing();
    });

    $scope.list = function () {
        pageing();
    };

    function pageing(){
        var api = "/topic/showTopicList";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.topics = data.topics;
            console.log(data);
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }




}

function TopicDetail($scope, $routeParams,$http, $location,$upload) {
    $scope.id = $routeParams.topic_id;
    $scope.topic={}
    $scope.noupload = true;
    $scope.uploads = {};
    $scope.upload = {};
    $scope.picture={};
    $scope.topicUpload={};


    $scope.uoloadPaging = {
        pageNo: 1,
        itemsCount: 10,
        pageSize: 6
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
            url: commentApi + '?pageNo=' + $scope.uoloadPaging.pageNo + '&pageSize=' + $scope.uoloadPaging.pageSize + '&topic_id=' + $scope.id
        }).success(function (data, status) {
            $scope.uoloadPaging.itemsCount = data.total;
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

    $scope.addLike = function(id){

        var checkApi = '/topic/likeTopicUpload/' + id;

        $.get(checkApi,function(data) {


            if(data.status){
                alert("like successful");
                paging();


            }else{
                alert(data.message);
            }


        })

    };



}

