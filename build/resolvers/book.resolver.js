"use strict";
// import books from "../models/books.model";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = {
    Query: {
        books: () => books,
    },
};
