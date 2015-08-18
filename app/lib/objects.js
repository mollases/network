(function() {
    'use strict';

    function Stack(){
        this.arr = [];
    }

    Stack.prototype.push = function(obj) {
        this.arr.push(obj);
    };

    Stack.prototype.pop = function(){
        return this.arr.splice(this.arr.length - 1,1)[0];
    };

    Stack.prototype.peek = function(){
        return this.arr[this.arr.length - 1];
    };

    Stack.prototype.size = function(){
        return this.arr.length;
    };

    Stack.prototype.isEmpty = function(){
        return this.arr.length === 0;
    };

    function Queue(){
        this.arr = [];
    }

    Queue.prototype.insert = function(obj){
        this.arr.push(obj);
    };

    Queue.prototype.remove = function(){
        return this.arr.splice(0,1)[0];
    };

    Queue.prototype.peek = function(){
        return this.arr[0];
    };

    Queue.prototype.size = function(){
        return this.arr.length;
    };

    Queue.prototype.isEmpty = function(){
        return this.arr.length === 0;
    };

    window.Stack = Stack;
})();
