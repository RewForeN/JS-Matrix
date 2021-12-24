
const { Matrix } = require('../src/matrix');

let mat = Matrix.random(2, 2);

mat.forEach((val, i, j) => {
    console.log(`${val} at ${i}, ${j}`);
});

console.log("\n\n");

let m2 = mat.map((val) => {
    return val * 2;
});

m2.forEach((val, i, j) => {
    console.log(`${val} at ${i}, ${j}`);
});