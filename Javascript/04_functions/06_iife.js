function chai() {
  console.log(`DB connected`);
}

// chai();

(function chai() {
  console.log(`DB connected using IIFE functions`);
})();

((name) => {
  console.log(`DB connected using IIFE functions - 2 ${name}`);
})("mike");
