'use strict';

angular.module('network.networkCtrl', ['ngRoute','ngVis'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'networkCtrl'
  });
}])

.controller('networkCtrl', ['$scope',function($scope) {
    var dataGroups = new vis.DataSet();
    dataGroups.add({});
    var dataNodes = new vis.DataSet();
    dataNodes.add([
        {id: 1, label: '1'},
        {id: 2, label: '2'},
        {id: 3, label: '3'},
        {id: 4, label: '4'},
        {id: 5, label: '5'}
      ]);
    var dataEdges = new vis.DataSet();
    dataEdges.add([
        {from: 1, to: 3},
        {from: 3, to: 3},
        {from: 1, to: 2},
        {from: 2, to: 4},
        {from: 2, to: 5}
    ]);

    $scope.graphOptions = {
        physics: {enabled: true}
    };
    $scope.graphData = {
      nodes: dataNodes,
      edges: dataEdges
    };
}]);
