const myArr = [1, 2, 3, 4, 5, true, "hitesh"];
// console.log(myArr[0]);

const myHeros = new Array("marvel", "dc");
// console.log(myHeros);

// myArr.push(6);
// console.log(myArr);
// myArr.pop();
// console.log(myArr);

// myArr.unshift(10);
// console.log(myArr);

// console.log(myArr.includes(8));
// console.log(myArr.includes(100));

// const newArr = myArr.join();
// console.log(myArr);
// console.log(typeof newArr);

// slice and splice
console.log("A ", myArr);
const myn1 = myArr.slice(1, 3);
console.log(myn1);

const myn2 = myArr.splice(1, 3);
console.log(myn2);
console.log(myArr);
