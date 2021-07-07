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

	at(rowIndex, colIndex = undefined) {
		Assert.index(rowIndex, 'Matrix.at()');
		let index;
		if (colIndex !== undefined) {
			Assert.index(colIndex, 'Matrix.at()');
			Assert.integerMax(rowIndex, this.rows, 'Matrix.at()');
			Assert.integerMax(colIndex, this.cols, 'Matrix.at()');
			index = this.indexFromRowCol(rowIndex, colIndex);
		}
		else {
			Assert.integerMax(rowIndex, this.len(), 'Matrix.at()');
			index = rowIndex;
		}
		return this.data[index];
	}

	// TODO: Add test
	add(other) {
		if (!Matrix.isMatrix(other)) throw new TypeError('Parameter must be a Matrix');
		return this.data.map((val, index) => {
			return val + other.at(index);
		});
	}

	// TODO: Add test
	sub(other) {
		if (!Matrix.isMatrix(other)) throw new TypeError('Parameter must be a Matrix');
		return this.data.map((val, index) => {
			return val - other.at(index);
		});
	}

	// TODO: Add test
	mul(other) {
		if (!Matrix.isMatrix(other)) throw new TypeError('Parameter must be a Matrix');
		return this.data.map((val, index) => {
			// TODO: Implement
		});
	}

	// TODO: Add test
	div(other) {
		if (!Matrix.isMatrix(other)) throw new TypeError('Parameter must be a Matrix');
		// TODO: Implement
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
