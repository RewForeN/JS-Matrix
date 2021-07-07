class Matrix {

	constructor(rows, cols, data) {
		ErrorCheckHelper.assertIndices({ 'rows': rows, 'cols': cols });
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
		ErrorCheckHelper.assertIndices({ 'rows': rows, 'cols': cols });
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
		let index;
		if (colIndex !== undefined) {
			// ERR: Doesn't allow an index of 0
			ErrorCheckHelper.assertIndices({ 'rowIndex': rowIndex, 'colIndex': colIndex });
			if (rowIndex > this.rows) throw new RangeError('rowIndex was out of range');
			if (colIndex > this.cols) throw new RangeError('colIndex was out of range');
			index = this.indexFromRowCol(rowIndex, colIndex);
		}
		else {
			// ERR: Doesn't allow an index of 0
			ErrorCheckHelper.assertIndices({ 'rowIndex': rowIndex });
			if (rowIndex > this.len()) throw new RangeError('index was out of range');
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
		ErrorCheckHelper.assertIndices({ 'index': index });
		return Math.floor(index / this.cols);
	}

	// TODO: Add test
	colFromIndex(index) {
		ErrorCheckHelper.assertIndices({ 'index': index });
		return index % (this.cols + 1);
	}

	// TODO: Add test
	indexFromRowCol(row, col) {
		ErrorCheckHelper.assertIndices({ 'rows': rows, 'cols': cols });
		return (this.cols * row) + col;
	}

}

class ErrorCheckHelper {
	static assertIndices(options) {
		for (let [key, value] of Object.entries(options)) {
			if (!Number.isInteger(value)) throw new TypeError(`[${key}] must be an integer`);
			if (value <= 0) throw new RangeError(`[${key}] must be greater than 0`);
		}
	}
}

exports.Matrix = Matrix;
exports.ErrorCheckHelper = ErrorCheckHelper;