'use strict';

// Declare app level module which depends on views, and components
angular.module('network', [
  'ngRoute',
  'network.networkCtrl',
  'network.view2',
  'network.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
