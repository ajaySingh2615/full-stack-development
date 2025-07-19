const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const newNums = myNums.map((item) => {
//   return item + 10; // Returns a new array with each item increased by 10
// });

const newNums = myNums
  .map((num) => num * 10)
  .map((num) => num + 1)
  .filter((num) => num >= 40);

console.log(newNums); // Output: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
