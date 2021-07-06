class Matrix {

    constructor(rows, cols, data) {
        if (!Number.isInteger(rows) || !Number.isInteger(cols) || rows <= 0 || cols <= 0 )
            throw new TypeError('rows and cols should be integers greater than 0');
        if (!Array.isArray(data))
            throw new TypeError('data should be an array');
        if (rows * cols !== data.length)
            throw new RangeError('rows and cols should match length of data');
        this.rows = rows;
        this.cols = cols;
        this.data = data;
    }

    static from2DArray(data) {
        if (!Array.isArray(data) || !Array.isArray(data[0]))
            throw new TypeError('data should be a 2 dimentional array');
        if (!data.every((val) => { return val.length === data[0].length }))
            throw new RangeError('all sub-arrays of data should be the same length');
        return new Matrix(data.length, data[0].length, data.flat(2));
    }

}

exports.Matrix = Matrix;