'use strict';

angular.module('network.largestSumCtrl', ['ngRoute', 'ngVis'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/view2', {
            templateUrl: 'view1/view1.html',
            controller: 'largestSumCtrl'
        });
    }
])

.controller('largestSumCtrl', ['$scope', 'NetworkGeneratorSvs', 'HelperService',
    function($scope, NetworkGeneratorSvs, HelperService) {
        $scope.messages = [];
        var opts = {
            nodeLabeler: function(i) {
                return String.fromCharCode(65 + i);
            },
            nodes: 10
        };
        var network = NetworkGeneratorSvs.generateNetwork(opts);

        for (var i = 0; i < network.nodes.length; i++) {
            var value = Math.floor(Math.random() * 50);
            network.nodes[i].label += ', ' + value;
            network.nodes[i].points = value;
        }

        function discoverNetwork(network) {
            var nodes = network.nodes;
            var connections = network.edges;
            var stack = new Stack();
            var nodeList = [];
            var edgeList = [];
            stack.push(nodes[0]);
            var total = 0;
            var path = [];

            while (!stack.isEmpty()) {
                var node = stack.peek();
                if(!node.visited) total += node.points;
                node.visited = true;

                HelperService.checkAndPush(nodeList,node,nodeList);
                var edges = NetworkGeneratorSvs.fetchEdges(connections, node.id);
                var greatestValue = 0;
                var follow = 0;
                for (var i = 0; i < edges.length; i++) {
                    var nextNode = edges[i].to === node.id ? nodes[edges[i].from] : nodes[edges[i].to];
                    HelperService.checkAndPush(edgeList,edges[i],edgeList);
                    if(greatestValue <= nextNode.points && !nextNode.visited){
                        greatestValue = nextNode.points;
                        follow = nextNode;
                    }
                }
                if(follow === 0){
                    var x = ''; stack.arr.forEach(function(obj,ind,arr){x += obj.label + ';';});
                    $scope.messages.push('new total: ' + total + ', ' +x);
                    path.push({total:total,stack:stack});
                    total -= stack.pop().points;
                } else {
                    HelperService.checkAndPush(nodeList, follow, stack);
                }
            }

            var best = {total : 0};
            path.forEach(function(obj,ind,arr){
                if(obj.total > best.total){
                    best = obj;
                }
            });
            $scope.messages.push('best list:' +best.total);

            return {
                nodes: nodeList,
                edges: edgeList,
                path:path
            };
        }

        $scope.networkOptions = {
            physics: {
                enabled: true
            },
            height: '400px',
            width: '600px'
        };

        $scope.generatedData = network;
        $scope.graphData = discoverNetwork(network);
        $scope.networkDescription = "bfs discovered";
        $scope.messages.push("discover finished");
    }
]);
