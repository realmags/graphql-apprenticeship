// import books from "../models/books.model";

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];


export default {
  Query: {
    books: () => books,
  },
};
