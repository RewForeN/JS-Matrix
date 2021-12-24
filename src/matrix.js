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
		for (let i = 0; i < size; i++) {
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

	static random(rows, cols, min=0, max=1) {
		let mat = Matrix.zeros(rows, cols);
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				let val = Math.random() * (max - min) + min;
				mat.set(i, j, parseFloat(val.toPrecision(13)));
			}
		}
		return mat;
	}

	static isMatrix(value) {
		return value !== null && value instanceof Matrix;
	}

	len() {
		return this.data.length;
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

	set(row, col, value) {
		Assert.index(row, 'Matrix.set()');
		Assert.index(col, 'Matrix.set()');
		this.data[this.indexFromRowCol(row, col)] = value;
	}

	add(other) {
		let mat = Matrix.zeros(this.rows, this.cols);
		if (Matrix.isMatrix(other)) {
			if (this.rows !== other.rows || this.cols !== other.cols) throw RangeError('Matrices need to be the same size.');
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					let val = this.at(i, j) + other.at(i, j);
					mat.set(i, j, parseFloat(val.toPrecision(13)));
				}
			}
		}
		else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					let val = this.at(i, j) + other;
					mat.set(i, j, parseFloat(val.toPrecision(13)));
				}
			}
		}
		return mat;
	}

	sub(other) {
		let mat = Matrix.zeros(this.rows, this.cols);
		if (Matrix.isMatrix(other)) {
			if (this.rows !== other.rows || this.cols !== other.cols) throw RangeError('Matrices need to be the same size.');
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					let val = this.at(i, j) - other.at(i, j);
					mat.set(i, j, parseFloat(val.toPrecision(13)));
				}
			}
		}
		else {
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					let val = this.at(i, j) - other;
					mat.set(i, j, parseFloat(val.toPrecision(13)));
				}
			}
		}
		return mat;
	}

	mul(other) {
		let mat;
		if (Matrix.isMatrix(other)) {
			if (this.cols !== other.rows) throw new RangeError('The given Matrix\'s rows dont match this Matrix\'s columns.');
			mat = Matrix.zeros(this.rows, other.cols);
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < other.cols; j++) {
					let val = 0;
					for (let k = 0; k < this.cols; k++) {
						val += this.at(i, k) * other.at(k, j);
					}
					mat.set(i, j, parseFloat(val.toPrecision(13)));
				}
			}
		}
		else  {
			mat = Matrix.zeros(this.rows, this.cols);
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					let val = this.at(i, j) * other;
					mat.set(i, j, parseFloat(val.toPrecision(13)));
				}
			}
		}
		return mat;
	}

	div(other) {
		let mat;
		if (Matrix.isMatrix(other)) {
			throw new Error('Matrix division is not implemented.');
		}
		else  {
			mat = Matrix.zeros(this.rows, this.cols);
			for (let i = 0; i < this.rows; i++) {
				for (let j = 0; j < this.cols; j++) {
					let val = this.at(i, j) / other;
					mat.set(i, j, parseFloat(val.toPrecision(13)));
				}
			}
		}
		return mat;
	}

	rowFromIndex(index) {
		Assert.index(index, 'Matrix.rowFromIndex()');
		return Math.floor(index / this.cols);
	}

	colFromIndex(index) {
		Assert.index(index, 'Matrix.colFromIndex()');
		return index % (this.cols + 1);
	}

	indexFromRowCol(row, col) {
		Assert.index(row, 'Matrix.indexFromRowCol()');
		Assert.index(col, 'Matrix.indexFromRowCol()');
		return (this.cols * row) + col;
	}

}

exports.Matrix = Matrix;
