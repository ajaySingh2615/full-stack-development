// dates

let myDate = new Date();
console.log(myDate);
console.log(myDate.toString());
console.log(myDate.toDateString());
console.log(myDate.toISOString());
console.log(myDate.toLocaleDateString());
console.log(myDate.toLocaleString());
console.log(myDate.toLocaleTimeString());
console.log(myDate.toTimeString());

console.log(typeof Date);
console.log(typeof myDate);

let myCreatedDate = new Date(2023, 0, 23, 5, 3);
console.log(myCreatedDate.toDateString());
