
const { Matrix } = require('../src/matrix');

let mat = Matrix.random(2, 3);

console.log(mat.data);
console.log(mat.rows);
console.log(mat.cols);

let mat2 = mat.transpose();

console.log(mat2.data);
console.log(mat2.rows);
console.log(mat2.cols);