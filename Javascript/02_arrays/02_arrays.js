const marvel_heros = ["thor", "iron man", "spiderman"];
const dc_heros = ["superman", "flash", "batman"];

// marvel_heros.push(dc_heros);
// console.log(marvel_heros);
// console.log(marvel_heros[3][1]);

const newHeros = marvel_heros.concat(dc_heros);
// console.log(newHeros);
// console.log(marvel_heros);

const allNewsHeros = [...marvel_heros, ...dc_heros];
// console.log(allNewsHeros);

const anotherArray = [1, 2, 3, 4, [5, 6, 7, 8], 7, [5, 4, 5, [3, 4, 6]]];
const real_another_array = anotherArray.flat(Infinity);
// console.log(real_another_array);

console.log(Array.from("Hitesh"));
console.log(Array.from({ name: "Hitesh" })); // interesting case

let score1 = 100;
let score2 = 200;
let score3 = 300;

console.log(Array.of(score1, score2, score3));
