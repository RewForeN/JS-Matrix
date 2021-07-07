class Matrix {

	constructor(rows, cols, data) {
		ErrorCheckHelper.assertIndices({'rows': rows, 'cols': cols});
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

	// TODO: Add test
	static zeros(rows, cols) {
		return Matrix.filled(rows, cols, 0);
	}

	// TODO: Add test
	static ones(rows, cols) {
		return Matrix.filled(rows, cols, 1);
	}

	// TODO: Add test
	static filled(rows, cols, value) {
		ErrorCheckHelper.assertIndices({'rows': rows, 'cols': cols});
		return (new Array(rows)).fill(new Array(cols).fill(value));
	}

	// TODO: Add test
	static isMatrix(value) {
		return value !== null && value instanceof Matrix;
	}

	// TODO: Add test
	len() {
		return this.data.length;
	}

	// TODO: Add test
	at(rowIndex, colIndex = undefined) {
		if (colIndex !== undefined) ErrorCheckHelper.assertIndices({'rowIndex': rowIndex, 'colIndex': colIndex});
		else ErrorCheckHelper.assertIndices({'rowIndex': rowIndex});
		let index = (colIndex === undefined) ? rowIndex : this.indexFromRowCol(rowIndex, colIndex);
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
		ErrorCheckHelper.assertIndices({'index': index});
		return Math.floor(index / this.cols);
	}

	// TODO: Add test
	colFromIndex(index) {
		ErrorCheckHelper.assertIndices({'index': index});
		return index % (this.cols + 1);
	}

	// TODO: Add test
	indexFromRowCol(row, col) {
		ErrorCheckHelper.assertIndices({'rows': rows, 'cols': cols});
		return (this.cols * row) + col;
	}

}

class ErrorCheckHelper {
	// TODO: Add test
	static assertIndices(options) {
		for (let [key, value] of Object.entries(options)) {
			if (!Number.isInteger(value)) throw new TypeError(`[${key}] must be an integer`);
			if (value <= 0) throw new RangeError(`[${key}] must be greater than 0`);
		}
	}
}

exports.Matrix = Matrix;