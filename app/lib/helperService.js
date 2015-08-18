'use strict';

// Declare app level module which depends on views, and components
angular.module('network.HelperService', []).
service('HelperService', function() {

    this.checkAndPush = function(a, obj, arr) {
        if (!this.contains(a, obj)) {
            arr.push(obj);
        }
    };

    this.contains = function(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    };

});
