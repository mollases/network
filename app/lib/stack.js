(function(window,document) {
    'use strict';

    function Stack(){
        this.arr = [];
    }

    Stack.prototype.push = function(obj) {
        this.arr.push(obj);
    };

    Stack.prototype.pop = function(){
        return this.arr.splice(this.arr.length - 1,1);
    };

    Stack.prototype.size = function(){
        return this.arr.length;
    };

    Stack.prototype.isEmplty = function(){
        return this.arr.length === 0;
    };


    window.Stack = Stack;
})(window,document);
