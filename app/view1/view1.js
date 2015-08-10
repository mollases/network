'use strict';

angular.module('network.networkCtrl', ['ngRoute','ngVis'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'networkCtrl'
  });
}])

.controller('networkCtrl', ['$scope',function($scope) {
    function generateNodes(size){
        var generated = [];
        for(var i = 0; i< size ;i++){
            generated.push({id:i,label:i});
        }
        return generated;
    }

    function generateConnections(dataPoints,maxConnections){
        var generated = [];
        for(var i = 0; i < dataPoints.length; i++){
            var connections = Math.floor( Math.random() * maxConnections);
            for(var j = 0; j < connections; j++){
                generated.push({
                    from : Math.floor( Math.random() * dataPoints.length),
                    to : Math.floor( Math.random() * dataPoints.length)
                });
            }
        }
        return generated;
    }

    var nodes = generateNodes(6);
    var connections = generateConnections(nodes,3);
    var dataNodes = new vis.DataSet();
    dataNodes.add(nodes);
    var dataEdges = new vis.DataSet();
    dataEdges.add(connections);

    $scope.networkOptions = {
        physics: {enabled: true}
    };
    $scope.generatedData = {
      nodes: dataNodes,
      edges: dataEdges
    };
}]);
