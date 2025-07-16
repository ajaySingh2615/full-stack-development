// primitive data types
// 7 types - String, Number, Boolean, null, undefined, bigInt, Symbol

// reference type or non primitive type
// Arrays, Objects, Functions,

const score = 100;
const scorevalue = 100.3;
const isLoggedIn = false;
const outSideTemp = null;
let userEmail;
const id = Symbol("123");
const anotherId = Symbol("123");
console.log(id === anotherId);

const bigNumber = 234456777689444565n;

const heros = ["superman", "spiderman", "ironman"];
let obj = {
  name: "mike",
  age: 22,
};

const myFunction = function () {
  console.log("Hello, Function");
};

console.log(typeof myFunction);

console.log(typeof obj);
