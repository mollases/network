'use strict';

angular.module('network.treeCtrl', ['ngRoute', 'ngVis'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/trees', {
            templateUrl: 'views/network.tpl.html',
            controller: 'treeCtrl'
        });
    }
])

.controller('treeCtrl', ['$scope','HelperService',
    function($scope,HelperService) {
        $scope.challenge = 'make a tree';
        $scope.size = 10;
        $scope.maxHeight = 100;

        function generateBarChart (){
            var elements = $scope.size;
            var maxHeight = $scope.maxHeight;
            var items = [];
            for(var i = 0; i < elements; i++){
                var val = Math.floor(Math.random() * maxHeight);
            items.push({
                id: i,
                label: i + ', ' + val,
                value: val
            });
            }
            return items;
        }

        function generateGenericTree(values) {
            // values = [{id : #, value : #, label : => 'id, value'}...]
            function generateConnections(){
                var edges = [];

                for(var i = 1; i < values.length; i++){
                    edges.push({
                        from : i,
                        to : Math.floor(i/2)
                    });
                }
                return edges;
            }

            return {nodes: values, edges : generateConnections()};
        }


        function binaryHeap(items){
            var heap = [];
            function swap(array, index1,index2){
                var temp = array[index1];
                array[index1] = array[index2];
                array[index2] = temp;
            }

            function heapify(arr){
                var index = arr.length - 1;
                var cont = true;
                while(cont){
                    var parent = Math.floor(index / 2);
                    if(index !== parent && arr[index].value < arr[parent].value){
                        swap(arr,index,parent);
                        index = parent;
                    } else {
                        cont = false;
                    }
                }
            }

            for(var i = 0; i < items.length; i++){
                heap.push(items[i]);
                heapify(heap);
            }

            return heap;
        }

        $scope.networkOptions = {
            physics: {
                enabled: true
            },
            height: '300px',
            width:'600px'
        };

        var values = generateBarChart();

        $scope.generatedData = {nodes :  values};
        $scope.graphData = binaryHeap(values);
        $scope.description = "binary tree";
    }
]);
