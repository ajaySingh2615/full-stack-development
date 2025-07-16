const score = 400;
console.log(score);

const balance = new Number(300);
console.log(balance);

console.log(balance.toString().length);
console.log(balance.toFixed(2));

const otherNumber = 23.8966;
console.log(otherNumber.toPrecision(3));

const hundreds = 100000;
console.log(hundreds.toLocaleString("en-IN"));

// +++++++++++++++++++++++ MATH +++++++++++++++++++++++
console.log(Math);

console.log(Math.floor(Math.random() * 10) + 1);

const min = 10;
const max = 20;

console.log(Math.floor(Math.random() * (max - min + 1)) + min);
