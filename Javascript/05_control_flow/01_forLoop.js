// for loop
// break
// continue

// High order array loops
// for of loop

// const arr = [1, 2, 3, 4, 5];
const arr = ["superman", "spiderman", "tony stark"];

for (const element of arr) {
  console.log(element);
}

const greetings = "Hello World";
// console.log(greetings);

for (const greet of greetings) {
  //   console.log(greet);
}

// maps

const map = new Map();
map.set("IN", "india");
map.set("USA", "united state of india");
map.set("Fr", "Franch");
map.set("IN", "india");

console.log(map);

for (const [key, value] of map) {
  console.log(key, value);
}

const myObject = {
  game1: "NFS",
  game2: "Spiderman",
};

for (const [key, value] of myObject) {
  console.log(key, value);
}
