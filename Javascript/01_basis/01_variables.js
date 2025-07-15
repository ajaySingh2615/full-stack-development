const accountId = 144553;
let accountEmail = "hitesh@google.com";
var accountPassword = "12345";
accountCity = "Jaipur";
let accountState;

// accountId = 2

accountEmail = "hc@hc.com";
accountPassword = "212121";
accountCity = "benguluru";

console.log(accountId);

/*
prefer not to use var
because of issue of block scope and functional scope
*/

console.table([accountId, accountEmail, accountPassword, accountCity]);
console.log(accountState);
