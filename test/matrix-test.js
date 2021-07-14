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
	describe('#identity()', function () {
		it('should return a Matrix with the expected size', function () {
			let m1 = Matrix.identity(1);
			let m2 = Matrix.identity(4);
			assert.strictEqual(m1.len(), 1);
			assert.strictEqual(m1.rows, 1);
			assert.strictEqual(m1.cols, 1);
			assert.strictEqual(m2.len(), 16);
			assert.strictEqual(m2.rows, 4);
			assert.strictEqual(m2.cols, 4);
		});
		it('should return a Matrix with the expected values', function () {
			assert.deepStrictEqual(Matrix.identity(1).data, [1]);
			assert.deepStrictEqual(Matrix.identity(3).data, [1, 0, 0, 0, 1, 0, 0, 0, 1]);
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
	describe('#set()', function () {
		it('should set the value at the given index', function () {
			let m = Matrix.zeros(2, 3);
			assert.deepStrictEqual(m.data, [0, 0, 0, 0, 0, 0]);
			m.set(0, 0, 2);
			assert.deepStrictEqual(m.data, [2, 0, 0, 0, 0, 0]);
			m.set(0, 2, -2);
			assert.deepStrictEqual(m.data, [2, 0, -2, 0, 0, 0]);
			m.set(1, 1, 0.95);
			assert.deepStrictEqual(m.data, [2, 0, -2, 0, 0.95, 0]);
		});
	});
	describe('#add()', function () {
		describe('When passing a Matrix as a parameter', function () {
			it('should throw RangeError if given matrix is wrong size', function () {
				let m1 = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
				let m2 = Matrix.from2DArray([[1, 2], [3, 4], [5, 6]]);
				assert.throws(() => { m1.add(m2) }, RangeError);
			});
			it('should return a Matrix with the expected values', function () {
				let m1 = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
				let m2 = Matrix.from2DArray([[2, 0, -3.1], [1, 6, 1.95]]);
				assert.deepStrictEqual(m1.add(m2).data, [3, 2, -0.1, 5, 11, 7.95]);
			});
		});
		describe('When passing a value as a parameter', function () {
			it('should return a Matrix with the expected values', function () {
				let m = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
				assert.deepStrictEqual(m.add(1).data, [2, 3, 4, 5, 6, 7]);
				assert.deepStrictEqual(m.add(-1.9).data, [-0.9, 0.1, 1.1, 2.1, 3.1, 4.1]);
			});
		});
	});
	describe('#sub()', function () {
		describe('When passing a Matrix as a parameter', function () {
			it('should throw RangeError if given matrix is wrong size', function () {
				let m1 = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
				let m2 = Matrix.from2DArray([[1, 2], [3, 4], [5, 6]]);
				assert.throws(() => { m1.sub(m2) }, RangeError);
			});
			it('should return a Matrix with the expected values', function () {
				let m1 = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
				let m2 = Matrix.from2DArray([[2, 0, -3.1], [1, 6, 1.95]]);
				assert.deepStrictEqual(m1.sub(m2).data, [-1, 2, 6.1, 3, -1, 4.05]);
			});
		});
		describe('When passing a value as a parameter', function () {
			it('should return a Matrix with the expected values', function () {
				let m = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
				assert.deepStrictEqual(m.sub(1).data, [0, 1, 2, 3, 4, 5]);
				assert.deepStrictEqual(m.sub(-1.9).data, [2.9, 3.9, 4.9, 5.9, 6.9, 7.9]);
			});
		});
	});
	describe('#mul()', function () {
		describe('When passing a Matrix as a parameter', function () {
			it('should throw RangeError if given matrix is wrong size', function () {
				let m1 = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
				let m2 = Matrix.from2DArray([[1, 2], [3, 4], [5, 6]]);
				let mat = m1.mul(m2);
				assert.strictEqual(mat.rows, 2);
				assert.strictEqual(mat.cols, 2);
			});
			it('should return a Matrix with the expected size', function() {
				let m1 = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
				let m2 = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
			});
			it('should return a Matrix with the expected values', function () {
				let m1 = Matrix.from2DArray([[1, 2, 3], [4, 5, 6]]);
				let m2 = Matrix.from2DArray([[1, 2], [3, 4], [5, 6]]);
				let m3 = Matrix.from2DArray([[0.14, -2.11, -0.995], [4.21, 4.01, -5]]);
				let m4 = Matrix.from2DArray([[1, 2, 3.33], [-0.91, -1, -1], [1.56, 2, 2]]);
				assert.deepStrictEqual(m1.mul(m2).data, [22, 28, 49, 64]);
				assert.deepStrictEqual(m3.mul(m4).data, [0.5079, 0.4, 0.5862, -7.2391, -5.59, 0.0093]);
			});
		});
		describe('When passing a value as a parameter', function () {
			it('should return a Matrix with the expected values', function () {
				let m = Matrix.from2DArray([[1, 2.4, 3], [-0.4, 5, -6]]);
				assert.deepStrictEqual(m.mul(2).data, [2, 4.8, 6, -0.8, 10, -12]);
				assert.deepStrictEqual(m.mul(-1.9).data, [-1.9, -4.56, -5.7, 0.76, -9.5, 11.4]);
			});
		});
	});
	describe('#mul()', function () {
		describe('When passing a value as a parameter', function () {
			it('should return a Matrix with the expected values', function () {
				let m = Matrix.from2DArray([[1, 2.4, 3], [-0.4, 5, -6]]);
				assert.deepStrictEqual(m.div(2).data, [0.5, 1.2, 1.5, -0.2, 2.5, -3]);
				assert.deepStrictEqual(m.div(-4).data, [-0.25, -0.6, -0.75, 0.1, -1.25, 1.5]);
			});
		});
	});
});
