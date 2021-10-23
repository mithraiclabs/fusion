"use strict";
exports.__esModule = true;
exports.test_fn = exports.test = void 0;
exports.test = 'test';
exports["default"] = exports.test;
// export const test_fn = (foo: string) => {
var test_fn = function (foo) {
    var one = function (bar) {
        console.log('test_fn | one');
    };
    one(foo);
    return 'test function, strongly typed';
};
exports.test_fn = test_fn;
