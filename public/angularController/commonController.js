/**
 * Created by cmm on 12/8/14.
 */
function IndexPage($scope, $routeParams ,$http, $location){

    $(function(){
        queryRecipe();
    });

    function queryRecipe(){
        var api = "/service/recipe/listAll";
        $http({
            method: 'GET',
            url: api + '?pageNo=1&pageSize=3'
        }).success(function(data, status) {
            $scope.recipes = data.root;
        });
    }
}
