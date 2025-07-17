function sayMyName() {
  console.log("Ajay");
}

// sayMyName();

function addTwoNumber(num1, num2) {
  return num1 + num2;
}

const result = addTwoNumber(10, 20);
// console.log(result);

function loginUserMessage(username) {
  if (undefined) {
    console.log("Please enter a username");
    return;
  }
  return `${username} just logged in`;
}

const message = loginUserMessage();
console.log(message);
