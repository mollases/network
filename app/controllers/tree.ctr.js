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
            items.push({
                id: i,
                label: i + ', ' + Math.floor(Math.random() * maxHeight),
                value: Math.floor(Math.random() * maxHeight)
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

        function generateBalancedTree(values){

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
        $scope.graphData = generateGenericTree(values);
        $scope.description = "binary tree";
    }
]);
