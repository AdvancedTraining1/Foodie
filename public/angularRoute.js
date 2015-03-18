/**
 * Created by cmm on 11/28/14.
 */

'use strict';

angular.module('nourriture', ['ngRoute','angularFileUpload','ui.bootstrap.collapse']).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/unauthorized', {
                templateUrl: '/service/userinfo/gotoRegister',
                controller: RegisterAndLogin
            }).
            when('/index', {
                templateUrl: '/indexPart',
		        controller: IndexPage
            }).
            when('/recipe/create_an', {
                templateUrl: '/recipe/create',
                controller: ToCreateRecipe
            }).
            when('/recipe/list_an', {
                templateUrl: '/recipe/list',
                controller: ToListRecipe
            }).
            when('/recipe/single_an/:recipeId', {
                templateUrl: '/recipe/single',
                controller: ToSingleRecipe
            }).
            when('/recipe/otherAll_an/:authorId', {
                templateUrl: '/recipe/otherAll',
                controller: ToOtherRecipe
            }).
            when('/recipe/ownAll_an/:authorId', {
                templateUrl: '/recipe/ownAll',
                controller: ToOwnRecipe
            }).
            when('/userinfo/show',{
                templateUrl:'/userinfo/show',
                controller:showInfo
            }).
            when('/userinfo/register',{    //这是index里面在ng-app中对应的urls
                templateUrl:'/service/userinfo/gotoRegister',  //去route里面找
                controller:RegisterAndLogin
            }).
            when('/userinfo/info',{
                templateUrl:'/service/userinfo/gotoInfo',
                controller:showInfo
            }).
            when('/userinfo/modifypass',{
                templateUrl:'/service/userinfo/gotoModifyPass',
                controller:showInfo
            }).
            when('/userinfo/centerBlogs',{
                templateUrl:'/service/userinfo/gotoCenterBlogs',
                controller:showCenterBlogs
            }).
            when('/userinfo/centerRecipes',{
                templateUrl:'/service/userinfo/gotoCenterRecipes',
                controller:showCenterRecipes
            }).
            when('/userinfo/logout',{
                templateUrl:'/indexPart',
                controller:logout
            }).

            when('/sale/createTradePost_angular',{
                templateUrl:'/sale/createTradePost',
                controller:CreateTradePost
            }).
            when('/sale/listTradePost_angular',{
                templateUrl:'/sale/listTradePost',
                controller:ListTradePost
            }).
            when('/sale/showTradePost_angular/:saleId',{
                templateUrl:'/sale/showTradePost',
                controller:ShowTradePost
            }).

    //---------------------------------zhaiyuan start----------------------------------------------------------------
            when('/attention/friendStatusListRecipe',{
                templateUrl:'/attention/friendStatusListRecipe', //routes
                controller:ToListFriendStatusRecipe
            }).
            when('/attention/friendStatusListBlog',{
                templateUrl:'/attention/friendStatusListBlog', //routes
                controller:ToListFriendStatusBlog
            }).
            when('/attention/friendStatusListTopic',{
                templateUrl:'/attention/friendStatusListTopic', //routes
                controller:ToListFriendStatusTopic
            }).
            when('/attention/getAllAttention/:search',{
                templateUrl:'/attention/getAllAttention', //routes
                controller:ToListAllAttention
            }).
            when('/attention/oneRecipe/:recipeId',{
                templateUrl:'/attention/oneRecipe', //routes
                controller:ToLookOneRecipe
            }).
            when('/attention/oneBlog/:blog_id',{
                templateUrl:'/attention/oneBlog', //routes
                controller:ToLookOneBlog
            }).
            when('/attention/oneTopic/:topic_id',{
                templateUrl:'/attention/oneTopic', //routes
                controller:ToLookOneTopic
            }).
    //---------------------------------zhaiyuan end----------------------------------------------------------------

            when('/blog/createBlog_angular',{
                templateUrl:'/blog/createBlog',
                controller:ToCreateBlog
            }).
            when('/blog/blogList_angular',{
                templateUrl:'/blog/blogList',
                controller:ToListBlog
            }).
            when('/blog/blogDetail_angular/:blog_id', {
                templateUrl: '/blog/blogDetail',
                controller: BlogDetail
            }).
            when('/topic/createTopic_angular', {
                templateUrl: '/topic/createTopic',
                controller: ToCreateTopic
            }).
            when('/topic/topicList_angular',{
                templateUrl:'/topic/topicList',
                controller:ToListTopic
            }).
            when('/topic/topicDetail_angular/:topic_id', {
                templateUrl: '/topic/topicDetail',
                controller: TopicDetail
            }).
	        when('/season/season_an', {
		        templateUrl: '/season/season',
		        controller: Season
	        }).
            otherwise({
                redirectTo: '/'
            });
        $locationProvider.html5Mode(true);
    }]);

