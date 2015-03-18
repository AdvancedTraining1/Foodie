/**
 * Created by mengchi on 12/11/14.
 */
angular.module('nourriture').directive('topicPage', function ($timeout) {
    return{
        replace:true,
        scope:{
            page : '=pageObject',
            query : '=clickFunction'
        },
        controller : function ($scope,$element) {
            $scope.createHtml = function () {
                var maxPage =  Math.ceil($scope.page.itemsCount/ $scope.page.pageSize) ;
                var pageNo = $scope.page.pageNo;
                var str = '<ul>' ;
                if(maxPage > 10){
                    if(pageNo > 3){//minPage + 2
                        str += '<li><a href="javascript:;">《</a></li>' ;
                        str += '<li><span>……</span></li>';
                    }
                    for(var i= pageNo <=2?1:pageNo -2 ;i<= (pageNo >= maxPage-2?maxPage:pageNo +2) ;i++ ){
                        if(i == 1){
                            if(pageNo == 1){
                                str += '<li><span class="disabled">《</span></li>';
                                str += '<li><span class="current">'+i+'</span></li>' ;
                            }else{
                                str += '<li><a href="javascript:;">《</a></li>' ;
                                str += '<li><a href="javascript:;">'+i+'</a></li>' ;
                            }
                        }else if(i == maxPage){
                            if(pageNo == maxPage){
                                str += '<li><span class="current">'+i+'</span></li>' ;
                                str += '<li><span class="disabled">》</span></li>';
                            }else{
                                str += '<li><a href="javascript:;">'+i+'</a></li>' ;
                                str += '<li><a href="javascript:;">》</a></li>' ;
                            }
                        }else{
                            if(pageNo == i){
                                str += '<li><span class="current">'+i+'</span></li>' ;
                            }else{
                                str += '<li><a href="javascript:;" >'+i+'</a></li>' ;
                            }
                        }
                    }
                    if(pageNo < maxPage - 2){
                        str += '<li><span>……</span></li>';
                        str += '<li><a href="javascript:;">》</a></li>' ;
                    }
                }else{
                    for(var i=1 ; i<=maxPage ; i++){
                        if(i == 1){
                            if(pageNo == 1){
                                str += '<li><span class="disabled">《</span></li>';
                                str += '<li><span class="current">'+i+'</span></li>' ;
                            }else{
                                str += '<li><a href="javascript:;">《</a></li>' ;
                                str += '<li><a href="javascript:;">'+i+'</a></li>' ;
                            }
                        }else if(i == maxPage){
                            if(pageNo == maxPage){
                                str += '<li><span class="current">'+i+'</span></li>' ;
                                str += '<li><span class="disabled">》</span></li>';
                            }else{
                                str += '<li><a href="javascript:;">'+i+'</a></li>' ;
                                str += '<li><a href="javascript:;">》</a></li>' ;
                            }
                        }else{
                            if(pageNo == i){
                                str += '<li><span class="current">'+i+'</span></li>' ;
                            }else{
                                str += '<li><a href="javascript:;" >'+i+'</a><li>' ;
                            }
                        }
                    }
                    if(maxPage == 1){
                        str += '<li><span class="disabled">》</span></li>';
                    }
                }

                str += '</ul>';
                $element.html(str);
                $scope.bindEvent();
            };
            $scope.bindEvent = function () {
                $element.find('a').on('click', function () {
                    var text = $(this).html();
                    var pageNo = $scope.page.pageNo;
                    if($.trim(text) == '《'){
                        $scope.page.pageNo = pageNo - 1 ;
                    }else if($.trim(text) == '》'){
                        $scope.page.pageNo = pageNo + 1 ;
                    }else{
                        $scope.page.pageNo = parseInt(text);
                    }
                    $scope.query();
                    $scope.createHtml();
                });
            };
            $scope.createHtml();
            $scope.$watch('page.itemsCount', function () {
                $scope.createHtml();
            })
        }
    }
});


