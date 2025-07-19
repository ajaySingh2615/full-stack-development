const myNums = [1, 2, 3];

const myTotal = myNums.reduce(function (accumulator, currentValue) {
  console.log(accumulator, currentValue); // Logs the accumulator and current value at each step
  return accumulator + currentValue; // Sums up all numbers in the array
}, 0); // Initial value of accumulator is 0

console.log(myTotal); // Output: 6

const mytotalArrow = myNums.reduce((accumulator, currentValue) => {
  return accumulator + currentValue; // Arrow function to sum up all numbers
}, 0); // Initial value of accumulator is 0

console.log(mytotalArrow); // Output: 6

const shoopingCart = [
  {
    itemName: "js course",
    price: 2999,
  },
  {
    itemName: "python course",
    price: 1999,
  },
  {
    itemName: "rb course",
    price: 2499,
  },
];

const totalPrice = shoopingCart.reduce((accumulator, item) => {
  return accumulator + item.price; // Sums up the price of all items in the shopping cart
}, 0); // Initial value of accumulator is 0

console.log(totalPrice); // Output: 7497
