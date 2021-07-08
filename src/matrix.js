const { Assert } = require('./assert');

class Matrix {

	constructor(rows, cols, data) {
		Assert.integerMin(rows, 1, 'Matrix()');
		Assert.integerMin(cols, 1, 'Matrix()');
		if (!Array.isArray(data)) throw new TypeError('[data] should be an array');
		if (rows * cols !== data.length) throw new RangeError('[rows] and [cols] should match the length of [data]');
		this.rows = rows;
		this.cols = cols;
		this.data = data;
	}

	static from2DArray(data) {
		if (!Array.isArray(data) || !Array.isArray(data[0])) throw new TypeError('[data] should be a 2 dimentional array');
		if (!data.every((val) => { return val.length === data[0].length })) throw new RangeError('[data] should be rectangular');
		return new Matrix(data.length, data[0].length, data.flat(2));
	}

	static zeros(rows, cols) {
		return Matrix.filled(rows, cols, 0);
	}

	static ones(rows, cols) {
		return Matrix.filled(rows, cols, 1);
	}
	
	static identity(size) {
		Assert.integerMin(size, 1, 'Matrix.identity()');
		let mat = Matrix.zeros(size, size);
		for (let i = 0 ; i < size; i++) {
			mat.set(i, i, 1);
		}
		return mat;
	}

	static filled(rows, cols, value) {
		Assert.integerMin(rows, 1, 'Matrix.filled()');
		Assert.integerMin(cols, 1, 'Matrix.filled()');
		let data = (new Array(rows * cols)).fill(value);
		return new Matrix(rows, cols, data);
	}

	static isMatrix(value) {
		return value !== null && value instanceof Matrix;
	}

	len() {
		return this.data.length;
	}

	// TODO: Add test
	// TODO: Implement
	inverse() {

	}

	at(row, col = undefined) {
		Assert.index(row, 'Matrix.at()');
		let index;
		if (col !== undefined) {
			Assert.index(col, 'Matrix.at()');
			Assert.integerMax(row, this.rows, 'Matrix.at()');
			Assert.integerMax(col, this.cols, 'Matrix.at()');
			index = this.indexFromRowCol(row, col);
		}
		else {
			Assert.integerMax(row, this.len(), 'Matrix.at()');
			index = row;
		}
		return this.data[index];
	}

	// TODO: Add test
	// TODO: Error checks
	set(row, col, value) {
		this.data[this.indexFromRowCol(row, col)] = value;
	}

	// TODO: Add test
	// TODO: Implement single value addition
	add(other) {
		if (!Matrix.isMatrix(other)) throw new TypeError('Parameter must be a Matrix');
		return this.data.map((val, index) => {
			return val + other.at(index);
		});
	}

	// TODO: Add test
	// TODO: Implement single value subtraction
	sub(other) {
		if (!Matrix.isMatrix(other)) throw new TypeError('Parameter must be a Matrix');
		return this.data.map((val, index) => {
			return val - other.at(index);
		});
	}

	// TODO: Add test
	// TODO: Implement single value multiplication
	mul(other) {
		if (!Matrix.isMatrix(other)) throw new TypeError('Parameter must be a Matrix');
		if (this.cols !== other.rows) throw new RangeError('The given Matrix\'s rows dont match this Matrix\'s columns.');
		let newMat = Matrix.zeros(this.rows, other.cols);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < other.cols; j++) {
				let val = 0;
				for (let k = 0; k < this.cols; k++) {
					val += this.at(i, k) * other.at(k, j);
					// TODO: Single value add not implemented
					// newMat.add(i, j, this.at(i, k) * other.at(k, j));
				}
				newMat.set(i, j, val);
			}
		}
		return newMat;
	}

	// TODO: Add test
	// TODO: Implement matrix division
	// TODO: Implement single value division
	div(other) {
		if (!Matrix.isMatrix(other)) throw new TypeError('Parameter must be a Matrix');
	}

	// TODO: Add test
	rowFromIndex(index) {
		Assert.index(index, 'Matrix.rowFromIndex()');
		return Math.floor(index / this.cols);
	}

	// TODO: Add test
	colFromIndex(index) {
		Assert.index(index, 'Matrix.colFromIndex()');
		return index % (this.cols + 1);
	}

	// TODO: Add test
	indexFromRowCol(row, col) {
		Assert.index(row, 'Matrix.indexFromRowCol()');
		Assert.index(col, 'Matrix.indexFromRowCol()');
		return (this.cols * row) + col;
	}

}

exports.Matrix = Matrix;
