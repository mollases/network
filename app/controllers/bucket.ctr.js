'use strict';

angular.module('network.bucketSortCtrl', ['ngRoute', 'ngVis'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/bucket-sort', {
            templateUrl: 'views/graph2d.tpl.html',
            controller: 'bucketSortCtrl'
        });
    }
])


.controller('bucketSortCtrl', ['$scope','NetworkGeneratorSvs','HelperService',
    function($scope,NetworkGeneratorSvs,HelperService) {
        $scope.challenge = 'figure out how long a sorting algo takes';
        $scope.size = 200;
        $scope.maxHeight = 1000;

        function generateBarChart (){
            var elements = $scope.size;
            var maxHeight = $scope.maxHeight;
            var items = [];
            for(var i = 0; i < elements; i++){
                items.push({x:i, y:Math.floor(Math.random() * maxHeight)});
            }
            return items;
        }

        function quicksort(items){
            var lt = [];
            var gt = [];
            var eq = [];
            var arr = [];
            var pivot = items[Math.floor( items.length / 2)];

            $scope.operations ++;
            for(var i = 0; i < items.length; i++){
                $scope.operations ++;
                if(pivot.y < items[i].y){
                    $scope.operations ++;
                    lt.push(items[i]);
                    $scope.operations ++;
                } else if ( pivot.y === items[i].y){
                    $scope.operations ++;
                    eq.push(items[i]);
                    $scope.operations ++;
                } else if ( pivot.y > items[i].y){
                    $scope.operations ++;
                    gt.push(items[i]);
                    $scope.operations ++;
                }
                $scope.operations ++;
            }

            $scope.operations ++;
            if(gt.length !== 0){
                $scope.operations ++;
                arr = arr.concat(quicksort(gt));
            }

            $scope.operations ++;
            arr = arr.concat(eq);

            $scope.operations ++;
            if(lt.length !== 0){
                $scope.operations ++;
                arr = arr.concat(quicksort(lt));
            }

            return arr;
        }

        function reorganize(items){
            for(var i =0; i < items.length; i++){
                items[i].x = i;
            }

            return items;
        }

    $scope.options = {
        style: 'bar',
        height: '400px',
        width: '600px',
        barChart : {width: 10,sideBySide:true}
    };

    $scope.refreshData = function() {
        $scope.operations = 0;
        var items = generateBarChart();
        $scope.generated = {
            items: items
        };
        $scope.determined = {
            items: reorganize(quicksort(angular.copy(items)))
        };
    };

    }
]);
