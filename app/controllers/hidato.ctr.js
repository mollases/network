'use strict';

angular.module('network.hidatoBoardCtrl', ['ngRoute', 'ngVis'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/hidato-board', {
            templateUrl: 'views/hidatoBoard.tpl.html',
            controller: 'hidatoBoardCtrl'
        });
    }
])

.controller('hidatoBoardCtrl', ['$scope', 'NetworkGeneratorSvs', 'HelperService',
    function($scope, NetworkGeneratorSvs, HelperService) {
        var board = [
            [0, 1, 10, 0],
            [5, 0, 11, 0],
            [4, 0, 7, 0],
            [16, 0, 14, 0]
        ];
        var cells = [];
        for (var i = 0; i < board.length; i++) {
            var row = [];
            for (var j = 0; j < board[i].length; j++) {
                var cell = {
                    cell: board[i][j],
                    x: i,
                    y: j
                };
                if (cell.cell !== 0) {
                    cell.set = true;
                }
                row.push(cell);
            }
            cells.push(row);
        }

        function solve(grid) {
            function parse(grid){
                var log = '';
                grid.forEach(function(obj,ind,grid){
                    obj.forEach(function(subObj,ind2,row){
                        log+= subObj.cell + ',';
                    });
                    log+= '\n';
                });
                return log;
            }


            function verify(board,size){
                var start = {};
                var ableToContinue = true;
                for (var i = 0; i < board.length; i++) {
                    if( start.cell === 1) break;
                    for (var j = 0; j < board[i].length; j++) {
                        if(board[i][j].cell === 1){
                            start = board[i][j];
                            break;
                        } else if (board[i][j].cell === 0){
                            return false;
                        }
                    }
                }

                var newVal = {cell:0};
                while(start.cell !== size && ableToContinue){
                    for(var x = start.x -1; x <= start.x +1; x++){
                        for(var y = start.y - 1; y <= start.y + 1; y++){
                            if(x < 0 || x >= board.length || y < 0 || y >= board[x].length){
                                break;
                            }
                            if(board[x][y].cell === start.cell + 1){
                                newVal = start;
                                start = board[x][y];
                                ableToContinue = true;
                                break;
                            }
                        }
                    }
                }
            }

            console.log(parse(grid));
            var min = {cell:0};
            var max = grid.length * grid[0].length;
            for(var  h = 0; h < max; h++){
                for (var i = 0; i < grid.length; i++) {
                    for (var j = 0; j < grid[i].length; j++) {
                        var currentCell = grid[i][j];
                        if(currentCell.cell !== 0) {
                            if(min.cell + 1 === currentCell.cell){
                                min = currentCell;
                            }
                        }
                    }
                }
            }

            if(max === min.cell){
                if(verify(grid,max)){
                    return grid;
                }
            }

            var startAt = min;
            for(var x = startAt.x -1; x <= startAt.x +1; x++){
                for(var y = startAt.y - 1; y <= startAt.y + 1; y++){
                    if(x < 0 || x >= grid.length || y < 0 || y >= grid[x].length){
                        //no-op, easier to read
                    } else{
                        if(grid[x][y].cell === 0){
                            grid[x][y].cell = startAt.cell + 1;
                            return solve(grid);
                        }
                    }
                }
            }
        }


        $scope.cells = cells;
        $scope.solved = solve(angular.copy(cells));
    }
]);
