const coding = ["js", "python", "rb", "java"];

const values = coding.forEach((item) => {
  //   console.log(item);
  return item; // Note: forEach does not return a new array
});

// console.log(values);

const myNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const newNums = myNums.filter((item) => item > 4);
// const newNums = myNums.filter((item) => {
//   return item > 4; // Returns a new array with items greater than 4
// });

// const newNums = [];
// myNums.forEach((item) => {
//   if (item > 4) {
//     newNums.push(item); // Manually pushing items greater than 4 into newNums
//   }
// });

const books = [
  { title: "book one", genre: "fiction", publish: 1981, edition: 2004 },
  { title: "book two", genre: "non-fiction", publish: 1992, edition: 2008 },
  { title: "book three", genre: "history", publish: 1999, edition: 2007 },
  { title: "book four", genre: "fiction", publish: 1989, edition: 2010 },
  { title: "book five", genre: "science", publish: 2005, edition: 2015 },
  { title: "book six", genre: "fiction", publish: 2010, edition: 2018 },
  { title: "book seven", genre: "history", publish: 1987, edition: 1996 },
];

const userBooks = books.filter((item) => {
  if (item.genre === "history") {
    return item; // Returns books with genre 'history'
  }
});

const userBooksEditons = books.filter((item) => {
  if (item.edition > 2010) {
    return item; // Returns books with edition greater than 2010
  }
});

console.log(userBooksEditons);
