let assert = require('assert');
let { Matrix } = require('../src/matrix');

describe('Matrix', function() {
    describe('#constructor()', function() {
        it('should throw TypeError if rows or cols are not integers greater than 0', function() {
            assert.throws(() => { new Matrix(2, -2, [1, 2, 3, 4]); }, TypeError);
            assert.throws(() => { new Matrix(-2, 2, [1, 2, 3, 4]); }, TypeError);
            assert.throws(() => { new Matrix('22', 2, [1, 2, 3, 4]); }, TypeError);
            assert.throws(() => { new Matrix(2, '22', [1, 2, 3, 4]); }, TypeError);
            assert.throws(() => { new Matrix([2], 2, [1, 2, 3, 4]); }, TypeError);
            assert.throws(() => { new Matrix(2, [2], [1, 2, 3, 4]); }, TypeError);
        });
        it('should throw TypeError if data is not an array', function() {
            assert.throws(() => { new Matrix(2, 2, 1); }, TypeError);
            assert.throws(() => { new Matrix(2, 2, '11'); }, TypeError);
        })
        it('should throw RangeError if rows*cols doesnt equal the length of data', function() {
            assert.throws(() => { new Matrix(2, 2, [1, 2, 3]); }, RangeError);
            assert.throws(() => { new Matrix(2, 2, [1, 2, 3, 4, 5]); }, RangeError);
            assert.throws(() => { new Matrix(1, 5, [1, 2, 3, 4]); }, RangeError);
        });
        it('should create a Matrix with the expected values', function() {
            let m = new Matrix(2, 3, [1, 2, 3, 4, 5, 6]);
            assert.strictEqual(m.rows, 2);
            assert.strictEqual(m.cols, 3);
            assert.deepStrictEqual(m.data, [1, 2, 3, 4, 5, 6]);
        });
    });
    describe('#from2DArray()', function() {
        it('should throw TypeError if data is not a multidimentional array', function(){
            assert.throws(() => { Matrix.from2DArray(1); }, TypeError);
            assert.throws(() => { Matrix.from2DArray('11'); }, TypeError);
            assert.throws(() => { Matrix.from2DArray([1, 2, 3, 4]); }, TypeError);
            assert.throws(() => { Matrix.from2DArray(['11', '22']); }, TypeError);
        });
        it('should throw RangeError if data is not rectangular', function() {
            assert.throws(() => { Matrix.from2DArray([[1, 2], [1, 2, 3]]); }, RangeError);
            assert.throws(() => { Matrix.from2DArray([[1, 2, 3], [1, 2, 3, 4], [1, 2, 3]]); }, RangeError);
        });
        it ('should create a Matrix with the expected values', function() {
            let m = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
            assert.strictEqual(m.rows, 2);
            assert.strictEqual(m.cols, 3);
            assert.deepStrictEqual(m.data, [1, 2, 3, 4, 5, 6]);
        });
    });
});