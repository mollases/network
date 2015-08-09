'use strict';

describe('network.version module', function() {
  beforeEach(module('network.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
