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

.controller('networkCtrl', ['$scope',
    function($scope) {
        function generateNodes(size) {
            var generated = [];
            for (var i = 0; i < size; i++) {
                generated.push({
                    id: i,
                    label: i
                });
            }
            return generated;
        }

        function generateConnections(dataPoints, maxConnections) {
            var generated = [];
            for (var i = 0; i < dataPoints.length; i++) {
                var connections = Math.floor(Math.random() * maxConnections);
                for (var j = 0; j < connections; j++) {
                    generated.push({
                        from: Math.floor(Math.random() * dataPoints.length),
                        to: Math.floor(Math.random() * dataPoints.length)
                    });
                }
            }
            return generated;
        }

        var nodes = generateNodes(6);
        var connections = generateConnections(nodes, 3);

        function discoverNetwork(nodes, connections) {
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
            }
        };
        $scope.generatedData = {
            nodes: nodes,
            edges: connections
        };


        $scope.graphOptions = {
            physics: {
                enabled: true
            }
        };
        $scope.graphData = discoverNetwork(nodes, connections);
    }
]);