angular.module('nourriture').directive('uploadPage', function ($timeout) {
    return{
        replace:true,
        scope:{
            page : '=pageObject',
            query : '=clickFunction'
        },
        controller : function ($scope,$element) {
            $scope.createHtml = function () {
                var maxPage =  Math.ceil($scope.page.itemsCount/ $scope.page.pageSize) ;
                var pageNo = $scope.page.pageNo;
                var str = '<ul>' ;
                if(maxPage > 10){
                    if(pageNo > 3){//minPage + 2
                        str += '<li><a href="javascript:;">《</a></li>' ;
                        str += '<li><span>……</span></li>';
                    }
                    for(var i= pageNo <=2?1:pageNo -2 ;i<= (pageNo >= maxPage-2?maxPage:pageNo +2) ;i++ ){
                        if(i == 1){
                            if(pageNo == 1){
                                str += '<li><span class="disabled">《</span></li>';
                                str += '<li><span class="current">'+i+'</span></li>' ;
                            }else{
                                str += '<li><a href="javascript:;">《</a></li>' ;
                                str += '<li><a href="javascript:;">'+i+'</a></li>' ;
                            }
                        }else if(i == maxPage){
                            if(pageNo == maxPage){
                                str += '<li><span class="current">'+i+'</span></li>' ;
                                str += '<li><span class="disabled">》</span></li>';
                            }else{
                                str += '<li><a href="javascript:;">'+i+'</a></li>' ;
                                str += '<li><a href="javascript:;">》</a></li>' ;
                            }
                        }else{
                            if(pageNo == i){
                                str += '<li><span class="current">'+i+'</span></li>' ;
                            }else{
                                str += '<li><a href="javascript:;" >'+i+'</a></li>' ;
                            }
                        }
                    }
                    if(pageNo < maxPage - 2){
                        str += '<li><span>……</span></li>';
                        str += '<li><a href="javascript:;">》</a></li>' ;
                    }
                }else{
                    for(var i=1 ; i<=maxPage ; i++){
                        if(i == 1){
                            if(pageNo == 1){
                                str += '<li><span class="disabled">《</span></li>';
                                str += '<li><span class="current">'+i+'</span></li>' ;
                            }else{
                                str += '<li><a href="javascript:;">《</a></li>' ;
                                str += '<li><a href="javascript:;">'+i+'</a></li>' ;
                            }
                        }else if(i == maxPage){
                            if(pageNo == maxPage){
                                str += '<li><span class="current">'+i+'</span></li>' ;
                                str += '<li><span class="disabled">》</span></li>';
                            }else{
                                str += '<li><a href="javascript:;">'+i+'</a></li>' ;
                                str += '<li><a href="javascript:;">》</a></li>' ;
                            }
                        }else{
                            if(pageNo == i){
                                str += '<li><span class="current">'+i+'</span></li>' ;
                            }else{
                                str += '<li><a href="javascript:;" >'+i+'</a><li>' ;
                            }
                        }
                    }
                    if(maxPage == 1){
                        str += '<li><span class="disabled">》</span></li>';
                    }
                }

                str += '</ul>';
                $element.html(str);
                $scope.bindEvent();
            };
            $scope.bindEvent = function () {
                $element.find('a').on('click', function () {
                    var text = $(this).html();
                    var pageNo = $scope.page.pageNo;
                    if($.trim(text) == '《'){
                        $scope.page.pageNo = pageNo - 1 ;
                    }else if($.trim(text) == '》'){
                        $scope.page.pageNo = pageNo + 1 ;
                    }else{
                        $scope.page.pageNo = parseInt(text);
                    }
                    $scope.query();
                    $scope.createHtml();
                });
            };
            $scope.createHtml();
            $scope.$watch('page.itemsCount', function () {
                $scope.createHtml();
            })
        }
    }
});


