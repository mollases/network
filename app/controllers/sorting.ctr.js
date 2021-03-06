'use strict';

angular.module('network.sortingCtrl', ['ngRoute', 'ngVis'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/sorting', {
            templateUrl: 'views/graph2d.tpl.html',
            controller: 'sortingCtrl'
        });
    }
])

.controller('sortingCtrl', ['$scope','HelperService',
    function($scope,HelperService) {
        $scope.challenge = 'figure out how long a sorting algo takes';
        $scope.messages = [];
        $scope.size = 200;
        $scope.maxHeight = 1000;

        function generateBarChart (){
            var elements = $scope.size;
            var maxHeight = $scope.maxHeight;
            var items = [];
            for(var i = 0; i < elements; i++){
                items.push({x:i, y:Math.floor(Math.random() * maxHeight)});
            }
            return items;
        }

        function quicksort2(items){
            var lessThanPivot = [], equalToPivot = [], greaterThanPivot = [];
            var lengthOfItems = items.length;
            var halfLength = Math.floor(lengthOfItems / 2);
            var sortedList = [];

            var pivot  = items[halfLength];

            items.forEach(function(obj,index,arr){
                if (obj.y < pivot.y){
                    lessThanPivot.push(obj);
                } else if (obj.y === pivot.y) {
                    equalToPivot.push(obj);
                } else if (obj.y > pivot.y) {
                    greaterThanPivot.push(obj);
                }
            });

            if(lessThanPivot.length !== 0){
                sortedList = sortedList.concat(quicksort2(lessThanPivot));
            }

            sortedList = sortedList.concat(equalToPivot);

            if(greaterThanPivot.length !== 0){
                sortedList = sortedList.concat(quicksort2(greaterThanPivot));
            }

            return sortedList;
        }


        function quicksort(items){
            var lt = [];
            var gt = [];
            var eq = [];
            var arr = [];
            var pivot = items[Math.floor( items.length / 2)];

            for(var i = 0; i < items.length; i++){
                if(pivot.y < items[i].y){
                    lt.push(items[i]);
                } else if ( pivot.y === items[i].y){
                    eq.push(items[i]);
                } else if ( pivot.y > items[i].y){
                    gt.push(items[i]);
                }
            }

            if(gt.length !== 0){
                arr = arr.concat(quicksort(gt));
            }

            arr = arr.concat(eq);

            if(lt.length !== 0){
                arr = arr.concat(quicksort(lt));
            }

            return arr;
        }



        function reorganize(items){
            for(var i =0; i < items.length; i++){
                if(!items[i].y){
                    items[i] = { y : items[i]};
                }
                items[i].x = i;
            }

            return items;
        }

        function radixSort(items){
            var buckets = [];
            var maxDigits = 1;
            var dataset = [];

            function getCharAt(item,ind){
                var asString = item + '';
                var rev = asString.split('').reverse().join('');
                return rev[ind];
            }

// items = [{x:3, y:524},{x:2,y:5},{x:1, y: 12443}];


            for(var h = 0; h < items.length; h++){
                dataset.push(items[h].y);

                var lengthCheck = (items[h].y + '').length;
                if(maxDigits < lengthCheck){
                    maxDigits = lengthCheck;
                }
            }

            for (var i = 0; i < maxDigits; i++){
                for(var j = 0; j < dataset.length; j++){
                    var item = dataset[j];
                    var sort = getCharAt(item,i);

                    var inBuckets = false;
                    for(var k = 0; k < buckets.length; k++){
                        if( buckets[k].sorting === sort){
                            buckets[k].val.push(item);
                            inBuckets = true;
                            break;
                        }
                    }
                    if(!inBuckets){
                        buckets.push({sorting:sort,val:[item]});
                    }
                }
                dataset = [];
                for(var m = 0; m <= 9; m++){
                    for(var l = 0; l < buckets.length; l++){
                        if(m == buckets[l].sorting){
                            dataset = dataset.concat(buckets[l].val);
                            break;
                        }
                    }
                }
                buckets = [];
            }
            return dataset;
        }

        // found this on the web, need to study it: https://gist.github.com/blairmitchelmore/1929681
        function otherRadixSort(items){
            var nums = [];
            for(var i = 0; i < items.length; i++){
                nums.push(items[i].y);
            }
        // Figure out the number of binary digits we're dealing with
            var k = Math.max.apply(null, nums.map(function(i) {
                return Math.ceil(Math.log(i)/Math.log(2));
            }));

            for (var d = 0; d < k; ++d) {
                for (var i = 0, p = 0, b = 1 << d, n = nums.length; i < n; ++i) {
                    var o = nums[i];
                    if ((o & b) == 0) {
                        // this number is a 0 for this digit
                        // move it to the front of the list
                        nums.splice(p++, 0, nums.splice(i, 1)[0]);
                    }
                }
            }
            return nums;
        }

    $scope.options = {
        style: 'bar',
        height: '400px',
        width: '600px',
        barChart : {width: 10,sideBySide:true}
    };

    $scope.refreshData = function() {
        $scope.operations = 0;
        var items = generateBarChart();
        $scope.generated = {
            items: items
        };
        $scope.determined = {
            items: reorganize(quicksort2(angular.copy(items)))
        };
    };

    $scope.refreshData();

    }
]);
