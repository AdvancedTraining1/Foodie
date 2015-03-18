/**
 * Created by liuhanxu on 14-11-28.
 */

'use strict';

/* Controllers 主要用于加载js对界面进行控制*/
function showInfo($scope, $http, $location){
    $scope.message="1235456654";
    $scope.userinfo={};
    $scope.modifyUserinfo={};
    $(document).ready(function() {
        //获取userinfo信息来显示在页面上
        getUserInfo();

    });

    function getUserInfo(){
        $http({
            method  : 'POST',
            url: '/service/userinfo/getUserInfo',
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        }).success(function(data, status, headers, config) {
            $scope.userinfo=data.user[0];
            //alert($scope.userinfo.account);
        }).error(function(data, status, headers, config) {

        });
    }

    $scope.test123=function(){
        alert($scope.message);
    }

    $scope.modifyInfo= function(){  //修改用户信息
        $scope.modifyUserinfo.username = document.getElementById('username').value; //在dao层才去对比account
        $scope.modifyUserinfo.email = document.getElementById('email').value;
        $http({
            method  : 'POST',
            url: '/service/userinfo/modifyInfo',
            data: $.param($scope.modifyUserinfo), // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        }).success(function(data, status, headers, config) {
            alert(data.message);
            //alert($scope.userinfo.account);
        }).error(function(data, status, headers, config) {

        });

    }

    $scope.modifyPass= function(){
        $scope.modifyUserinfo.passwordold = document.getElementById('passwordold').value; //在dao层才去对比account
        $scope.modifyUserinfo.passwordnew1 = document.getElementById('password1').value;
        $scope.modifyUserinfo.passwordnew2 = document.getElementById('password2').value;
        if($scope.modifyUserinfo.passwordnew1!=$scope.modifyUserinfo.passwordnew2){
            alert("两次密码输入不一致，请重新输入！");
            document.getElementById('passwordold').value="";
            document.getElementById('password1').value="";
            document.getElementById('password2').value="";
            return 0;
        }
        $http({
            method  : 'POST',
            url: '/service/userinfo/modifyPass',
            data: $.param($scope.modifyUserinfo), // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        }).success(function(data, status, headers, config) {
            alert(data.message);
            $location.path('/userinfo/info');
        }).error(function(data, status, headers, config) {

        });
    }

    $scope.gotoModifyPass= function(){
        $location.path('/userinfo/modifypass');
    }
}

function RegisterAndLogin($scope, $http, $location) {
    $scope.userinfo = {};

    $scope.login= function () {
        $scope.userinfo.username = document.getElementById('username').value; //在dao层才去对比account
        $scope.userinfo.password = document.getElementById('password').value;
        $http({
            method  : 'POST',
            url: '/service/userinfo/login',
            data: $.param($scope.userinfo), // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            }).success(function(data, status, headers, config) {
                    alert(data.message);
                    console.log("login"+data.user.user_id);
                    //$location.path('/userinfo/info');
                    //$scope.$apply();
                    gotoHome();
             }).error(function(data, status, headers, config) {

            });

    }
    function gotoHome(){
        window.location.href='/index';
    }


    $scope.register= function () {
        $scope.userinfo.username = document.getElementById('username2').value; //在dao层才去对比account
        $scope.userinfo.password = document.getElementById('password2').value;
        $scope.userinfo.email = document.getElementById('email2').value;
        $http({
            method  : 'POST',
            url: '/service/userinfo/register',
            data: $.param($scope.userinfo), // pass in data as strings
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        }).success(function(data, status, headers, config) {
            alert(data.message);
        }).error(function(data, status, headers, config) {

        });
    }
}

function  showCenterBlogs($scope, $http, $location){
    $scope.blogs = {};
    $scope.collect = {};
    $scope.pageing={
        pageNo : 1,
        itemsCount : 10,
        pageSize :5
    };

    $(function(){
        getUserBlogs();
    });

    $scope.list = function () {
        getUserBlogs();
    };

    function getUserBlogs(){
        $http({
            method  : 'GET',
            url: '/service/userinfo/getUserBlogs?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        }).success(function(data, status, headers, config) {
            $scope.blogs = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status, headers, config) {

        });
    };
}

function showCenterRecipes($scope, $http, $location){
    $scope.pageing={
        pageNo : 1,
        itemsCount : 10,
        pageSize :5
    };

    $(function(){
        getUserRecipes();
    });

    $scope.list = function () {
        getUserRecipes();
    };

    function getUserRecipes(){
        $http({
            method  : 'GET',
            url: '/service/userinfo/getUserRecipes?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize,
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        }).success(function(data, status, headers, config) {
            $scope.recipes = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status, headers, config) {

        });
    };
    $scope.deleteRecipe = function (recipeId) {
        var api = "/service/recipe/delete";
        $http({
            method: 'GET',
            url: api + '/'+recipeId
        }).success(function(data, status) {
            page();
        });
    };
}



function logout($scope, $http, $location){

    function queryRecipe(){
        var api = "/service/recipe/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=1&pageSize=3'
        }).success(function(data, status) {
            $scope.recipes = data.root;
        });
    }

    $(function(){
        logoutAccount();
        queryRecipe();
    });

    function logoutAccount(){
        $http({
            method  : 'GET',
            url: '/service/userinfo/logout',
            headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
        }).success(function(data, status, headers, config) {
            $scope.message = data.message;
            alert($scope.message);
            window.location.href='/index';
        }).error(function(data, status, headers, config) {

        });
    };

}