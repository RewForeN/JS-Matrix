
const { Matrix } = require('../src/matrix');

let mat = Matrix.random(2, 3);
let mat2 = Matrix.random(2, 3);

let mat3 = Matrix.mul(mat, mat2);

console.log(mat.data);
console.log(mat2.data);
console.log(mat3.data);