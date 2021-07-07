let assert = require('assert');
let { Matrix } = require('../src/matrix');

describe('Matrix', function () {
	describe('#constructor()', function () {
		it('should throw TypeError if data is not an array', function () {
			assert.throws(() => { new Matrix(2, 2, 1); }, TypeError);
			assert.throws(() => { new Matrix(2, 2, '11'); }, TypeError);
		})
		it('should throw RangeError if rows*cols doesnt equal the length of data', function () {
			assert.throws(() => { new Matrix(2, 2, [1, 2, 3]); }, RangeError);
			assert.throws(() => { new Matrix(2, 2, [1, 2, 3, 4, 5]); }, RangeError);
			assert.throws(() => { new Matrix(1, 5, [1, 2, 3, 4]); }, RangeError);
		});
		it('should create a Matrix with the expected values', function () {
			let m = new Matrix(2, 3, [1, 2, 3, 4, 5, 6]);
			assert.strictEqual(m.rows, 2);
			assert.strictEqual(m.cols, 3);
			assert.deepStrictEqual(m.data, [1, 2, 3, 4, 5, 6]);
		});
	});
	describe('#from2DArray()', function () {
		it('should throw TypeError if data is not a multidimentional array', function () {
			assert.throws(() => { Matrix.from2DArray(1); }, TypeError);
			assert.throws(() => { Matrix.from2DArray('11'); }, TypeError);
			assert.throws(() => { Matrix.from2DArray([1, 2, 3, 4]); }, TypeError);
			assert.throws(() => { Matrix.from2DArray(['11', '22']); }, TypeError);
		});
		it('should throw RangeError if data is not rectangular', function () {
			assert.throws(() => { Matrix.from2DArray([[1, 2], [1, 2, 3]]); }, RangeError);
			assert.throws(() => { Matrix.from2DArray([[1, 2, 3], [1, 2, 3, 4], [1, 2, 3]]); }, RangeError);
		});
		it('should create a Matrix with the expected values', function () {
			let m = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
			assert.strictEqual(m.rows, 2);
			assert.strictEqual(m.cols, 3);
			assert.deepStrictEqual(m.data, [1, 2, 3, 4, 5, 6]);
		});
	});
	describe('#filled()', function () {
		it('should create a Matrix with the given dimensions', function () {
			let m = Matrix.filled(2, 3, 0);
			assert.strictEqual(m.rows, 2);
			assert.strictEqual(m.cols, 3);
		});
		it('should create a Matrix filled with the given value', function () {
			let m = Matrix.filled(2, 3, 0);
			assert.deepStrictEqual(m.data, [0, 0, 0, 0, 0, 0]);
		});
	});
	describe('#isMatrix()', function () {
		it('should only return true if passed a Matrix', function () {
			assert.strictEqual(Matrix.isMatrix(Matrix.ones(2, 3)), true);
			assert.strictEqual(Matrix.isMatrix(undefined), false);
			assert.strictEqual(Matrix.isMatrix(null), false);
			assert.strictEqual(Matrix.isMatrix(1), false);
			assert.strictEqual(Matrix.isMatrix(Matrix), false);
		});
	});
	describe('#len()', function () {
		it('should return the correct length', function () {
			assert.strictEqual(Matrix.zeros(2, 3).len(), 6);
			assert.strictEqual(Matrix.zeros(10, 20).len(), 200);
		});
	});
	describe('#at()', function () {
		it('should throw a RangeError if index is out of range', function () {
			let m = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
			assert.throws(() => { m.at(7) }, RangeError);
			assert.throws(() => { m.at(0, 4) }, RangeError);
			assert.throws(() => { m.at(3, 1) }, RangeError);
		});
		it('should return the correct value when given 1 parameter', function () {
			let m = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
			assert.strictEqual(m.at(0), m.data[0]);
			assert.strictEqual(m.at(0), 1);
			assert.strictEqual(m.at(4), 5);
		});
		it('should return the correct value when given 2 parameters', function () {
			let m = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
			assert.strictEqual(m.at(0, 0), m.data[0]);
			assert.strictEqual(m.at(0, 0), 1);
			assert.strictEqual(m.at(1, 2), 6);
		});
	});
});

// describe('ErrorCheckHelper', function () {
// 	describe('#assertIndices()', function () {
// 		it('should throw a TypeError if any of the values are not an Integer', function () {
// 			assert.throws(() => { ErrorCheckHelper.assertIndices({ 'a': 'a' }) }, TypeError);
// 			assert.throws(() => { ErrorCheckHelper.assertIndices({ 'a': [1] }) }, TypeError);
// 			assert.throws(() => { ErrorCheckHelper.assertIndices({ 'a': 1, 'b': 2, 'c': '3' }) }, TypeError);
// 			assert.throws(() => { ErrorCheckHelper.assertIndices({ 'a': 1.2 }) }, TypeError);
// 		});
// 		it('should throw a RangeError if any of the values are 0 or less', function () {
// 			assert.throws(() => { ErrorCheckHelper.assertIndices({ 'a': 0 }) }, RangeError);
// 			assert.throws(() => { ErrorCheckHelper.assertIndices({ 'a': -2 }) }, RangeError);
// 			assert.throws(() => { ErrorCheckHelper.assertIndices({ 'a': 2, 'b': 3, 'c': 0 }) }, RangeError);
// 		});
// 	});
// });
