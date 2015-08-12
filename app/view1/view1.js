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

.controller('networkCtrl', ['$scope','NetworkGeneratorSvs',
    function($scope,NetworkGeneratorSvs) {
        var opts = {
            nodeLabeler : function(i){
                return String.fromCharCode(65 + i);
            }
        };
        var network = NetworkGeneratorSvs.generateNetwork(opts);

        function discoverNetwork(network) {
            var nodes = network.nodes;
            var connections = network.edges;
            function fetchEdges(edges, search) {
                var conns = [];
                for (var i = 0; i < edges.length; i++) {
                    if (edges[i].from === search || edges[i].to === search) {
                        conns.push(edges[i]);
                    }
                }
                return conns;
            }

            function contains(a, obj) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i] === obj) {
                        return true;
                    }
                }
                return false;
            }

            var stack = new Stack();
            var nodeList = [];
            var edgeList = [];
            stack.push(nodes[0]);

            while (!stack.isEmpty()) {
                var node = stack.pop();
                if(!contains(nodeList,node)){
                    nodeList.push(node);
                }
                var edges = fetchEdges(connections, node.id);
                for (var i = 0; i < edges.length; i++) {
                    var nextNode = edges[i].to === node.id ? nodes[edges[i].from] : nodes[edges[i].to];

                    if(!contains(nodeList,nextNode)){
                        stack.push(nextNode);
                    }
                    if(!contains(edgeList,edges[i])){
                        edgeList.push(edges[i]);
                    }
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
