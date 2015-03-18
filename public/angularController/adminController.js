/**
 * Created by hh on 11/28/14.
 */

'use strict';

function IndexPage($scope, $http, $location){
	//$location.path('/index');
}

function ToUser($scope, $http, $location, $upload) {
	//, $upload, $fileUpload
	$scope.message = "Search a user!";
	$scope.form = {};
	$scope.user = {};
	$scope.is_visible = false;
	//$scope.is_jump = false;
	//$scope.user.account = null;
	//$scope.user.phone = null;

	$scope.users = {};
	$scope.search_condition = {};
	//$scope.update_condition = {};
	$scope.pageing={
		pageNo : 1,
		itemsCount : 10,
		pageSize :5
	};

	/*$(function(){
		pageing();
	});*/

	$scope.list = function () {
		pageing();
	};

	function pageing(){
		var api = "/admin/getUsers";
		//$scope.search_condition.name = $scope.user.name;
		//$scope.search_condition.account = $scope.user.account;
		//$scope.search_condition.phone = $scope.user.phone;
		$scope.search_condition.pageNo = $scope.pageing.pageNo;
		$scope.search_condition.pageSize = $scope.pageing.pageSize;
		$scope.search_condition.name = document.getElementById('txt_name').value;
		$scope.search_condition.account = document.getElementById('txt_account').value;
		$scope.search_condition.phone = document.getElementById('txt_cellphone').value;

		$http({
			method: 'GET',
			url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize+'&name='+$scope.search_condition.name+'&account='+$scope.search_condition.account+'&phone='+$scope.search_condition.phone
		}).success(function(data, status) {
			//alert(data);
			$scope.users = data.users;
			//alert($scope.users);
			$scope.pageing.itemsCount = data.total;
			//alert($scope.pageing.itemsCount);
			$scope.search_condition.content = null;

			if(data.total == 0)
			{
				alert("User not exist");
			}
			$scope.is_visible = true;
		}).error(function(data, status) {
			//alert("Data error");
		});

		/*$.post(api,$scope.search_condition,function(data){
			alert(data);
			$scope.users = data.users;
			alert($scope.users);
			$scope.pageing.itemsCount = data.total;
			//alert($scope.pageing.itemsCount);
			$scope.search_condition.content = null;
		});*/
	}
	//document.getElementById("search-user").active;
	$scope.submit = function () {
		//alert($scope.user.name);
		//alert(1);
		//alert("姓名、账户、电话需必填上一项，请重新输入");
		//var els =document.getElementsByName("m");
		//if($scope.user.name == null && $scope.user.account == null && $scope.user.phone == null)
		if(document.getElementById('txt_name').value == '' && document.getElementById('txt_account').value == '' && document.getElementById('txt_cellphone').value == '')
		{
			alert("姓名、账户、电话需必填上一项!Try again!");
			return 0;
		}else{
			pageing();
		}
		/*var api = "/admin/getUsers";
//		$scope.search_condition.name = $scope.user.name;
//		$scope.search_condition.account = $scope.user.account;
//		$scope.search_condition.phone = $scope.user.phone;
//		$scope.search_condition.pageNo = $scope.pageing.pageNo;
//		$scope.search_condition.pageSize = $scope.pageing.pageSize;
		//alert(1);
//		$.post(api,$scope.search_condition,function(data){
//			//alert(1);
//			$scope.users = data.users;
//			$scope.pageing.itemsCount = data.total;
//			//alert($scope.pageing.itemsCount);
//			$scope.search_condition.content = null;
//		});*/
//		var obj = {
//			name:document.getElementById("txt_name").value,
//			tel:document.getElementById("txt_cellphone").value,
//			account:document.getElementById("txt_account").value
//		};
//		var xhr = new XMLHttpRequest();
//		xhr.open('post','/admin/getUsers',true);
//		xhr.onload = function(e)
//		{
//			//var temp = JSON.parse(this.response.toString());
//			document.getElementById("result").innerHTML = this.response;
//		}
//		xhr.send(JSON.stringify(obj));
		//alert("post" + $scope.form.title + ',' + $scope.form.text);
		//$location.path('/recipe/create');
	};

	$scope.delete = function(m_account)
	{
		var result = confirm('Are you sure?');

		if(result){
			var api = "/admin/delete";
			//alert(m_account);
			$http({
				method: 'POST',
				url: api + '?userAccount=' + m_account
			}).success(function(data, status) {
				//alert(data.total);
				if(data.info == 0)
				{
					alert("User not exist");
					window.location.reload();
				}
				if(data.info == 1)
				{
					alert("User delete");
					window.location.reload();
				}
			}).error(function(data, status) {
				//alert("Data error");
			});
			//alert('删除成功！');
		}else{
			//alert('不删除！');
		}
	}

	$scope.update_ = function(data)
	{
		$location.path('/admin/updateUser_an/'+data.user.account);
	}

}

