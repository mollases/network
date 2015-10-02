'use strict';

angular.module('network.sensorFieldCtrl', ['ngRoute', 'ngVis'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/sensor-field', {
            templateUrl: 'views/network.tpl.html',
            controller: 'sensorFieldCtrl'
        });
    }
])

.controller('sensorFieldCtrl', ['$scope', 'NetworkGeneratorSvs', 'HelperService',
    function($scope, NetworkGeneratorSvs, HelperService) {
        /**
         * given a field of sensors and the individual sensor's ranges, figure out if you can cross the field without any of the sensors going off
         */

        $scope.challenge = 'given a field of sensors and the individual sensors ranges, figure out if you can cross the field without any of the sensors going off';
        $scope.messages = [];

        var opts = {
            nodeLabeler: function(i) {
                return String.fromCharCode(65 + i);
            },
            nodes: 20
        };

        function generateField(x,y,size,maxRange){
            var generated = [];
            for(var i = 0; i < size; i++){
                var xPos = Math.floor(Math.random() * (x - 1)) + 1;
                var yPos = Math.floor(Math.random() * (y - 1)) + 1;
                var r = Math.floor(Math.random() * (maxRange - 1)) + 1;
                generated.push({
                    id: i,
                    label: '('+xPos+','+yPos+','+r+')',
                    size:  r,
                    x : xPos,
                    y : yPos
                });
            }
            return generated;
        }

        function canCross(listOfSensors, max, min){
            var startingPoints = [];
            function intercepts(p1,p2){return false;}

            for(var i = 0;i < listOfSensors.length; i++){
                if((listOfSensors[i].y - listOfSensors[i].radius) <= min){
                    startingPoints.push(listOfSensors[i]);
                }
            }

            for(var j = 0; j< startingPoints.length; j++){
                var starting = startingPoints[j];
                var stack = [starting];
                var visited = [starting];
                while(!stack.isEmpty()){
                    var currentSensor = stack.pop();
                    for(var k = 0; k < listOfSensors.length; k++){
                        if(intercepts(listOfSensors[k],currentSensor) && !visited.contains(listOfSensors[k])){
                            currentSensor = listOfSensors[k];
                            visited.push(currentSensor);
                            stack.push(currentSensor);
                        } else if((listOfSensors[k].y + listOfSensors[k].radius) >= max){
                            return true;
                        }
                    }
                }
            }

            return false;
        }

        var network = {nodes:generateField(800,400,20,100)};

        $scope.networkOptions = {
            autoResize:false,
            physics: {
                enabled: false
            },
            nodes:{
                shape: 'dot'
            },
            height: '400px',
            width: '700px'
        };

        $scope.generatedData = network;
        $scope.description = "bfs discovered network";
        $scope.messages.push("discover finished");
    }
]);
