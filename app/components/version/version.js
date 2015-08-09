'use strict';

angular.module('network.version', [
  'network.version.interpolate-filter',
  'network.version.version-directive'
])

.value('version', '0.1');
