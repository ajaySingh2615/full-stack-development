// singleton

// object literals

const mySym = Symbol("Key1");

const jsUser = {
  name: "Hitesh",
  "full name": "Hitesh Rao",
  age: 18,
  [mySym]: "myKey1",
  location: "jaipur",
  email: "hitesh@google.com",
  isLoggedIn: false,
  lastLoginDays: ["monday", "tuesday"],
};

console.log(jsUser.name);
console.log(jsUser["name"]);
console.log(typeof jsUser[mySym]);

jsUser.email = "hitesh@chatgpt";

console.log(jsUser);

jsUser.greeting = function () {
  console.log("Hello js user");
};
jsUser.greetingTwo = function () {
  console.log(`Hello js user ${this.name}`);
};

console.log(jsUser);
console.log(jsUser.greeting());
console.log(jsUser.greetingTwo());
console.log(jsUser);
