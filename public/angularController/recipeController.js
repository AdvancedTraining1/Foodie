/**
 * Created by cmm on 11/25/14.
 */

'use strict';

function ToCreateRecipe($scope, $http, $location, $upload) {
    $scope.recipe = {};
    $scope.step = [];
    $scope.photoSee = false;
    $scope.stepSee = false;
    $scope.moreSteps = [{step:1}];
    $scope.moreMaterials = [{material:1}];
    /////////////////
    $scope.recipe.photo = '/upload/recipe_add1.jpg';
    $scope.step.push('/upload/recipe_add2.jpg');

    $scope.onFileSelect = function ($files) {
        if($files != null){
            $scope.upload = $upload.upload({
                url: '/service/recipe/upload', //upload.php script, node.js route, or servlet url
                //method: 'POST' or 'PUT',
                //headers: {'header-key': 'header-value'},
                //withCredentials: true,
                file: $files // or list of files ($files) for html5 only
                //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
                // customize file formData name ('Content-Disposition'), server side file variable name.
                //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file'
                // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
                //formDataAppender: function(formData, key, val){}
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {        // file is uploaded successfully
                console.log(data);
                alert("Step image upload success!");
                //$scope.successMessage="Image upload success!";
                //////////////////////////////////
                $scope.step.push(data);
                $scope.stepSee = true;
            });
        }
    };

    $scope.onFileSelect1 = function ($files) {
        if($files != null){
            $scope.upload = $upload.upload({
                url: '/service/recipe/upload',
                file: $files
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {        // file is uploaded successfully
                console.log(data);
                alert("Recipe image upload success!");
                //$scope.successMessage="Image upload success!";
                ///////////////////////
                $scope.recipe.photo = data;
                $scope.photoSee = true;
            });
        }
    };

    $scope.moreMaterial = function () {
        $scope.moreMaterials.push({material:1});
    };

    $scope.lessMaterial = function () {
        if($scope.moreMaterials.length == 1){
            alert("More than one material!");
        }else{
            $scope.moreMaterials.pop();
        }
    };

    $scope.moreStep = function () {
        $scope.moreSteps.push({step:1});
    };

    $scope.lessStep = function () {
        if($scope.moreSteps.length == 1){
            alert("More than one step!");
        }else{
            $scope.moreSteps.pop();
            $scope.step.pop();
        }
    };

    $scope.createRecipePage = function () {
        $scope.recipe.material = [];
        $scope.recipe.step = [];
        var m_name = document.getElementsByName("materialName");
        var m_amount = document.getElementsByName("amount");
        var s_explain = document.getElementsByName("stepExplain");

        for (var i = 0, j = m_name.length; i < j; i++) {
            $scope.recipe.material.push({materialName:m_name[i].value,amount:m_amount[i].value});
        }
        for (var i = 0, j = s_explain.length; i < j; i++) {
            $scope.recipe.step.push({stepExplain:s_explain[i].value,stepPhoto:$scope.step[i]});
        }
        $scope.recipe.mNum = m_name.length
        $scope.recipe.sNum = s_explain.length;
        /*alert($scope.recipe.toString());
         alert(JSON.stringify($scope.recipe));*/
        //$scope.recipe.authorId = 11;

        $.post('/service/recipe/create',$scope.recipe,function(data){
            alert(data);
        });
        /*$http.post('service/recipe/create', $scope.recipe).
         success(function(data) {
         alert(11);
         });*/
    };
}

function ToListRecipe($scope, $http, $location){
    $scope.recipes = {};
    $scope.collect = {};
    $scope.search = "";
    $scope.pageing={
        pageNo : 1,
        itemsCount : 10,
        pageSize :10
    };

    $(function(){
        pageing();
    });

    $scope.list = function () {
        if($scope.search == ""){
            pageing();
        }else{
            searchPaging();
        }
    };

    function pageing(){
        var api = "/service/recipe/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize
        }).success(function(data, status) {
            $scope.recipes = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }

    $scope.searchRecipe = function(){
        var api = "/service/recipe/search";
        if($scope.search == ""){
            pageing();
        }else{
            $scope.pageing.pageNo = 1;
            $http({
                method: 'GET',
                url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $scope.search
            }).success(function(data, status) {
                $scope.recipes = data.root;
                $scope.pageing.itemsCount = data.total;
            }).error(function(data, status) {

            });
        }
    };

    function searchPaging(){
        var api = "/service/recipe/search";
        $http({
            method: 'GET',
            url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize +'&queryStr=' + $scope.search
        }).success(function(data, status) {
            $scope.recipes = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }
}

function ToSingleRecipe($scope, $routeParams,$http, $location,$upload){
    $scope.id = $routeParams.recipeId;
    $scope.noComment = true;
    $scope.noProduct = true;
    $scope.comments = {};
    $scope.comment = {};
    $scope.product = {};
    $scope.collect = {};
    $scope.productSee = false;
    $scope.seeCollect = true;
    $scope.seeAttention = true;
    ////////////////////////
    $scope.product.picture = '/upload/recipe_add3.jpg';
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
            url: recipeApi + '/'+$scope.id
        }).success(function(data, status) {
            $scope.recipe = data;
        }).error(function(data, status) {

        });

        commentPage();
        productPage();
        //checkAttention($scope.recipe.author._id);
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

    $scope.onFileSelect = function ($files) {
        if($files != null){
            $scope.upload = $upload.upload({
                url: '/service/recipe/upload',
                file: $files
            }).progress(function (evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
            }).success(function (data, status, headers, config) {        // file is uploaded successfully
                console.log(data);
                alert("Product image upload success!");
                //////////////////
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
            $scope.seeAttention = false;
            commentPage();
        })

    }

    $scope.deleteAttention = function(friendId,friendAccount,friendHead){

        var checkApi = '/service/attention/deleteAttentions/'  + '?friendId='+friendId+'&friendAccount='+friendAccount+'&friendHead='+friendHead;

        $.get(checkApi,function(data) {
            alert(data);
            $scope.seeAttention = true;
            commentPage();
        })

    };


    $scope.jumpToRecipe = function(userId) {
        $location.path('/recipe/otherAll_an/' + userId);
    };

    $scope.jumpToBlog = function(userId) {
        $location.path('/recipe/otherAll_an/' + userId);
    };

    $scope.jumpToFans = function(userId) {
        $location.path('/recipe/otherAll_an/' + userId);
    };
}

function ToOtherRecipe($scope, $routeParams,$http, $location,$upload) {
    $scope.id = $routeParams.authorId;
    $scope.pageing={
        pageNo : 1,
        itemsCount : 10,
        pageSize :6
    };

    $(function(){
        page();
    });

    $scope.list = function () {
        page();
    };

    function page(){
        var api = "/service/recipe/listOwn";
        $http({
            method: 'GET',
            url: api + '?pageNo='+$scope.pageing.pageNo+'&pageSize='+$scope.pageing.pageSize+'&authorId='+$scope.id
        }).success(function(data, status) {
            $scope.recipes = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }
}

function ToOwnRecipe($scope, $routeParams,$http, $location,$upload) {
    $scope.id = $routeParams.authorId;
    $scope.pageing={
        pageNo : 1,
        itemsCount : 10,
        pageSize :6
    };

    $(function(){
        page();
    });

    $scope.list = function () {
        page();
    };

    function page(){
        var api = "/service/recipe/listOwn";
        $http({
            method: 'GET',
            url: api + '?pageNo='+$scope.pageing.pageNo+'&pageSize='+$scope.pageing.pageSize+'&authorId='+$scope.id
        }).success(function(data, status) {
            $scope.recipes = data.root;
            $scope.pageing.itemsCount = data.total;
        }).error(function(data, status) {

        });
    }

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
