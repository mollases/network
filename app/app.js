'use strict';

// Declare app level module which depends on views, and components
angular.module('network', [
  'ngRoute',
  'network.NetworkGeneratorSvs',
  'network.HelperService',
  'network.networkCtrl',
  'network.largestSumCtrl',
  'network.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