function UpdateUser($scope, $routeParams,$http, $location, $upload) {
	$scope.userdata = {};
	$scope.user = {};

	$(function(){
		var api = "/admin/getUserByAccount";
		//alert($routeParams._account);
		$http({
			method: 'GET',
			url: api + '?account=' + $routeParams._account
		}).success(function(data, status) {
			//alert(data);
			$scope.userdata = data.user;
			//alert($scope.userdata.username);
			$scope.user.name = $scope.userdata.username;
			$scope.user.account = $scope.userdata.account;
			$scope.user.phone = $scope.userdata.phone;
			$scope.user.password = $scope.userdata.password;
			$scope.user.type = $scope.userdata.type;
			$scope.user.sex = $scope.userdata.sex;

		}).error(function(data, status) {
			//alert("Data error");
		});
	});

	$scope.submit = function () {


		var api = "/admin/updateUser";
		//alert($routeParams._account);
		$http({
			method: 'POST',
			url: api + '?account=' + $scope.user.account + '&username='+$scope.user.name + '&phone='+$scope.user.phone + '&type='+$scope.user.type + '&sex='+$scope.user.sex + '&password='+$scope.user.password
		}).success(function(data, status) {
			//alert(data.info)
			if(data.info == 1)
			{
				alert('Update success');
				//window.location.reload();
			}else
			{
				alert('Update error');
				window.location.reload();
			}


		}).error(function(data, status) {
			//alert("Data error");
		});
	};
}

function SeasonFood($scope, $routeParams,$http, $location, $upload) {
	$scope.photoSee = false;
	$scope.season = {};
	$scope.seasons = {};
	$scope.search_condition = {};

	$scope.is_visible = false;
	$scope.pageing={
		pageNo : 1,
		itemsCount : 10,
		pageSize :5
	};

	function pageing(){
		var api = "/admin/searchSeason";

		$scope.search_condition.name = document.getElementById('txt_name').value;
		//alert($scope.search_condition.name);
		$http({
			method: 'GET',
			url: api + '?pageNo=' + $scope.pageing.pageNo + '&pageSize='+$scope.pageing.pageSize+'&seasonName='+ $scope.search_condition.name
		}).success(function(data, status) {
			//alert(data);
			$scope.seasons = data.seasons;

			$scope.pageing.itemsCount = data.total;
			//alert($scope.pageing.itemsCount);
			$scope.search_condition.content = null;

			if(data.total == 0)
			{
				alert("Season food not exist");
			}else
			{
				$scope.is_visible = true;
			}

		}).error(function(data, status) {
			//alert("Data error");
		});

	}

	$scope.submit = function ()
	{
		pageing();
	}

	$scope.submitData = function ()
	{
		var api = "/admin/addSeason";
		//alert($routeParams._account);
		$http({
			method: 'POST',
			url: api + '?name=' + $scope.season.name + '&description='+$scope.season.description + '&type='+$scope.season.type + '&mounth='+$scope.season.mounth + '&path='+$scope.season.photo
		}).success(function(data, status) {
			alert(data);
			window.location.reload();

		}).error(function(data, status) {
			//alert("Data error");
		});
	}

	$scope.onFileSelect1 = function ($files) {

		//alert("111 111 image upload success!");
		if($files != null){
			$scope.upload = $upload.upload({
				url: '/admin/season/upload',
				file: $files
			}).progress(function (evt) {
				console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
			}).success(function (data, status, headers, config) {        // file is uploaded successfully
				console.log(data);
				//alert("Season food image upload success!");
				//alert(data);
				//$scope.successMessage="Image upload success!";
				$scope.season.photo = data;
				$scope.photoSee = true;
			});
		}
	};
}