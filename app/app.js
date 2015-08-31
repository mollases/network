'use strict';

// Declare app level module which depends on views, and components
angular.module('network', [
  'ui.bootstrap',
  'ngRoute',
  'network.NetworkGeneratorSvs',
  'network.HelperService',
  'network.networkCtrl',
  'network.largestSumCtrl',
  'network.sortingCtrl',
  'network.treeCtrl',
  'network.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/bfs-discovery'});
}]);
