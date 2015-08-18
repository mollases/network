'use strict';

angular.module('network.networkCtrl', ['ngRoute', 'ngVis'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'networkCtrl'
        });
    }
])

.controller('networkCtrl', ['$scope','NetworkGeneratorSvs','HelperService',
    function($scope,NetworkGeneratorSvs,HelperService) {
        var opts = {
            nodeLabeler : function(i){
                return String.fromCharCode(65 + i);
            }
        };
        var network = NetworkGeneratorSvs.generateNetwork(opts);

        function discoverNetwork(network) {
            var nodes = network.nodes;
            var connections = network.edges;
            var stack = new Stack();
            var nodeList = [];
            var edgeList = [];
            stack.push(nodes[0]);

            while (!stack.isEmpty()) {
                var node = stack.pop();

                HelperService.checkAndPush(nodeList,node,nodeList);

                var edges = NetworkGeneratorSvs.fetchEdges(connections, node.id);
                for (var i = 0; i < edges.length; i++) {
                    var nextNode = edges[i].to === node.id ? nodes[edges[i].from] : nodes[edges[i].to];
                    HelperService.checkAndPush(nodeList,nextNode,stack);
                    HelperService.checkAndPush(edgeList,edges[i],edgeList);
                }
            }

            return {
                nodes: nodeList,
                edges: edgeList
            };
        }

        $scope.networkOptions = {
            physics: {
                enabled: true
            },
            height: '300px',
            width:'600px'
        };

        $scope.generatedData = network;
        $scope.graphData = discoverNetwork(network);
        $scope.networkDescription = "bfs discovered";
    }
]);
