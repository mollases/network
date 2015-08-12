'use strict';

// Declare app level module which depends on views, and components
angular.module('network.NetworkGeneratorSvs',[]).
service('NetworkGeneratorSvs', function(){

        function generateNodes(size,labelFn) {
            labelFn = labelFn || function(i){return i;};
            var generated = [];
            for (var i = 0; i < size; i++) {
                generated.push({
                    id: i,
                    label: labelFn(i)
                });
            }
            return generated;
        }

        function generateConnections(opts) {
            var generated = [];
            for (var i = 0; i < opts.nodes; i++) {
                var connections = Math.floor(Math.random() * (opts.maxConnections - 1)) + 1;
                for (var j = 0; j < connections; j++) {
                    var edge = {
                        from :i,
                        to :Math.floor(Math.random() * opts.nodes)
                    };

                    if(opts.continuous){
                        do {
                        edge.to = Math.floor(Math.random() * opts.nodes);
                        } while (edge.to === edge.from);
                    }
                    generated.push(edge);
                }
            }
            return generated;
        }

    this.generateNetwork = function(opts){
        opts = opts || {};
        var options = {
            nodes : opts.nodes || 10,
            nodeLabeler : opts.nodeLabeler || function(i){return i;},
            maxConnections : opts.maxConnections || 3,
            cyclical : opts.cyclical || false,
            continuous : opts.continuous || true
        };

        return {
            nodes : generateNodes(options.nodes,options.nodeLabeler),
            edges : generateConnections(options)
        };
    };
});
