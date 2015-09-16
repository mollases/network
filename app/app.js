'use strict';

// Declare app level module which depends on views, and components
angular.module('network', [
  'ui.bootstrap',
  'ngRoute',
  'network.NetworkGeneratorSvs',
  'network.HelperService',
  'network.shapeFinderCtrl',
  'network.networkCtrl',
  'network.largestSumCtrl',
  'network.sortingCtrl',
  'network.hidatoBoardCtrl',
  'network.treeCtrl',
  'network.sensorFieldCtrl',
  'network.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/bfs-discovery'});
}]);
