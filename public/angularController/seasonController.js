/**
 * Created by hh on 11/28/14.
 */

'use strict';
//angular.module('season',['ui.bootstrap']);
//angular.module('season').controller('you', function ($scope) {
//
//	alert(11111111111);
//	$scope.isCollapsed = false;
//});


//angular.module('ui.bootstrap.demo').controller('CollapseDemoCtrl', function ($scope) {
//	$scope.isCollapsed = false;
//});

//angular.module('myModule', ['ui.bootstrap.collapse']);

function Season($scope, $http, $location){
	//alert(11111111111);
	angular.module('myModule', ['ui.bootstrap']);

	$scope.isCollapsed = false;
	$scope.hide = function($scope){
		$scope.isCollapsed = !$scope.isCollapsed;
	}
}